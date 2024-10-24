import React from "react";
import { HeroAbout, } from "../assets/images";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

import { FaPlus, FaMinus } from "react-icons/fa6";


function Aboutus() {

  return (
    <div className="">
      
      {/* Hero Image */}
      <div className="w-full">
        <div className="w-10/12 mx-auto flex pt-16 items-center">
          <div className="flex-1 flex justify-start relative pt-32">
            <div className="w-full h-full bg-slate-100 -z-10 absolute bottom-0 -left-28 rounded-3xl"></div>
            <img className="w-8/12" src={HeroAbout} />
          </div>
          <div className="flex-1">
            <p className="text-3xl text-slate-900">“By prioritizing quality, efficiency and good work ethics supported by professional human resources <span className="font-medium text-sky-800">PT Repayo Mandiri always strive and committed to provide solutions in achieving client goals</span>.​”</p>
            <p className="mt-4 text-slate-700">PT Repayo Mandiri has been established since September 2007, which focused on general supply, designing, manufacturing, assembling production, and repair of electrical panels with full license and insurance coverage. We provide electricity goods such as MCB, MCCB, ACB, Contactor, Variable Speed Drive, Soft Starter, Power Cable, Plug, Socket, Panel and Accessories.</p>
          </div>
        </div>
      </div>

      {/* Visi Misi */}
      <div className="mt-24 flex w-8/12 gap-x-10 mx-auto items-center">
        <h2 className="text-7xl font-semibold w-3/12 text-slate-800">Visi & Misi</h2>
        <div className="flex-1">
          <p className="text-slate-700 text-xl"><span className="font-semibold">Our Vision</span> To be the leader in electrical construction and high quality panel manufacturing</p>
          <p className="text-slate-700 text-xl mt-4"><span className="font-semibold">Our Mission:</span></p>
          <ul className="text-slate-700 text-lg list-disc">
            <li>Providing safe and cost efficiency electrical solutions</li>
            <li>Producing high quality panels assembled based on customer requirements</li>
            <li>Committed to government environmental sustainability and work safety standards</li>
            <li>Established customer satisfaction derived from trust and excellent service</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="my-32 flex items-start w-10/12 mx-auto">
        <div className="flex-1">
          <h2 className="font-medium text-4xl text-slate-800">FAQ</h2>
          <p className="mt-2 text-sm text-slate-700 w-8/12">Temukan jawaban untuk pertanyaan-pertanyaan umum seputar produk dan layanan kami</p>
        </div>
        <div className="flex-1">
          <div className="mt-4 py-2 border-b-2 border-slate-800 text-slate-800 flex justify-between items-center">
            <p className="text-slate-800 font-medium">Produk apa saja yang PT Repayo Mandiri sediakan?</p>
            <FaPlus className="bg-slate-900 p-1.5 text-4xl rounded-full cursor-pointer text-white" />
          </div>
            <p className="py-2 border-b-2 border-slate-800 text-sm">Kami menyediakan berbagai produk kelistrikan seperti panel LV & MV, motor listrik, transformator, komponen, dan kabel berkualitas tinggi untuk mendukung berbagai kebutuhan industri.</p>
        
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
