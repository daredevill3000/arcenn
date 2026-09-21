import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to catch malformed JSON syntax errors gracefully
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.warn(`⚠️ [JSON Parse Warning] Malformed JSON payload received: ${err.message}`);
    return res.status(400).json({ error: 'Malformed JSON request body. Please provide valid JSON.' });
  }
  next(err);
});

// Configure Multer for memory storage (Max 5MB file size limit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const isPdfMime = file.mimetype === 'application/pdf';
    const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');
    if (isPdfMime || isPdfExt) {
      cb(null, true);
    } else {
      cb(new Error('INVALID_FILE_TYPE: Only PDF files (.pdf) are allowed.'));
    }
  },
});

// Target Email Recipients
const PRIMARY_EMAIL = process.env.PRIMARY_EMAIL || 'recruitment@arcen.tech';
const BACKUP_EMAIL = process.env.BACKUP_EMAIL || 'backup-recruitment@arcen.tech';

// Nodemailer Transporter Configuration
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// Generic Send Email Function supporting Real PDF Attachments
const sendNotificationEmail = async ({ subject, htmlContent, textContent, attachments = [] }) => {
  const transporter = createTransporter();

  console.log('\n------------------- [FORM SUBMISSION RECEIVED] -------------------');
  console.log(`Primary Email Target : ${PRIMARY_EMAIL}`);
  console.log(`Backup Email Target  : ${BACKUP_EMAIL}`);
  console.log(`Subject             : ${subject}`);
  console.log(`Attachments Count   : ${attachments.length}`);
  if (attachments.length > 0) {
    console.log(`Attachment Name     : ${attachments[0].filename} (${attachments[0].content.length} bytes)`);
  }
  console.log('------------------------------------------------------------------\n');

  if (!transporter) {
    console.log('⚠️ [INFO] SMTP credentials not set in .env. Form submission logged above.');
    return { success: true, mode: 'development_logged' };
  }

  // Send Primary Email
  try {
    const info = await transporter.sendMail({
      from: `"ARCEN Recruitment" <${process.env.SMTP_USER}>`,
      to: PRIMARY_EMAIL,
      subject: `[ARCEN] ${subject}`,
      text: textContent,
      html: htmlContent,
      attachments,
    });
    console.log(`✅ Sent primary email successfully! Message ID: ${info.messageId}`);

    // Send copy to Backup Email if configured
    if (BACKUP_EMAIL && BACKUP_EMAIL !== PRIMARY_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"ARCEN Recruitment Backup" <${process.env.SMTP_USER}>`,
          to: BACKUP_EMAIL,
          subject: `[ARCEN BACKUP] ${subject}`,
          text: textContent,
          html: htmlContent,
          attachments,
        });
        console.log(`✅ Sent backup email copy successfully to ${BACKUP_EMAIL}`);
      } catch (backupErr) {
        console.error(`⚠️ Backup email delivery failed: ${backupErr.message}`);
      }
    }
    return { success: true, info };
  } catch (primaryErr) {
    console.error(`❌ Primary email delivery failed: ${primaryErr.message}. Attempting backup dispatch...`);

    try {
      const backupInfo = await transporter.sendMail({
        from: `"ARCEN Recruitment Fallback" <${process.env.SMTP_USER}>`,
        to: BACKUP_EMAIL,
        subject: `[ARCEN FALLBACK] ${subject}`,
        text: textContent,
        html: htmlContent,
        attachments,
      });
      console.log(`✅ Sent to backup email successfully! Message ID: ${backupInfo.messageId}`);
      return { success: true, backupInfo };
    } catch (fallbackErr) {
      console.error(`❌ Fallback email dispatch failed: ${fallbackErr.message}`);
      throw new Error(`Failed to dispatch email: ${primaryErr.message}`);
    }
  }
};

// Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', primaryEmail: PRIMARY_EMAIL, backupEmail: BACKUP_EMAIL });
});

// Candidate Application Endpoint (Supports Optional PDF Upload via Multer)
app.post('/api/apply', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded. Maximum file size is 5 MB.' });
      }
      return res.status(400).json({ error: err.message || 'File upload error.' });
    }

    try {
      const { name, email, phone, interest, about, whatBuilt, portfolio } = req.body;

      if (!name || !email || !interest) {
        return res.status(400).json({ error: 'Name, Email, and Area of Interest are required.' });
      }

      // Prepare Attachments array if file exists
      let attachments = [];
      let resumeFileName = 'None provided';

      if (req.file) {
        const sanitizedFilename = req.file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
        resumeFileName = sanitizedFilename;
        attachments.push({
          filename: sanitizedFilename,
          content: req.file.buffer,
          contentType: req.file.mimetype || 'application/pdf',
        });
      }

      const subject = `New Candidate Application: ${name} (${interest})`;

      const textContent = `
ARCEN CANDIDATE APPLICATION

CANDIDATE DETAILS:
--------------------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Primary Interest: ${interest}
Portfolio / Links: ${portfolio || 'Not provided'}

ABOUT THE CANDIDATE:
--------------------------------------------------
${about || 'None provided'}

WHAT THEY HAVE BUILT:
--------------------------------------------------
${whatBuilt || 'None provided'}

RESUME STATUS:
--------------------------------------------------
${req.file ? `Attached as PDF file (${resumeFileName}, ${(req.file.size / 1024).toFixed(1)} KB)` : 'No PDF attached'}
      `;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f2efe6; padding: 32px; color: #11120f;">
          <div style="max-width: 620px; margin: 0 auto; background: #ffffff; padding: 36px; border: 2px solid #11120f;">
            <div style="border-bottom: 2px solid #11120f; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="font-family: monospace; font-size: 24px; margin: 0; text-transform: uppercase;">ARCEN</h1>
              <span style="font-family: monospace; font-size: 12px; color: #77766f; letter-spacing: 2px;">CANDIDATE APPLICATION</span>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; width: 140px;">Candidate Name:</td><td>${name}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}" style="color: #d85b46; font-weight: bold;">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Phone:</td><td>${phone || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Area of Interest:</td><td><span style="background: #11120f; color: #f2efe6; padding: 3px 8px; font-family: monospace; font-size: 12px;">${interest}</span></td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Portfolio / Links:</td><td>${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : 'N/A'}</td></tr>
            </table>

            <div style="margin-bottom: 20px;">
              <h4 style="font-family: monospace; font-size: 12px; color: #77766f; uppercase; margin-bottom: 6px;">ABOUT THE CANDIDATE:</h4>
              <div style="background: #f8f7f3; padding: 14px; border-left: 3px solid #11120f; font-size: 14px; white-space: pre-wrap;">${about || 'N/A'}</div>
            </div>

            <div style="margin-bottom: 24px;">
              <h4 style="font-family: monospace; font-size: 12px; color: #77766f; uppercase; margin-bottom: 6px;">WHAT THEY HAVE BUILT:</h4>
              <div style="background: #f8f7f3; padding: 14px; border-left: 3px solid #d85b46; font-size: 14px; white-space: pre-wrap;">${whatBuilt || 'N/A'}</div>
            </div>

            <div style="background: #11120f; color: #f2efe6; padding: 14px; font-family: monospace; font-size: 13px; display: flex; align-items: center; justify-between: space-between;">
              <span>📎 RESUME ATTACHMENT:</span>
              <strong style="color: #d85b46;">${req.file ? `Attached (${resumeFileName})` : 'No file attached'}</strong>
            </div>

            <hr style="margin-top: 32px; border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 11px; color: #77766f; font-family: monospace; text-align: center; margin-top: 16px;">ARCEN RECRUITMENT SYSTEM — ${new Date().toISOString()}</p>
          </div>
        </div>
      `;

      await sendNotificationEmail({ subject, htmlContent, textContent, attachments });

      return res.status(200).json({
        success: true,
        message: 'Application received successfully! We will get back to you soon.',
      });
    } catch (error) {
      console.error('Error handling application submission:', error);
      return res.status(500).json({ error: 'Server error processing application. Please try again.' });
    }
  });
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email, and Message are required fields.' });
    }

    const emailSubject = `New Contact Form Message: ${subject || 'General Inquiry'} from ${name}`;

    const textContent = `
ARCEN CONTACT INQUIRY

From: ${name} (${email})
Subject: ${subject || 'General Inquiry'}

MESSAGE:
--------------------------------------------------
${message}
    `;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f2efe6; padding: 32px; color: #11120f;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; padding: 36px; border: 2px solid #11120f;">
          <div style="border-bottom: 2px solid #11120f; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-family: monospace; font-size: 24px; margin: 0; text-transform: uppercase;">ARCEN</h1>
            <span style="font-family: monospace; font-size: 12px; color: #77766f; letter-spacing: 2px;">CONTACT INQUIRY</span>
          </div>

          <p style="font-size: 14px;"><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}" style="color: #d85b46;">${email}</a>&gt;)</p>
          <p style="font-size: 14px;"><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>

          <div style="margin-top: 20px; background: #f8f7f3; padding: 18px; border-left: 3px solid #11120f; font-size: 14px; white-space: pre-wrap;">
            ${message}
          </div>

          <hr style="margin-top: 32px; border: none; border-top: 1px solid #ddd;" />
          <p style="font-size: 11px; color: #77766f; font-family: monospace; text-align: center; margin-top: 16px;">ARCEN CONTACT SYSTEM — ${new Date().toISOString()}</p>
        </div>
      </div>
    `;

    await sendNotificationEmail({ subject: emailSubject, htmlContent, textContent });

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting ARCEN! We have received your message.',
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({ error: 'Server error sending message. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ARCEN Backend Server running on http://localhost:${PORT}`);
  console.log(`📧 Target Emails -> Primary: ${PRIMARY_EMAIL} | Backup: ${BACKUP_EMAIL}`);
});
