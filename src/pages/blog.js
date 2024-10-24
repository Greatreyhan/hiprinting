import React,{useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai"
import { BlogCard } from "../components";
import { onValue, ref as rtdbref } from "firebase/database";
import { MdArrowOutward } from "react-icons/md";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const [dataArt,setDataArt] = useState([])
  const [keyArticle, setKeyArticle] = useState([])
  const [queryText, setQueryText] = useState('')
  const [filteredKey, setFilteredKey] = useState([])
  const [tagKey, setTagKey] = useState('all')
  useEffect(() => { 
    onValue(rtdbref(FIREBASE_DB, "data"), (snapshot) => {
      const data = snapshot.val();
      if(data){
      const key = Object.keys(data)
      setKeyArticle(key)
      setDataArt(data)
      setFilteredKey(key)
      }
    });
  }, [])

  const handleQuery = (e)=>{
    const query = e.currentTarget.value;
    setQueryText(query);
    const res = keyArticle?.filter(key=>{
      return dataArt[key].title.toLowerCase().includes(query.toLowerCase())
  })
    setFilteredKey(res)
  }

  const handleTag = (tagName) =>{
    setTagKey(tagName)
    if(tagName.toLowerCase() == 'all'){
      setFilteredKey(keyArticle)
    }
    else{
      const res = keyArticle?.filter(key=>{
        return dataArt[key].tag.toLowerCase().includes(tagName.toLowerCase())
      })
      setFilteredKey(res)
    }
  }


  return (
    <div className="w-full mx-auto bg-slate-100 overflow-x-hidden">
      
      {/* Job Vacancy */}
      <div className="flex w-10/12 mx-auto items-center pt-32">
        <div className="flex-1">
          <h1 className="text-4xl font-medium text-slate-800">Opening Position</h1>
          <p className="text-sm font-light text-slate-800 mt-2 w-8/12">Our team includes skilled, certified engineers located throughout Indonesia. With deep expertise and extensive experience, we are ready to provide effective solutions for your IT challenges.</p>
        </div>
        <div className="flex-1 flex flex-col gap-y-2">
          <a className="flex bg-white rounded-full px-6 py-3 items-center text-slate-800 cursor-pointer hover:text-white hover:bg-sky-800 justify-between"><span>WSU Studio Academy</span><MdArrowOutward className="text-xl" /></a>
          <a className="flex bg-white rounded-full px-6 py-3 items-center text-slate-800 cursor-pointer hover:text-white hover:bg-sky-800 justify-between"><span>Design</span><MdArrowOutward className="text-xl" /></a>
          <a className="flex bg-white rounded-full px-6 py-3 items-center text-slate-800 cursor-pointer hover:text-white hover:bg-sky-800 justify-between"><span>Engineering</span><MdArrowOutward className="text-xl" /></a>
          <a className="flex bg-white rounded-full px-6 py-3 items-center text-slate-800 cursor-pointer hover:text-white hover:bg-sky-800 justify-between"><span>Finance & Legal</span><MdArrowOutward className="text-xl" /></a>
        </div>
      </div>

      {/* Title Search */}
      <div className="w-full text-center pt-32">
        <h2 className="text-4xl font-medium text-slate-900">Read More Articles</h2>
        <p className="text-sm font-light text-slate-800 mt-2 w-4/12 mx-auto">Our team group of creative people, consisting of various backgrounds and specific abilities that are divided into several divisions.</p>
      </div>

      {/* Search Feature */}
      <div className="w-10/12 mx-auto flex-col items-center mt-8 justify-center">
        <div  className="w-full flex justify-center">
          <form className="w-6/12">
            <input value={queryText} onChange={(e)=>handleQuery(e)} className="w-full px-4 py-3 rounded-full" type="text" placeholder={'Cari Artikel'} />
          </form>
          <button className="bg-sky-800 rounded-full text-white p-2 ml-2 text-3xl font-semibold"><AiOutlineSearch className="text-white w-8 h-8" /></button>
        </div>
        <div  className="flex gap-4 justify-center my-6 flex-wrap">
          <span onClick={()=>handleTag('All')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey == "All" ? "text-white bg-sky-800" : "border-sky-800 text-sky-800"} py-1.5 border  w-36 font-semibold  text-sm`} >All</span>
          <span onClick={()=>handleTag('Hukum')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey == "Hukum" ? "text-white bg-sky-800" : "border-sky-800 text-sky-800"} py-1.5 border  w-36 font-semibold  text-sm`} >Teknologi</span>
          <span onClick={()=>handleTag('Perusahaan')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey == "Perusahaan" ? "text-white bg-sky-800" : "border-sky-800 text-sky-800"} py-1.5 border w-36 font-semibold text-sm`} >Marketing</span>
          <span onClick={()=>handleTag('Pertambangan')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey == "Pertambangan" ? "text-white bg-sky-800" : "border-sky-800 text-sky-800"} py-1.5 border w-36 font-semibold text-sm`} >Career</span>
          <span onClick={()=>handleTag('Konstruksi')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey == "Konstruksi" ? "text-white bg-sky-800" : "border-sky-800 text-sky-800"} py-1.5 border w-36 font-semibold text-sm`} >Investasi</span>
        </div>
      </div>

      {/* ARTICLES CHOICE */}
      <div className="w-11/12 mx-auto py-16 flex flex-wrap md:justify-between justify-center">

      {filteredKey != [] ? 
      filteredKey?.map(key=>{
        return(<BlogCard key={key} title={dataArt[key].title} tag={dataArt[key].tag} imgArt={dataArt[key].image} desc={dataArt[key].desc} dateTime={key} />)
      })
      : null }
      </div>
      
    </div>
  );
};

export default Blog;
