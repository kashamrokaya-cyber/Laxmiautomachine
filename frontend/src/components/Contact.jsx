import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';

const Contact = () => {
  const contactInfo = [
    { icon: <Phone className="text-blue-600" />, label: 'Phone', value: '+977 9847348949' },
    { icon: <MessageCircle className="text-green-500" />, label: 'WhatsApp', value: '+977 9848109713', isLink: true },
    { icon: <Mail className="text-red-500" />, label: 'Email', value: 'laxmiautomachine@gmail.com' },
    { icon: <MapPin className="text-purple-600" />, label: 'Location', value: 'Suryabinayk,  Bhaktapur Nepal' },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              Need immediate repair? Fill out the form or contact us directly through the channels below.
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{info.label}</div>
                    <div className="font-bold text-slate-900 dark:text-white">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-blue-600" />
                <h4 className="font-bold text-slate-900 dark:text-white">Business Hours</h4>
              </div>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday-Sunday</span>
                  <span className="font-semibold">8:00 AM -8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <BookingForm />
          </div>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden h-[400px] shadow-xl border border-slate-200 dark:border-slate-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.316259513!2d85.291113!3d27.7089559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1715050000000!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
