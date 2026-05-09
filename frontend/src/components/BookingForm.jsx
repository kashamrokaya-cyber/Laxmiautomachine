import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const BookingForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    problem: '',
    brand: '',
    serviceType: 'Repair Service'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.indexOf("application/json") !== -1) {
        setStatus('success');
        setFormData({ name: '', phone: '', address: '', problem: '', brand: '', serviceType: 'Repair Service' });
      } else {
        console.error('Invalid response from server:', await response.text());
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border border-green-100 dark:border-green-900 text-center"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Service Booked Successfully!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Our technician will contact you within 30 minutes to confirm the appointment.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-blue-600 font-bold hover:underline"
        >
          Book Another Service
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Book Your Repair Service</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Laxmi shahi (Owner)"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. 98XXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. ram@example.com"
            value={formData.email}
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address *</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Suryabinayk,  Bhaktapur Nepal"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Machine Brand *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Godrej"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Type</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.serviceType}
              onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            >
              <option>Purchase of New Machine </option>
              <option>Repair Service</option>
              <option>Spare Parts</option>
              <option>AMC Package</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Machine Problem *</label>
          <textarea
            rows="3"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Describe the issue..."
            value={formData.problem}
            onChange={(e) => setFormData({...formData, problem: e.target.value})}
          ></textarea>
        </div>
        
        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">Failed to connect to server. Please try again later.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              Processing...
              <Loader2 className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              Submit Booking Request
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
