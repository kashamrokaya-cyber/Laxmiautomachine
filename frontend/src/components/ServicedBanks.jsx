import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ADBL from "../bankImages/ADBL.jpg"
import Citizen from "../bankImages/Citizen.png"
import Everest from "../bankImages/Everest.jpg"
import Himalayan from "../bankImages/Himalayan.png"
import LaxmiSunrise from "../bankImages/laxmi-sunrise.jpg"
import Muktinath from "../bankImages/Muktinath-Bikas-Bank.png"
import Nabil from "../bankImages/Nabil.jpg"
import Nimb from "../bankImages/Nimb.png"
import NMB from "../bankImages/NMB.png"
import NRB from "../bankImages/NRB.jpg"
import Prime from "../bankImages/Prime.png"
import Rbb from "../bankImages/rbb.jpg"
import Pravu from "../bankImages/Pravu.jpg"


const ServicedBanks = () => {
  const [banks, setBanks] = useState([
    {
      id:1,
      imageUrl:ADBL,
      name:"Agriculture development Bank"

    },
    {
      id:2,
      imageUrl:Citizen,
      name:"Citizen Bank",

    },
    {
      id:3,
      imageUrl:Everest,
      name:"Everest Bank"
    },
    {
      id:4,
      imageUrl:Himalayan,
      name:"Himalayan bank"
    },
    {
      id:5,
      imageUrl:LaxmiSunrise,
      name:"Laxmi Sunrise Bank"
    },
    {
      id:6,
      imageUrl:Muktinath,
      name:"Muktinath Bank"
    },
    {
      id:7,
      imageUrl:Nabil,
      name:"Nabil Bank"
    },
    {
      id:8,
      imageUrl:Nimb,
      name:"Nepal Investment bank limited"
    },
    {
      id:9,
      imageUrl:NMB,
      name:"Nepal Mega Bank"
    },
    {
      id:10,
      imageUrl:NRB,
      name:"Nepal Rastriya Bank"
    },
    {
      id:11,
      imageUrl:Prime,
      name:"Prime Bank"
    },
    {
      id:12,
      imageUrl:Rbb,
      name:"Reastriya Banijya Bank"
    },
    {
      id:13,
      imageUrl:Pravu,
      name:"Pravu Bank"
    }
  ]);
  


  return (
    <section id="serviced-banks" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Banks We Serviced</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Trusted by major financial institutions across Nepal for reliable counting machine maintenance and repair.
          </p>
        </div>

       
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {
              banks.map((bank) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className=" overflow-hidden p-2 rounded-2xl border border-slate-100  flex items-center justify-center  hover:grayscale-0 transition-all duration-500 group"
                >
                  <img
                    src={bank.imageUrl}
                    alt={bank.name}
                    className="w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                   
                  />
                </motion.div>
              ))
             
             
            }
          </div>
        
      </div>
    </section>
  );
};

export default ServicedBanks;
