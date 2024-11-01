import React,{useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai"
import { BlogCard } from "../components";
import { onValue, ref as rtdbref } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import { Heroimage } from "../assets/images";

const Blog = () => {
  const [dataArt,setDataArt] = useState([])
  const [keyArticle, setKeyArticle] = useState([])
  const [queryText, setQueryText] = useState('')
  const [filteredKey, setFilteredKey] = useState([])
  const [tagKey, setTagKey] = useState('semua')

  useEffect(() => { 
    onValue(rtdbref(FIREBASE_DB, "article"), (snapshot) => {
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
    if(tagName.toLowerCase() == 'semua'){
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
          <button className="bg-rose-800 rounded-full text-white p-2 ml-2 text-3xl font-semibold"><AiOutlineSearch className="text-white w-8 h-8" /></button>
        </div>
        <div  className="flex gap-4 justify-center my-6 flex-wrap">
          <span onClick={()=>handleTag('semua')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey === "semua" ? "text-white bg-rose-800" : "border-rose-800 text-rose-800"} py-1.5 border  w-36 font-semibold  text-sm`} >All</span>
          <span onClick={()=>handleTag('kertas')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey === "kertas" ? "text-white bg-rose-800" : "border-rose-800 text-rose-800"} py-1.5 border  w-36 font-semibold  text-sm`} >Kertas</span>
          <span onClick={()=>handleTag('pencetakan')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey === "pencetakan" ? "text-white bg-rose-800" : "border-rose-800 text-rose-800"} py-1.5 border w-36 font-semibold text-sm`} >Pencetakan</span>
          <span onClick={()=>handleTag('teknologi')} className={`px-4 rounded-full text-center cursor-pointer ${tagKey === "teknologi" ? "text-white bg-rose-800" : "border-rose-800 text-rose-800"} py-1.5 border w-36 font-semibold text-sm`} >Teknologi</span>
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
