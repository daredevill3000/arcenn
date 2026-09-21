import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import TechnologyDomains from './components/TechnologyDomains';
import HowWeThink from './components/HowWeThink';
import Projects from './components/Projects';
import Careers from './components/Careers';
import WhoWeAreLookingFor from './components/WhoWeAreLookingFor';
import LifeAtArcen from './components/LifeAtArcen';
import AboutArcen from './components/AboutArcen';
import RecruitmentProcess from './components/RecruitmentProcess';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ApplicationFormModal from './components/ApplicationFormModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('Backend Engineering');

  const handleOpenApply = (interest = 'Backend Engineering') => {
    setSelectedInterest(interest);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F2EFE6] text-[#11120F] relative selection:bg-[#11120F] selection:text-[#F2EFE6]">
      {/* Fullscreen ARCEN Loading Sequence */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <Navbar onOpenApply={() => handleOpenApply('Backend Engineering')} />

      <main>
        <Hero
          onOpenApply={() => handleOpenApply('Backend Engineering')}
          isLoaded={!loading}
        />
        <Intro />
        <TechnologyDomains />
        <HowWeThink />
        <Projects />
        <Careers onOpenApply={handleOpenApply} />
        <WhoWeAreLookingFor />
        <LifeAtArcen />
        <AboutArcen />
        <RecruitmentProcess />
        <ContactSection onOpenApply={handleOpenApply} />
      </main>

      <Footer />

      {/* Editorial Application Modal */}
      <ApplicationFormModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        initialInterest={selectedInterest}
      />
    </div>
  );
}
