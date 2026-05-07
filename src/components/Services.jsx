import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Search, 
  Wrench, 
  Cpu, 
  Home, 
  Calendar,
  ShieldCheck,
  Zap,
  UserCheck,
  Package,
  Truck
} from 'lucide-react';

const services = [
  {
    title: 'Currency Counting Machine Repair',
    description: 'Expert repair for all brands of note counting machines. We fix sensors, motors, and displays.',
    icon: <Calculator className="w-8 h-8" />,
    color: 'bg-blue-500'
  },
  {
    title: 'Money Detector Repair',
    description: 'Specialized maintenance for UV, MG, and IR fake note detectors to ensure maximum accuracy.',
    icon: <Search className="w-8 h-8" />,
    color: 'bg-cyan-500'
  },
  {
    title: 'Machine Maintenance',
    description: 'Regular cleaning and calibration to extend the life of your equipment and prevent breakdowns.',
    icon: <Wrench className="w-8 h-8" />,
    color: 'bg-indigo-500'
  },
  {
    title: 'Spare Parts Replacement',
    description: 'We use 100% genuine spare parts for long-lasting repairs and optimal performance.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'bg-blue-600'
  },
  {
    title: 'On-site Service',
    description: 'Convenient doorstep repair services for businesses across Nepal. We come to you!',
    icon: <Home className="w-8 h-8" />,
    color: 'bg-sky-500'
  },
  {
    title: 'Annual Service Package',
    description: 'Hassle-free maintenance contracts for banks, co-operatives, and retail stores.',
    icon: <Calendar className="w-8 h-8" />,
    color: 'bg-blue-700'
  }
];

const reasons = [
  { title: 'Fast Repair', icon: <Zap /> },
  { title: 'Affordable Price', icon: <Package /> },
  { title: 'Experienced Technicians', icon: <UserCheck /> },
  { title: 'Genuine Parts', icon: <ShieldCheck /> },
  { title: 'Doorstep Service', icon: <Truck /> }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Our Professional Services
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full"
          ></motion.div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive repair and maintenance solutions tailored for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:border-blue-500/50 transition-all group"
            >
              <div className={`${service.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div id="why-choose-us" className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-md border border-slate-100 dark:border-slate-700"
              >
                <div className="text-blue-600">
                  {reason.icon}
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {reason.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
