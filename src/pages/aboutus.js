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
        <div className="w-10/12 mx-auto flex md:flex-row flex-col pt-32 items-center">
          <div className="flex-1 flex justify-start relative">
            <img className="md:w-8/12" src={HeroAbout} />
          </div>
          <div className="flex-1 md:mt-0 mt-8 ">
            <p className="text-3xl text-slate-900">“<span className="font-bold">Di Hi-Printing, kami tidak hanya mencetak; </span>kami membantu mewujudkan ide dan impian Anda dalam bentuk yang nyata.​”</p>
            <p className="mt-4 text-slate-700">Hi-Printing adalah penyedia layanan percetakan digital terkemuka yang berkomitmen untuk memberikan solusi cetak berkualitas tinggi untuk berbagai kebutuhan Anda. Berdiri dengan visi untuk menghadirkan inovasi dan efisiensi dalam dunia percetakan, kami hadir untuk memenuhi segala permintaan, baik untuk keperluan pribadi maupun komunitas.</p>
          </div>
        </div>
      </div>

      {/* Visi Misi */}
      {/* <div className="mt-24 flex w-8/12 gap-x-10 mx-auto items-center">
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
      </div> */}

      {/* FAQ */}
      <div className="my-32 flex md:flex-row flex-col items-start w-10/12 mx-auto">
        <div className="flex-1">
          <h2 className="font-medium text-4xl text-slate-800">FAQ</h2>
          <p className="mt-2 text-sm text-slate-700 md:w-8/12">Temukan jawaban untuk pertanyaan-pertanyaan umum seputar produk dan layanan kami</p>
        </div>
        <div className="flex-1">
          <div className="mt-4 py-2 border-b-2 border-slate-800 text-slate-800 flex justify-between items-center">
            <p className="text-slate-800 font-medium">Produk apa saja yang Hiprinting sediakan?</p>
            <FaPlus className="bg-slate-900 p-1.5 text-4xl rounded-full cursor-pointer text-white" />
          </div>
            {/* <p className="py-2 border-b-2 border-slate-800 text-sm">Hi-Printing menyediakan beragam produk cetak berkualitas tinggi untuk memenuhi berbagai kebutuhan Anda. Kami menawarkan layanan cetak kertas untuk berbagai jenis dokumen, seperti brosur, pamflet, dan poster yang efektif untuk materi pemasaran. Selain itu, kami juga memiliki layanan foto copy yang cepat dan efisien untuk dokumen berwarna dan hitam-putih, serta cetak sertifikat untuk acara resmi dan penghargaan dengan desain yang menarik. Layanan scan kertas kami memungkinkan Anda memindai dokumen fisik ke format digital dengan kualitas tinggi, memudahkan penyimpanan dan akses.</p> */}
        
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
