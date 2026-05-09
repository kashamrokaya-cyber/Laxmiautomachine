import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Phone, MapPin, User, Wrench, AlertCircle, Bell, Mail, RefreshCw, LogOut } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllData = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchRequests(), fetchHistory()]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchAllData();
    // Auto-refresh every 60 seconds since Socket.io is disabled
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
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

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/bookings/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`${API_URL}/api/bookings/${id}/archive`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const archivedReq = requests.find(r => r._id === id);
      setRequests((prev) => prev.filter((req) => req._id !== id));
      if (archivedReq) setHistory(prev => [archivedReq, ...prev]);
      setNotification('Request archived to history');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error archiving request:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory((prev) => prev.filter((req) => req._id !== id));
      setNotification('Record deleted permanently');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex gap-6 mt-4">
              <button 
                onClick={() => setActiveTab('requests')}
                className={`pb-2 text-sm font-bold transition-all ${activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Active Requests ({requests.length})
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`pb-2 text-sm font-bold transition-all ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Archive History ({history.length})
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchAllData}
              disabled={isRefreshing}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/login';
              }}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
            >
              <LogOut className="w-4 h-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {(activeTab === 'requests' ? requests : history).map((req) => (
                <motion.div
                  key={req._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all group relative"
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
                    {activeTab === 'requests' ? (
                      <>
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                          Process
                        </button>
                        <button 
                          onClick={() => handleArchive(req._id)}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                          Archive
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleDeleteRequest(req._id)}
                        className="w-full py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                      >
                        Delete Permanently
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
