import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rajesh Sharma',
    role: 'Operations Manager, Kathmandu Bank',
    content: 'The service is exceptionally fast. Our main counting machine broke down during peak hours, and they fixed it within 2 hours on-site.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=rajesh'
  },
  {
    name: 'Sita Gurung',
    role: 'Owner, Gurung Trading',
    content: 'Very professional technicians. They used genuine parts and provided a clear invoice. Highly recommended for any counting machine issues.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sita'
  },
  {
    name: 'Amit Thapa',
    role: 'Treasurer, Co-operative Society',
    content: 'We signed up for their annual maintenance package, and we haven\'t had a single machine breakdown since then. Excellent service!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=amit'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Customer Testimonials</h2>
          <p className="text-slate-600 dark:text-slate-400">What our clients say about our repair services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-600/10" />
              <div className="flex items-center gap-4 mb-6">
                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full border-2 border-blue-600" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 italic">"{review.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
