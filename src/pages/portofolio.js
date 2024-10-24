import React, { useEffect, useState } from "react";
import PortoCard from "../components/portoCard";
import { Link } from "react-router-dom";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiLogoGmail, BiLogoLinkedin } from "react-icons/bi";
import { Heroimage, HeroProduct, HeroService } from "../assets/images";
import { onValue, ref as rtdbref } from "firebase/database";
import { FIREBASE_DB } from "../firebaseinit";
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const Portofolio = () => {

  const [data, setData] = useState([
    { id: 1, title: "Sekilas Tentang Batubara", type: "pertambangan", pict: Heroimage, desc: "Batubara merupakan salah satu komoditas tambang paling penting bagi Indonesia, dan penyumbang deviden terbesar bagi negara untuk diekspor. Di Indonesia kantong cadangan batubara menyebar di beberapa daerah di pulau sumatera hingga Kalimantan, diantaranya adalah jambi, Palembang, Kalimantan timur, Kalimantan Selatan serta papua." },
    { id: 2, title: "MINYAK SOLAR INDSUTRI", type: "peruhahaan", pict: Heroimage, desc: "Indonesia adalah salah satu negara produsen minyak terbesar di dunia, dengan melimpahnya cadangan minyak seharusnya indonesia bisa menjadi salah satu negara kaya seperti halnya negara-negara di  timur tengah , keuntungan inilah yang seharusnya kita maksimalkan, salah satu produk yang paling dibutuhkan adalah minyak solar industry." },
    { id: 3, title: "SENGKETA PERTANAHAN KELAPA SAWIT", type: "perusahaan", pict: Heroimage, desc: "Indonesia adalah negara agraris terbesar di Kawasan  asia Tenggara bahkan dunia, lahan yang melimpah serta subur dari sabang sampai marauke membuat Indonesia dibanjiri banyak komoditas pertanian dan perkebunan. Salah satu komoditas perkebunan terbesar yang di ekspor oleh Indonesia adalah kelapa sawit." },
  ])
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Image */}
      <div className="w-full pt-16 bg-slate-100">
        <div className="w-10/12 mx-auto flex items-center">
          <div className="flex-1 ">
            <h1 className="text-4xl"><span className="text-slate-900 font-light">We Have</span><br /><span className="text-sky-900 font-semibold">So Many Products</span></h1>
            <p className="text-slate-700 text-sm mt-4 w-9/12 tracking-wide">Kami selalu siap membantu Anda dengan solusi kelistrikan yang dapat diandalkan dan sesuai dengan standar tertinggi.</p>
            <div className="flex justify-start gap-3 mt-4">
              <a
                className="mt-3 text-blue-950 w-12 h-12 p-2.5 bg-slate-300 rounded-full inline-block hover:text-white"
                target="_blank"
                href=""
              >
                <BsInstagram className="w-full h-full" />
              </a>
              <a
                className="mt-3 text-blue-950 w-12 h-12 p-2.5 bg-slate-300 rounded-full inline-block hover:text-white"
                target="_blank"
                href=""
              >
                <BiLogoGmail className="w-full h-full" />
              </a>
              <a
                className="mt-3 text-blue-950 w-12 h-12 p-2.5 bg-slate-300 rounded-full inline-block hover:text-white"
                target="_blank"
                href=""
              >
                <BsWhatsapp className="w-full h-full" />
              </a>
              <a
                className="mt-3 text-blue-950 w-12 h-12 p-2.5 bg-slate-300 rounded-full inline-block hover:text-white"
                target="_blank"
                href=""
              >
                <BiLogoLinkedin className="w-full h-full" />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img className="" src={HeroProduct} />
          </div>
        </div>
      </div>

      {/* Scroll Menu */}
      <ul className="flex text-sm justify-center w-11/12 mx-auto py-4 items-stretch">
        <li className="flex-1 px-4 py-2 border-b-2 border-sky-800 text-sky-800 flex justify-center items-center text-center font-semibold"><a>Semua</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>LV & MV Panel</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Electric Motor</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Transformator</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Components & Cable</a></li>
      </ul>


      {/* Project Show */}
      <div className='w-11/12 mx-auto'>
        <div className='flex flex-wrap mt-8 justify-around'>
          <PortoCard title={"Panel LV Custom"} type={"Panel LV"} pict={Heroimage} desc={"Panel MV ini dirancang untuk aplikasi distribusi listrik dengan tegangan hingga 36 kV, ideal untuk sistem yang memerlukan manajemen daya pada skala menengah. Produk ini menawarkan solusi yang aman dan andal untuk distribusi daya yang efisien dalam lingkungan industri, disertai dengan proteksi optimal."} />
          <PortoCard title={"Panel LV Custom"} type={"Panel LV"} pict={Heroimage} desc={"Panel MV ini dirancang untuk aplikasi distribusi listrik dengan tegangan hingga 36 kV, ideal untuk sistem yang memerlukan manajemen daya pada skala menengah. Produk ini menawarkan solusi yang aman dan andal untuk distribusi daya yang efisien dalam lingkungan industri, disertai dengan proteksi optimal."} />
          <PortoCard title={"Panel LV Custom"} type={"Panel LV"} pict={Heroimage} desc={"Panel MV ini dirancang untuk aplikasi distribusi listrik dengan tegangan hingga 36 kV, ideal untuk sistem yang memerlukan manajemen daya pada skala menengah. Produk ini menawarkan solusi yang aman dan andal untuk distribusi daya yang efisien dalam lingkungan industri, disertai dengan proteksi optimal."} />
          {/* {data.map((element, i) => {
            return (
              <PortoCard key={i} id={i} title={element.title} type={element.tag} pict={element.img} desc={element.desc} />
            )
          }
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Portofolio;
