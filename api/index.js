import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON request body.' });
  }
  next(err);
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const PRIMARY_EMAIL = process.env.PRIMARY_EMAIL || 'recruitment@arcen.tech';
const BACKUP_EMAIL = process.env.BACKUP_EMAIL || 'backup-recruitment@arcen.tech';

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

const sendNotificationEmail = async ({ subject, htmlContent, textContent, attachments = [] }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('⚠️ [INFO] SMTP credentials not set. Form submission logged above.');
    return { success: true, mode: 'logged' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"ARCEN System" <${process.env.SMTP_USER}>`,
      to: PRIMARY_EMAIL,
      subject: `[ARCEN] ${subject}`,
      text: textContent,
      html: htmlContent,
      attachments,
    });
    
    if (BACKUP_EMAIL && BACKUP_EMAIL !== PRIMARY_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"ARCEN System Backup" <${process.env.SMTP_USER}>`,
          to: BACKUP_EMAIL,
          subject: `[ARCEN BACKUP] ${subject}`,
          text: textContent,
          html: htmlContent,
          attachments,
        });
      } catch (err) {
        console.error('Backup email error:', err);
      }
    }
    return { success: true, info };
  } catch (primaryErr) {
    try {
      const backupInfo = await transporter.sendMail({
        from: `"ARCEN System Fallback" <${process.env.SMTP_USER}>`,
        to: BACKUP_EMAIL,
        subject: `[ARCEN FALLBACK] ${subject}`,
        text: textContent,
        html: htmlContent,
        attachments,
      });
      return { success: true, backupInfo };
    } catch (fallbackErr) {
      throw new Error(`Failed to dispatch email: ${primaryErr.message}`);
    }
  }
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', primaryEmail: PRIMARY_EMAIL, backupEmail: BACKUP_EMAIL });
});

app.post('/api/apply', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload error or limit exceeded (Max 5MB PDF).' });
    }

    try {
      const { name, email, phone, interest, about, whatBuilt, portfolio } = req.body;
      if (!name || !email || !interest) {
        return res.status(400).json({ error: 'Name, Email, and Area of Interest are required.' });
      }

      let attachments = [];
      if (req.file) {
        attachments.push({
          filename: req.file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_'),
          content: req.file.buffer,
          contentType: req.file.mimetype || 'application/pdf',
        });
      }

      const subject = `New Candidate Application: ${name} (${interest})`;
      const textContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\nAbout: ${about}\nWhat Built: ${whatBuilt}`;
      const htmlContent = `
        <div style="font-family: Arial; padding: 20px;">
          <h2>ARCEN Candidate Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>About:</strong> ${about}</p>
          <p><strong>What Built:</strong> ${whatBuilt}</p>
        </div>
      `;

      await sendNotificationEmail({ subject, htmlContent, textContent, attachments });
      return res.status(200).json({ success: true, message: 'Application received successfully!' });
    } catch (err) {
      return res.status(500).json({ error: 'Server error processing application.' });
    }
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email, and Message are required.' });
    }

    const emailSubject = `New Contact Form Message: ${subject || 'Inquiry'} from ${name}`;
    const textContent = `From: ${name} (${email})\nSubject: ${subject}\nMessage:\n${message}`;
    const htmlContent = `<div style="font-family: Arial; padding: 20px;"><h3>Contact Inquiry from ${name} (${email})</h3><p>${message}</p></div>`;

    await sendNotificationEmail({ subject: emailSubject, htmlContent, textContent });
    return res.status(200).json({ success: true, message: 'Thank you for contacting ARCEN!' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error sending message.' });
  }
});

export default app;
