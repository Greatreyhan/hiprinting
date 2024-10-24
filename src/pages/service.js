import React from "react";
import { Heroimage, HeroService } from "../assets/images";
import ServiceCard from "../components/serviceCard";
import ServiceCardRev from "../components/serviceCardRev";


const Service = () =>{
  return (
    <div className="">

      {/* Hero Image */}
      <div className="w-full pt-32 pb-8 bg-slate-100">
        <div className="w-10/12 mx-auto">
          <h1 className="text-4xl"><span className="text-slate-900 font-light">What We Serve</span><br /><span className="text-sky-900 font-semibold">For Your Business</span></h1>
          <p className="text-slate-700 text-sm mt-4 w-5/12 tracking-wide">PT Repayo Mandiri menyediakan solusi kelistrikan lengkap, mulai dari panel listrik LV & MV, motor berkinerja tinggi, transformator andal, hingga komponen dan kabel berkualitas.</p>
        </div>
        <div className="flex justify-end -mt-10 -z-10">
        <img className=" " src={HeroService} />
        </div>
      </div>

      {/* Scroll Menu */}
      <ul className="flex text-sm justify-center w-11/12 mx-auto py-4 items-stretch">
        <li className="flex-1 px-4 py-2 border-b-2 border-sky-800 text-sky-800 flex justify-center items-center text-center font-semibold"><a>LV & MV Panel</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Electric Motor</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Transformator</a></li>
        <li className="flex-1 px-4 py-2 border-b border-opacity-50 border-slate-600 text-slate-600 flex justify-center items-center text-center"><a>Components & Cable</a></li>
      </ul>

      {/* Service Detail */}
      <ServiceCard title={"Panel LV & MV Custom"} subtitle={"Pastikan distribusi listrik bisnis Anda berjalan lancar dengan tim ahli kami yang berdedikasi untuk menyelesaikan tepat waktu dengan kualitas terbaik."} description={"Kami menyediakan layanan pembuatan panel listrik tegangan rendah (LV) dan menengah (MV) secara menyeluruh, mulai dari desain, produksi, hingga perawatan berkelanjutan. Tim ahli kami merancang dan mengembangkan panel yang disesuaikan dengan kebutuhan unik bisnis Anda, memastikan setiap langkah — dari konsep awal hingga implementasi — sesuai dengan tujuan Anda."} link={"/"} image={Heroimage} />
      <ServiceCardRev title={"Motor Listrik"} subtitle={"Jaga agar operasional industri Anda tetap efisien dengan motor listrik berkinerja tinggi dari tim berpengalaman kami, yang selalu tepat waktu dan berkualitas."} description={"Kami menawarkan layanan pengadaan motor listrik yang mencakup desain, instalasi, hingga pemeliharaan. Dengan solusi yang dirancang khusus untuk mendukung kebutuhan spesifik bisnis Anda, kami memastikan motor yang Anda gunakan bekerja optimal untuk meningkatkan produktivitas dan efisiensi."} link={"/"} image={Heroimage}  />
      <ServiceCard title={"Transformator"} subtitle={"Dapatkan solusi konversi daya yang handal dengan transformator kami, didukung oleh tim profesional yang fokus pada kualitas dan ketepatan waktu."} description={"Kami menyediakan layanan transformator mulai dari desain, produksi, hingga pemeliharaan. Setiap trafo dirancang sesuai kebutuhan industri Anda, memastikan distribusi daya yang stabil dan aman di setiap tahap, sehingga operasional bisnis Anda berjalan tanpa hambatan."} link={"/"} image={Heroimage} />
      <ServiceCardRev title={"Komponen & Kabel"} subtitle={"Dukung sistem kelistrikan Anda dengan komponen dan kabel berkualitas tinggi yang dirancang oleh tim ahli kami, memberikan keamanan dan kinerja maksimal."} description={"Kami menyediakan layanan pengadaan komponen listrik dan kabel yang mencakup desain, pengiriman, dan instalasi. Dengan solusi yang dirancang khusus untuk memenuhi kebutuhan kelistrikan Anda, kami memastikan setiap produk yang disediakan mendukung operasional yang efisien dan andal."} link={"/"} image={Heroimage}  />

    </div>
  );
}

export default Service;
