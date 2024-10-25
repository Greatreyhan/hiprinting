import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import parse from "html-react-parser"

const Product = () => {
    const { id } = useParams();
    const [dataDB, setDataDB] = useState({});
    useEffect(() => {
      onValue(rtdbref(FIREBASE_DB, "product/" + id), (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if(data){
          setDataDB(data)
        }
      });
    }, []);

    return (
      <div className="w-full">
        {dataDB != {} ? (
          <div>
            <div className="w-full">
              <div className="w-full h-96">
                <img className="w-full h-full object-cover" src={dataDB?.img} />
              </div>
              
            </div>
            <div className="md:w-7/12 w-11/12 mx-auto my-48">
              <div className="mt-8 ">
              <div className="mx-auto">
                <h2 className="text-sky-950 font-bold text-5xl">
                  {dataDB?.title}
                </h2>
              </div>
                <p className='mt-2 bg-sky-100 px-4 py-1.5 rounded-full text-sky-900 font-medium text-sm inline-block'>{dataDB?.trademark}</p>
                <div className="my-8">{dataDB?.desc }</div>
                <a className="bg-sky-800 text-white px-6 py-2.5 rounded-full my-8" href={dataDB?.link}>Download PDF</a>

              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

export default Product