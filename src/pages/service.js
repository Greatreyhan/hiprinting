import React, { useState } from "react";
import { Product1, Product2, Product3, Product4 } from "../assets/images";
import ServiceCard from "../components/serviceCard";
import ServiceCardRev from "../components/serviceCardRev";


const Service = () => {
  return (
    <div className="pt-16">

      <ServiceCard
        title={"Print Kertas"}
        subtitle={"Hasil cetakan berkualitas tinggi untuk setiap kebutuhan Anda, didukung oleh layanan profesional yang mengutamakan ketepatan waktu."}
        description={"Kami menyediakan layanan cetak kertas untuk berbagai jenis dokumen, mulai dari brosur hingga poster. Dengan teknologi pencetakan mutakhir dan bahan berkualitas, kami memastikan hasil cetakan yang tajam dan jelas, memenuhi standar tinggi yang Anda harapkan."}
        link={"https://wa.me/+6285643518494"}
        image={Product1}
      />

      <ServiceCardRev
        title={"Foto Copy"}
        subtitle={"Tingkatkan produktivitas Anda dengan layanan fotokopi cepat dan efisien, selalu siap untuk memenuhi kebutuhan cetak Anda."}
        description={"Kami menawarkan layanan fotokopi yang dapat diandalkan, dengan berbagai pilihan ukuran dan warna. Dengan mesin fotokopi modern dan tim yang berpengalaman, kami menjamin hasil yang presisi dan waktu penyelesaian yang cepat."}
        link={"https://wa.me/+6285643518494"}
        image={Product2}
      />

      <ServiceCard
        title={"Cetak Sertifikat"}
        subtitle={"Cetak sertifikat yang menarik dan profesional untuk berbagai acara dan kebutuhan, dengan layanan yang fokus pada detail."}
        description={"Kami menyediakan layanan cetak sertifikat berkualitas tinggi, siap membantu Anda mendesain dan mencetak sertifikat yang sesuai dengan tema acara Anda. Dari sertifikat penghargaan hingga partisipasi, kami pastikan setiap cetakan memiliki desain yang menawan dan hasil yang memuaskan."}
        link={"https://wa.me/+6285643518494"}
        image={Product3}
      />

      <ServiceCardRev
        title={"Scan Kertas"}
        subtitle={"Transformasikan dokumen fisik Anda menjadi format digital dengan layanan pemindaian yang cepat dan akurat."}
        description={"Kami menyediakan layanan pemindaian dokumen yang komprehensif, memastikan setiap detail tersimpan dengan jelas dalam format digital. Dengan teknologi pemindaian canggih, kami menjamin keamanan dan kemudahan akses dokumen Anda di mana saja dan kapan saja."}
        link={"https://wa.me/+6285643518494"}
        image={Product4}
      />
    </div>
  );
}

export default Service;
