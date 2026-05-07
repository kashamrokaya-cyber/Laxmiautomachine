import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How long does a typical repair take?',
    answer: 'Most basic repairs are completed within 2-4 hours. For major issues or spare parts replacements, it might take 1-2 business days.'
  },
  {
    question: 'Do you provide on-site repair services?',
    answer: 'Yes, we provide doorstep repair and maintenance services for businesses and homes across Nepal, including Kathmandu, Pokhara, and major cities.'
  },
  {
    question: 'Which brands do you repair?',
    answer: 'We repair all major brands of counting machines including Godrej, Kavinstar, Swisstek, Maxell, and various imported Chinese models.'
  },
  {
    question: 'Do you provide a warranty on repairs?',
    answer: 'Yes, we provide a 30 to 90-day warranty on all our repair services and a 1-year warranty on new spare parts installed by us.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <span className="font-bold text-slate-900 dark:text-white">{faq.question}</span>
                {activeIndex === index ? <Minus className="text-blue-600" /> : <Plus className="text-blue-600" />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
