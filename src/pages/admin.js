import React, { useEffect, useState } from "react";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";


const Admin = () => {
  const [dataArt, setDataArt] = useState([])
  const [keyArticle, setKeyArticle] = useState([])
  const [tagList, setTagList] = useState([]);

  const [dataPorto, setDataPorto] = useState([])
  const [keyPorto, setKeyPorto] = useState([])

  const [dataTrademark, setDataTrademark] = useState([])
  const [keyTrademark, setKeyTrademark] = useState([])

  useEffect(() => {
    onValue(rtdbref(FIREBASE_DB, "article"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tagList = []
        const key = Object.keys(data)
        key.map(list => {
          tagList.push(data[list].tag)
        })
        setTagList(tagList)
        setKeyArticle(key)
        setDataArt(data)
      }
    });

    onValue(rtdbref(FIREBASE_DB, "product"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)
        setKeyPorto(key)
        setDataPorto(data)
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


  return (
    <div className="w-10/12 mx-auto flex justify-around pt-16 gap-x-10 bg-white">

      {/* Display  Number of Article */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Artikel</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{keyArticle ? keyArticle.length : 0}<span className="text-sm font-light ml-2">artikel</span></p>
      </div>

      {/* Display  Number of Portofolio */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Product</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{keyPorto ? keyPorto.length : 0}<span className="text-sm font-light ml-2">Product</span></p>
      </div>

      {/* Display  Number of Trademark */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Merek</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{keyTrademark ? keyTrademark.length : 0}<span className="text-sm font-light ml-2">Merek</span></p>
      </div>



    </div>
  );
};

export default Admin;
