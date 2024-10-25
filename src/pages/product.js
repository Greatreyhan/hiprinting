import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard"
import { Link } from "react-router-dom";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { BiLogoGmail, BiLogoLinkedin } from "react-icons/bi";
import { Heroimage, HeroProduct } from "../assets/images";
import { onValue, ref as rtdbref } from "firebase/database";
import { FIREBASE_DB } from "../firebaseinit";
import { AiOutlineSearch } from "react-icons/ai"


const Product = () => {

  const [data, setData] = useState([
    { id: 1, title: "Sekilas Tentang Batubara", type: "pertambangan", pict: Heroimage, desc: "Batubara merupakan salah satu komoditas tambang paling penting bagi Indonesia, dan penyumbang deviden terbesar bagi negara untuk diekspor. Di Indonesia kantong cadangan batubara menyebar di beberapa daerah di pulau sumatera hingga Kalimantan, diantaranya adalah jambi, Palembang, Kalimantan timur, Kalimantan Selatan serta papua." },
    { id: 2, title: "MINYAK SOLAR INDSUTRI", type: "peruhahaan", pict: Heroimage, desc: "Indonesia adalah salah satu negara produsen minyak terbesar di dunia, dengan melimpahnya cadangan minyak seharusnya indonesia bisa menjadi salah satu negara kaya seperti halnya negara-negara di  timur tengah , keuntungan inilah yang seharusnya kita maksimalkan, salah satu produk yang paling dibutuhkan adalah minyak solar industry." },
    { id: 3, title: "SENGKETA PERTANAHAN KELAPA SAWIT", type: "perusahaan", pict: Heroimage, desc: "Indonesia adalah negara agraris terbesar di Kawasan  asia Tenggara bahkan dunia, lahan yang melimpah serta subur dari sabang sampai marauke membuat Indonesia dibanjiri banyak komoditas pertanian dan perkebunan. Salah satu komoditas perkebunan terbesar yang di ekspor oleh Indonesia adalah kelapa sawit." },
  ])
  const [dataProduct, setDataProduct] = useState([])
  const [keyProduct, setKeyProduct] = useState([])
  const [tagProduct, setTagProduct] = useState('semua')
  const [dataTrademark, setDataTrademark] = useState([])
  const [keyTrademark, setKeyTrademark] = useState([])
  const [queryProduct, setQueryProduct] = useState('')
  const [queryTrademark, setQueryTrademark] = useState('')
  const [filteredKey, setFilteredKey] = useState([])

  useEffect(() => {
    onValue(rtdbref(FIREBASE_DB, "product"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setDataProduct(data)
        setKeyProduct(key)
        setFilteredKey(key)
      }
    });
    onValue(rtdbref(FIREBASE_DB, "trademark"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setKeyTrademark(key)
        setDataTrademark(data)
      }
    });
  }, [])

  const handleQuery = () => {
    if (queryProduct) {
      const res = keyProduct?.filter(key => {
        return dataProduct[key].title.toLowerCase().includes(queryProduct.toLowerCase())
      })
      setFilteredKey(res)
    }
    if (queryTrademark) {
      const res = keyProduct?.filter(key => {
        return dataProduct[key].trademark.toLowerCase().includes(queryTrademark.toLowerCase())
      })
      setFilteredKey(res)
    }
  }


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

      <div className="w-10/12 mx-auto flex justify-between items-center mt-16">
        <h2 className="text-2xl font-bold">Temukan Produk</h2>
        <div className="w-6/12 flex justify-end">
          <form className="flex items-center gap-x-5">
            <select className="bg-slate-100 px-9 py-2 rounded-full" value={queryTrademark} onChange={(e) => setQueryTrademark(e.currentTarget.value)}>
              <option value="">Semua</option>

              {keyTrademark != [] ?
                keyTrademark?.map((t, i) => {
                  return (<option key={i} value={t}>{dataTrademark[t].trademark}</option>)
                }) : null}
            </select>
            <input value={queryProduct} onChange={(e) => setQueryProduct(e.currentTarget.value)} className="w-full bg-slate-100 px-6 py-2 rounded-full" type="text" placeholder={'Cari Produk'} />
          </form>
          <button type="button" onClick={handleQuery} className="bg-sky-800 rounded-full text-white p-1.5 ml-2 text-3xl font-semibold"><AiOutlineSearch className="text-white w-8 h-8" /></button>
        </div>
      </div>

      {/* Project Show */}
      <div className='w-11/12 mx-auto'>
        <div className='flex flex-wrap mt-8 justify-around'>

          {filteredKey != [] ?
            filteredKey?.map(key => {
              return (
                <ProductCard key={key} id={key} title={dataProduct[key].title} type={dataProduct[key].trademark} pict={dataProduct[key].img} desc={dataProduct[key].desc} />
              )
            })
            : null}
        </div>
      </div>
    </div>
  )
}

export default Product;
