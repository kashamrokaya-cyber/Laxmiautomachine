import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Counting Machine Repair"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            <span>Expert Repair Service in nepal By</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
              className='text-white'
            >
              Tanka Raj Bam
            </motion.span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Professional  <br />
            <span className="text-blue-500">Services For</span>  currency counting machine, printers and security system 
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Fast, reliable, and professional repair services for all types of office equipments and note counting machines across Nepal.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/30"
            >
              Contact Now
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 glass text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Book Service
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating element for tech feel */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-15 left-1/2 -translate-x-1/2 text-white opacity-50 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
