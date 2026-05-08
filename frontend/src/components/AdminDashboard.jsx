import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Phone, MapPin, User, Wrench, AlertCircle, Bell, Mail, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';
const socket = io(API_URL);

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [newBank, setNewBank] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    fetchRequests();
    fetchBanks();

    socket.on('newBooking', (newRequest) => {
      setRequests((prev) => [newRequest, ...prev]);
      setNotification(`New request from ${newRequest.name}!`);
      setTimeout(() => setNotification(null), 5000);
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (e) {}
    });

    return () => socket.off('newBooking');
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
      setLoading(false);
    }
  };

  const handleArchive = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`${API_URL}/api/bookings/${id}/archive`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error('Error archiving request:', error);
    }
  };
  const fetchBanks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/banks`);
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_URL}/api/banks`, newBank, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBank({ name: '', imageUrl: '' });
      fetchBanks();
      setNotification('Bank added successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error adding bank:', error);
    }
  };

  const handleDeleteBank = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/api/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanks();
      setNotification('Bank deleted!');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error deleting bank:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => setActiveTab('requests')}
                className={`text-sm font-bold pb-2 transition-all ${activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Requests ({requests.length})
              </button>
              <button 
                onClick={() => setActiveTab('banks')}
                className={`text-sm font-bold pb-2 transition-all ${activeTab === 'banks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Manage Banks ({banks.length})
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/login';
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
            >
              Logout
            </button>
          </div>
        </header>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-[100] bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <Bell className="w-5 h-5" />
              <span className="font-bold">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          activeTab === 'requests' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {requests.map((req) => (
                  <motion.div
                    key={req._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-600/10 text-blue-600 rounded-2xl">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(req.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{req.name}</h3>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
                      <Wrench className="w-4 h-4" />
                      {req.serviceType}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                        <Phone className="w-4 h-4" />
                        {req.phone}
                      </div>
                      {req.email && (
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <Mail className="w-4 h-4" />
                          {req.email}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        {req.address}
                      </div>
                      <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase">Problem ({req.brand})</div>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">{req.problem}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                        Process
                      </button>
                      <button 
                        onClick={() => handleArchive(req._id)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                      >
                        Archive
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add New Serviced Bank</h2>
                <form onSubmit={handleAddBank} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Bank Name</label>
                    <input 
                      type="text" 
                      value={newBank.name}
                      onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                      placeholder="e.g. Nepal Bank"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Image Link (URL)</label>
                    <input 
                      type="url" 
                      value={newBank.imageUrl}
                      onChange={(e) => setNewBank({ ...newBank, imageUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
                      Add Bank
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {banks.map((bank) => (
                    <motion.div
                      key={bank._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 relative group"
                    >
                      <button 
                        onClick={() => handleDeleteBank(bank._id)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="h-20 flex items-center justify-center mb-4">
                        <img 
                          src={bank.imageUrl} 
                          alt={bank.name} 
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+Link'; }}
                        />
                      </div>
                      <p className="text-center font-bold text-slate-700 dark:text-slate-300 truncate">{bank.name}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
