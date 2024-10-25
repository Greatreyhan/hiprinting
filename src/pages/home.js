import React from "react";
import { Link } from "react-router-dom";
import { LogoClient1, LogoClient2, LogoClient3, LogoClient4, LogoClient5, IconService1, IconService2, IconService3, IconService4 } from "../assets/icons";
import {
  Heroimage,
} from "../assets/images";
import "aos/dist/aos.css";
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
      <div className="bg-slate-200 text-center pt-28 pb-8">
        <h1 className="uppercase text-4xl text-slate-950 font-bold">PT Repayo Mandiri</h1>
        <h2 className="capitalize text-2xl text-slate-800 font-light leading-loose">General Supplier Electrical & Panel Maker</h2>
        <p className="w-6/12 mx-auto text-sm mt-2 text-slate-700 leading-loose">Menyediakan solusi kelistrikan dan pembuatan panel berkualitas untuk mendukung operasional industri Anda. Kami hadir dengan produk terbaik dan layanan profesional untuk memastikan efisiensi dan keamanan.</p>

        <div className="mt-8">
          <Link className="bg-sky-800 text-white px-6 py-2.5 rounded-full mx-4">Hubungi Kami</Link>
          <button className="bg-slate-50 text-slate-950 px-6 py-2 rounded-full mx-4">Lihat Produk</button>
        </div>

        <div className="mt-8 w-10/12 h-96 mx-auto">
          <img className="w-full h-full object-cover rounded-xl" src={Heroimage} />
        </div>

      </div>


      {/* Achievements */}
      <div className="w-full bg-slate-50">
        <h2 className="text-center text-4xl capitalize font-bold text-slate-800 pt-24">Supplier Kami</h2>
        <p className="mx-auto w-5/12 text-center text-slate-700 mt-2 text-sm leading-loose">Kami bekerja sama dengan pemasok terpercaya yang menyediakan komponen kelistrikan berkualitas tinggi, memastikan produk yang kami tawarkan memenuhi standar industri dan performa terbaik</p>
        <hr className="w-8/12 mx-auto mt-8" />
        {/* Clients */}
        <div className="w-10/12 mx-auto bg-slate-50 flex items-center justify-around">
          <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
          >
            <Slider.Slide>
            <img className="w-32" src={LogoClient1} />
            </Slider.Slide>
            <Slider.Slide>
            <img className="w-32" src={LogoClient2} />
            </Slider.Slide>
            <Slider.Slide>
            <img className="w-32" src={LogoClient3} />
            </Slider.Slide>
            <Slider.Slide>
            <img className="w-32" src={LogoClient4} />
            </Slider.Slide>
            <Slider.Slide>
            <img className="w-32" src={LogoClient5} />
            </Slider.Slide>
          </Slider>
        </div>
      </div>

      {/* Our service */}
      <div className="w-10/12 mx-auto rounded-lg px-12 py-10">
        <h2 className="text-center text-4xl font-bold capitalize text-slate-800 pt-24">Produk Kami</h2>
        <p className="mx-auto w-7/12 text-center text-slate-700 mt-2 leading-loose text-sm">Kami menyediakan berbagai produk kelistrikan berkualitas, mulai dari komponen listrik hingga panel listrik custom.</p>

        <div className="flex flex-wrap">

          <div className="flex gap-x-4 w-6/12 mt-8 px-4">
            <img className="bg-sky-900 p-2 w-12 h-12 rounded-full" src={IconService1} />
            <div>
              <p className="text-slate-800 font-medium text-2xl">LV & MV Panel</p>
              <p className="text-sm font-light text-slate-700 leading-normal">Panel tegangan rendah (LV) dan menengah (MV) kami dirancang untuk mengelola distribusi listrik secara aman dan efisien di berbagai aplikasi industri, dengan kualitas yang sesuai standar.</p>
            </div>
          </div>

          <div className="flex gap-x-4 w-6/12 mt-8 px-4">
            <img className="bg-sky-900 p-2 w-12 h-12 rounded-full" src={IconService2} />
            <div>
              <p className="text-slate-800 font-medium text-2xl">Electric Motor</p>
              <p className="text-sm font-light text-slate-700 leading-normal">Kami menyediakan motor listrik berkinerja tinggi untuk berbagai keperluan industri, dirancang untuk daya tahan dan efisiensi dalam menggerakkan mesin.</p>
            </div>
          </div>

          <div className="flex gap-x-4 w-6/12 mt-8 px-4">
            <img className="bg-sky-900 p-2 w-12 h-12 rounded-full" src={IconService3} />
            <div>
              <p className="text-slate-800 font-medium text-2xl">Transformator</p>
              <p className="text-sm font-light text-slate-700 leading-normal">Transformator (trafo) kami menawarkan solusi konversi tegangan yang andal dan stabil, memastikan distribusi energi listrik yang aman dan efisien.</p>
            </div>
          </div>

          <div className="flex gap-x-4 w-6/12 mt-8 px-4">
            <img className="bg-sky-900 p-2 w-12 h-12 rounded-full" src={IconService4} />
            <div>
              <p className="text-slate-800 font-medium text-2xl">Component & Cable</p>
              <p className="text-sm font-light text-slate-700 leading-normal">Berbagai komponen listrik dan kabel berkualitas tinggi untuk memastikan sistem kelistrikan yang andal dan aman, mendukung kebutuhan instalasi Anda.</p>
            </div>
          </div>


        </div>
      </div>




      {/* Article */}
      <div className="w-full mt-32">
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
      </div>


      {/* Alamat Maps Perusahaan */}
      <div className="bg-slate-300 pt-36 -mt-24 pb-8">
        <div className="flex justify-around w-10/12 mx-auto items-center">
          <div className="w-7/12 rounded-xl p-8">
            <div className="w-full rounded-lg"><iframe className="rounded-lg" width="100%" height="350" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Taman%20Royal%20Jalan%20Benteng%20Betawi%20No.1,%20Tanah%20Tinggi,%20Tangerang,%20RT.005/RW.015,%20Tanah%20Tinggi,%20Kec.%20Tangerang,%20Banten,%2015119+(Repayo)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div>
          </div>
          <div className="flex-1 px-8">
            <h3 className="text-4xl capitalize font-bold">Kunjungi Kami</h3>
            <p className="text-sm font-light text-slate-700 mt-2 ">Taman Royal Jalan Benteng Betawi No.1, Tanah Tinggi, Tangerang, RT.005/RW.015, Tanah Tinggi, Kec. Tangerang, Banten, 15119.</p>
          </div>
        </div>


        {/* CTA Whatsapp */}
        <div className="bg-gradient-to-r from-sky-800 to-indigo-900 w-10/12 mx-auto my-24 p-14 rounded-3xl">
          <h3 className="text-4xl text-white capitalize font-semibold">Punya Permintaan Khusus?<br /> <span className="text-2xl">Kami Siap Membantu!</span></h3>
          <p className="text-sm font-light text-slate-100 mt-2 w-6/12">Tim kami siap berdiskusi dan memberikan solusi terbaik yang sesuai dengan kebutuhan bisnis Anda. Klik tombol di bawah ini untuk mengirimkan permintaan Anda langsung kepada kami.</p>
          <button className="bg-slate-50 text-slate-950 px-6 py-2 rounded-xl mt-5">Hubungi Kami</button>
        </div>

      </div>



    </div>
  );
}

export default Home;
