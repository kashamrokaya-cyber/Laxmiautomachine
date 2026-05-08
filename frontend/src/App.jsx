import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import ServicedBanks from './components/ServicedBanks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PageWrapper from './components/PageWrapper';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Upcoming from './components/Upcoming';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /><Services /><About /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/serviced-banks" element={<PageWrapper><ServicedBanks /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/upcoming" element={<PageWrapper><Upcoming /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Layout component to handle conditional Navbar/Footer
const Layout = ({ children, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingWhatsApp />}
      
      {isAdminPage && location.pathname !== '/login' && (
        <footer className="py-6 text-center text-slate-500 text-sm bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <p>&copy; {new Date().getFullYear()} LaxmiAuto Admin Panel. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <ScrollToTop />
        <AnimatePresence>
          {loading ? (
            <PageLoader key="loader" />
          ) : (
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <AnimatedRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Layout>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

const PageLoader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[999] bg-white dark:bg-slate-950 flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">LaxmiAuto Repair</h2>
    </div>
  </motion.div>
);

export default App;
