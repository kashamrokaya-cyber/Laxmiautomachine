import React from 'react';
import { motion } from 'framer-motion';
import aboutpageimage from '../assets/aboutpageimage.jpeg';
import { CheckCircle2, Users, Clock, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Technicians', value: '10+', icon: <Users /> },
    { label: 'Years Experience', value: '5+', icon: <Clock /> },
    { label: 'Service Coverage', value: '25+ Districts', icon: <Globe /> },
    { label: 'Satisfied Clients', value: '5000+', icon: <CheckCircle2 /> }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl"></div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Experienced Counting Machine <br /> 
                <span className="text-blue-600">Repair Experts in Nepal</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                With over a decade of experience, we have established ourselves as the leading service provider for currency handling equipment in Nepal. Our team of certified technicians is dedicated to providing fast and reliable repair solutions.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We understand that every minute of downtime costs you money. That's why we offer doorstep services across all major cities and districts of Nepal, ensuring your business operations never stop.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="text-blue-600 w-10 h-10 flex items-center justify-center bg-blue-600/10 rounded-lg">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src={aboutpageimage}
                alt="Repair Workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
            </div>
            {/* Glass Card Overlay */}
            <div className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl z-20 max-w-xs hidden sm:block">
              <p className="text-slate-900 dark:text-white font-semibold">
                "Fast service and genuine parts. Highly recommended for banks!"
              </p>
              <p className="text-blue-600 text-sm mt-2">- Branch Manager, NIMB</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
