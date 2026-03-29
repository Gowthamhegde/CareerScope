import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobExplorer from './pages/JobExplorer';
import JobDetail from './pages/JobDetail';
import SalaryPredictor from './pages/SalaryPredictor';
import SalaryCalculator from './pages/SalaryCalculator';
import CityComparison from './pages/CityComparison';
import SkillsAnalysis from './pages/SkillsAnalysis';
import Dashboard from './pages/Dashboard';
import CareerAdvisor from './pages/CareerAdvisor';
import OfferAnalyzer from './pages/OfferAnalyzer';
import ResumeSalaryEstimator from './pages/ResumeSalaryEstimator';
import InterviewPrep from './pages/InterviewPrep';
import FreelanceCalculator from './pages/FreelanceCalculator';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global Background Effects */}
      <div className="noise-overlay" />
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="glow-orb cyan-orb" />
        <div className="glow-orb magenta-orb" />
      </div>

      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<JobExplorer />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/predictor" element={<SalaryPredictor />} />
            <Route path="/calculator" element={<SalaryCalculator />} />
            <Route path="/city-comparison" element={<CityComparison />} />
            <Route path="/skills-analysis" element={<SkillsAnalysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/career-advisor" element={<CareerAdvisor />} />
            <Route path="/offer-analyzer" element={<OfferAnalyzer />} />
            <Route path="/resume-estimator" element={<ResumeSalaryEstimator />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/freelance-calculator" element={<FreelanceCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;