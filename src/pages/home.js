import React from "react";
import { Link } from "react-router-dom";
import { LogoClient1, LogoClient2, LogoClient3, LogoClient4, LogoClient5, LogoClient6, LogoClient7, IconService1, IconService2, IconService3, IconService4 } from "../assets/icons";
import {
  Heroimage,
} from "../assets/images";
import { MdAttachMoney, MdHighQuality, Md24Mp } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect, useState } from "react";
import { BlogCard } from "../components";
import { onValue, ref as rtdbref } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import Slider from 'react-infinite-logo-slider'


function Home() {
  const [dataArt, setDataArt] = useState([])
  const [keyArticle, setKeyArticle] = useState([])
  useEffect(() => {
    onValue(rtdbref(FIREBASE_DB, "data"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data);
        setKeyArticle(key.slice(-3));
        setDataArt(data);
      }
    });
  }, []);

  return (
    <div className="bg-slate-50 overflow-x-hidden">
      {/* Header Desktop */}
      <div className=" text-center pt-28 pb-8 flex flex-col md:flex-row w-10/12 mx-auto items-center">
        <div className="text-left flex-1 md:mx-16 mt-4 md:mt-0 md:order-1 order-2">
          <h1 className="uppercase text-4xl text-slate-950 font-bold">Hi-Printing</h1>
          <h2 className="capitalize text-2xl text-slate-800 font-light leading-loose">By Higenncy</h2>
          <p className="mx-auto text-sm mt-2 text-slate-700 leading-loose">Menyediakan solusi percetakan digital berkualitas untuk mendukung kebutuhan pribadi dan komunitas Anda. Kami hadir dengan produk terbaik dan layanan profesional untuk memastikan setiap cetakan memenuhi harapan dan memberikan hasil yang memuaskan.</p>

          <div className="mt-8">
            <a href="https://wa.me/+6285643518494" className="bg-rose-700 text-white px-6 py-2.5 rounded-full">Cetak Sekarang</a>
            <a href="https://wa.me/+6285643518494" className="bg-slate-50 text-slate-950 px-6 py-2 rounded-full mx-4">Hubungi Kami</a>
          </div>
        </div>
        <div className="mt-8 flex-1 h-96 mx-auto md:order-2 order-1">
          <img className="w-full h-full object-cover rounded-xl" src={Heroimage} />
        </div>

      </div>


      {/* Achievements */}
      <div className="w-full bg-slate-50">
        {/* <h2 className="text-center text-4xl capitalize font-bold text-slate-800 pt-24">Supplier Kami</h2>
        <p className="mx-auto w-5/12 text-center text-slate-700 mt-2 text-sm leading-loose">Kami bekerja sama dengan pemasok terpercaya yang menyediakan bahan dan komponen berkualitas tinggi, memastikan setiap produk yang kami tawarkan memenuhi standar terbaik dalam percetakan digital. </p>
        <hr className="w-8/12 mx-auto mt-8" /> */}
        {/* Clients */}
        <div className=" w-full mx-auto bg-slate-50 flex items-center justify-around">
          <Slider

            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
          >
            <Slider.Slide>
              <img className="w-12" src={LogoClient1} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-24" src={LogoClient2} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-20" src={LogoClient3} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-24" src={LogoClient4} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-24" src={LogoClient5} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-24" src={LogoClient6} />
            </Slider.Slide>
            <Slider.Slide>
              <img className="w-24" src={LogoClient7} />
            </Slider.Slide>
          </Slider>
        </div>
      </div>

      {/* Our service */}
      <div className="md:w-10/12 w-full mx-auto rounded-lg px-12 py-10">
        <h2 className="text-center text-4xl font-bold capitalize text-slate-800 pt-24">Layanan Kami</h2>
        <p className="mx-auto md:w-7/12 text-center text-slate-700 mt-2 leading-loose text-sm">Dengan teknologi pencetakan digital terkini, kami menawarkan layanan cetak yang berkualitas tinggi, cepat, dan efisien untuk memenuhi berbagai kebutuhan Anda.</p>

        <div className="flex flex-wrap mt-12">

          <div className="flex items-start md:gap-y-0 gap-y-4 gap-x-4 w-full md:w-6/12 mt-8 px-4">
            <div className="bg-green-700 p-3 rounded-full">
              <MdAttachMoney className="text-3xl text-white" />
            </div>
            <div>
              <p className="text-slate-800 font-medium text-xl">Harga Kompetitif</p>
              <p className="text-sm font-light text-slate-700 leading-relaxed mt-2">Kami menawarkan tarif yang bersaing tanpa mengorbankan kualitas. Dengan Hi-Printing, Anda mendapatkan nilai terbaik untuk setiap cetakan yang Anda pesan.</p>
            </div>
          </div>

          <div className="flex items-start gap-x-4 w-full md:w-6/12 mt-8 px-4">
            <div className="bg-orange-700 p-3 rounded-full">
              <MdHighQuality className="text-3xl text-white" />
            </div>
            <div>
              <p className="text-slate-800 font-medium text-xl">Antar Jemput Kapanpun, Dimanapun</p>
              <p className="text-sm font-light text-slate-700 leading-relaxed mt-2">Kami siap mengambil dan mengantarkan pesanan cetak Anda dengan fleksibilitas waktu dan lokasi yang sesuai kebutuhan Anda.</p>
            </div>
          </div>

          <div className="flex items-start gap-x-4 w-full md:w-6/12 mt-8 px-4">
            <div className="bg-teal-700 p-3 rounded-full">
              <TbTruckDelivery className="text-3xl text-white" />
            </div>
            <div>
              <p className="text-slate-800 font-medium text-xl">Kualitas Cetakan Unggul</p>
              <p className="text-sm font-light text-slate-700 leading-relaxed mt-2">Dengan teknologi pencetakan terkini dan bahan berkualitas, hasil cetakan kami selalu tajam, jelas, dan memuaskan, memenuhi ekspektasi tinggi Anda.</p>
            </div>
          </div>

          <div className="flex items-start gap-x-4 w-full md:w-6/12 mt-8 px-4">
            <div className="bg-amber-700 p-3 rounded-full">
              <Md24Mp className="text-3xl text-white" />
            </div>
          <div>
            <p className="text-slate-800 font-medium text-xl">Layanan 24 Jam</p>
            <p className="text-sm font-light text-slate-700 leading-relaxed mt-2">Kami memahami pentingnya waktu dalam setiap proyek. Hi-Printing menyediakan layanan 24 jam, siap membantu Anda kapan saja, sehingga Anda dapat memenuhi tenggat waktu Anda tanpa kendala.</p>
          </div>
        </div>


      </div>
    </div>




      {/* Article */ }
  {/* <div className="w-full mt-32">
    <div className="flex flex-wrap justify-between w-10/12 mx-auto bg-slate-50 ">
      {keyArticle != []
        ? keyArticle?.map((key) => {
          return (
            <BlogCard
              key={key}
              title={dataArt[key].title}
              tag={dataArt[key].tag}
              imgArt={dataArt[key].image}
              desc={dataArt[key].desc}
              dateTime={key}
            />
          );
        })
        : null}
    </div>
  </div> */}


  {/* Alamat Maps Perusahaan */ }
  <div className="pt-36 -mt-24 pb-8">
    <div className="flex md:flex-row flex-col justify-around md:w-10/12 w-full mx-auto items-center">
      <div className="md:w-7/12 w-full rounded-xl p-8">
        <div className="w-full rounded-lg"><iframe className="rounded-xl" width="100%" height="400" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=XC3R+FJC,%20Tembalang,%20Semarang%20City,%20Central%20Java%2050275+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>
      </div>
      <div className="flex-1 px-8">
        <h3 className="text-4xl capitalize font-bold">Kunjungi Kami</h3>
        <p className="text-sm font-light text-slate-700 mt-2 ">KKIB Universitas Diponegoro, Tembalang, Semarang City, Central Java 50275</p>
      </div>
    </div>


    {/* CTA Whatsapp */}
    <div className="bg-gradient-to-r from-sky-800 to-indigo-900 md:w-10/12 mx-4 md:mx-auto my-24 p-14 rounded-3xl">
      <h3 className="text-4xl text-white capitalize font-semibold">Punya Permintaan Khusus?<br /> <span className="text-2xl">Kami Siap Membantu!</span></h3>
      <p className="text-sm font-light text-slate-100 mt-2 md:w-7/12 leading-loose">Tim kami siap berdiskusi dan memberikan solusi terbaik yang sesuai dengan kebutuhan Anda. Klik tombol di bawah ini untuk mengirimkan permintaan Anda langsung kepada kami.</p>
      <a href="https://wa.me/+6285643518494" className="bg-slate-50 inline-block text-slate-950 px-6 py-2 rounded-xl mt-5">Hubungi Kami</a>
    </div>

  </div>



    </div >
  );
}

export default Home;
