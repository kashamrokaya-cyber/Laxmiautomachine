import React from 'react';
import { motion } from 'framer-motion';
import workshopBg from '../assets/workshop_upcoming.png';
import { MapPin, Clock } from 'lucide-react';

const Upcoming = () => {
  const futureLocations = [
    { city: 'Pokhara', address: 'New Road', eta: 'Q3 2028' },
    { city: 'Butwal', address: 'Traffic Chowk, Main Road', eta: 'Q4 2027' },
    { city: 'Biratnagar', address: 'Main Road, Ward 7', eta: 'Q1 2027' },
    { city: 'Nepalgunj', address: 'Dhamboji', eta: 'Q2 2027' },
    { city: 'Chitwan', address: 'NarayanGhad', eta: 'Q3 2027' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={workshopBg}
            alt="Future Workshop"
            className="w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
              Expansion in Progress
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Our Upcoming <br />
              <span className="text-blue-500">Service Hubs</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-300">
              We are expanding our reach to provide expert counting machine repair services
              closer to your business location.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futureLocations.map((loc, index) => (
            <motion.div
              key={index}
              
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              
              className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all"
            >
             
              <div className="w-14 h-14 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{loc.city}</h3>
              <p className="text-slate-400 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Coming {loc.eta}
              </p>
              <div className="pt-6 border-t border-slate-800">
                <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">Planned Site</p>
                <p className="text-slate-300 font-medium">{loc.address}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 rounded-3xl bg-blue-600 text-center text-white overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Want us in your city?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Suggest a location for our next service hub and get priority support
              when we open in your area.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Suggest a Location
            </button>
          </div>
          {/* Decorative Background Icon */}
          <MapPin className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
        </motion.div>
      </section>
    </div>
  );
};

export default Upcoming;
