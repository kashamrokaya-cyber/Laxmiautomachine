import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Basic Repair',
    price: 'Rs. 500 to 1500',
    period: 'starting from',
    features: [
      'Basic Cleaning',
      'Sensor Calibration',
      'Software Update',
      '30-Day Warranty'
    ],
    notIncluded: [
      'Spare Parts',
      'On-site Service',
      'Priority Support'
    ],
    recommended: false
  },
  {
    name: 'Standard Maintenance',
    price: 'Rs. 1500 to 2,500',
    period: 'per visit',
    features: [
      'Deep Internal Cleaning',
      'Full Calibration',
      'Genuine Parts Replacement',
      '90-Day Warranty',
      'On-site Service'
    ],
    notIncluded: [
      'Priority Support',
      'Replacement Machine'
    ],
    recommended: true
  },
  {
    name: 'Annual Package',
    price: 'Rs. 2500 to 15,000',
    period: 'per year',
    features: [
      'Unlimited Repairs',
      'Quarterly Maintenance',
      'Priority Support',
      'Free Spare Parts',
      'Replacement Machine',
      '1-Year Warranty'
    ],
    notIncluded: [],
    recommended: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Service Pricing</h2>
          <p className="text-slate-600 dark:text-slate-400">Transparent pricing for all our repair and maintenance services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border ${
                plan.recommended ? 'border-blue-500 scale-105 z-10' : 'border-slate-100 dark:border-slate-700'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm">{plan.period}</span>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-50">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.recommended 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
