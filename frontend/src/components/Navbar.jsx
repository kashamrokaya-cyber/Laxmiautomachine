import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo1.jpeg'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/services' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Banks', to: '/serviced-banks' },
    { name: 'Upcoming', to: '/upcoming' },
  
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'py-2 glass shadow-lg' : 'py-4 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-400  rounded-full">
              <img className='w-10 h-10 rounded-full' src={logo} alt="Logo" />
              
            </div>
            <span className={`text-xl font-bold ${scrolled || darkMode || isOpen ? 'text-white' : 'text-slate-900'}`}>
              Laxmi<span className="text-blue-600">AutoMachineTraders</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative cursor-pointer transition-colors ${isActive ? 'text-blue-600 font-bold' : (scrolled || darkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-blue-600')
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-700" />}
            </button>
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
            >
              Book Service
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleDarkMode}>
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-700" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled || darkMode || isOpen ? 'text-white' : 'text-slate-900'}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg transition-colors ${isActive ? 'text-blue-400 font-bold' : 'text-white hover:text-blue-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-center"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
