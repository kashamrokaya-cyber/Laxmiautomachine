import React from 'react';
import { Globe, Send, Camera, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo1.jpeg'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-1 mb-6">
              <div className="bg-blue-600 p-1 rounded-full">
                <img className='w-10 h-10 rounded-full' src={Logo} alt="Logo" />
              </div>
              <span className="text-2xl font-bold">
                Laxmi<span className="text-blue-600">AutoMachine</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6">
              The most trusted counting machine repair service provider in Nepal. We ensure your business never stops.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/laxmiautomachine?igsh=eTB4amptOTR2anI2" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@notecountingmachinerepai?_r=1&_t=ZS-96AGCxbdimC" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@notecountingmachinenepal?si=1xep6qQk-EgF8pB2" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors">
               <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/laxmi.automachine?mibextid=ZbWKwL" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-blue-500 cursor-pointer">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 cursor-pointer">Services</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 cursor-pointer">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-500 cursor-pointer">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li>Currency Counting</li>
              <li>Money Detectors</li>
              <li>Machine Maintenance</li>
              <li>Spare Parts</li>
              <li>Annual Package</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-400">
              <li>Suryabinayak-2, Balkot Bhaktapur</li>
              <li>+977 9825474487</li>
              <li>laxmiautomachine@gmail.com</li>
              <li>www.laxmiautomachine.com</li>
              
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LaxmiAutomachine Repair Services. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
