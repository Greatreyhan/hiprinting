import React, { useEffect, useState } from "react";
import { Heroimage } from "../assets/images";
import { useParams } from "react-router-dom";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import parse from "html-react-parser"
import "./portoStyle.css"

const PortoDetail = () => {
    const { id } = useParams();
    const [dataDB, setDataDB] = useState({});
    useEffect(() => {
      onValue(rtdbref(FIREBASE_DB, "portodata/" + id), (snapshot) => {
        const data = snapshot.val();
        setDataDB(data)
      });
    }, []);

    return (
      <div className="w-full">
        {dataDB != {} ? (
          <>
            <div className="w-full">
              <div className="w-full h-96">
                <img className="w-full h-full object-cover" src={dataDB.img} />
              </div>
              <div className="-mt-48 w-10/12 mx-auto">
                <h2 className="text-white font-bold text-5xl w-8/12">
                  {dataDB.title}
                </h2>
              </div>
            </div>
            <div className="md:w-7/12 w-11/12 mx-auto mt-48">
              <div className="mt-8 componentArt">
                {dataDB.content ? parse(dataDB.content) : null }
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };

export default PortoDetail