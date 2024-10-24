import React, { useEffect, useState } from "react";
import { Heroimage } from "../assets/images";
import { useParams } from "react-router-dom";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import parse from "html-react-parser"
import "../components/portoStyle.css"

const Article = () => {
  const [dataArt, setDataArt] = useState({});
  const [articleTag, setArticleTag] = useState('')
  const [dateString, setDateString] = useState("");
  const { id } = useParams();
  useEffect(() => {
    onValue(rtdbref(FIREBASE_DB, "data/" + id), (snapshot) => {
      const data = snapshot.val();
      setDataArt(data);
      setArticleTag(data.article)
    });
    const date = new Date(parseInt(id));
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${day} ${monthNames[monthIndex]} ${year}`;
    setDateString(formattedDate);
  }, []);
  return (
    <div className="w-full overflow-x-hidden">
      {dataArt != {} ? (
        <>
          <div className="w-full">
            <div className="w-full h-96">
              <img className="w-full h-full object-cover" src={dataArt.image} />
            </div>
            <div className="-mt-48 w-10/12 mx-auto">
              <h2 className="text-white font-bold text-5xl w-8/12">
                {dataArt.title}
              </h2>
              <p className="text-md text-white">{dateString}</p>
            </div>
          </div>
          <div className="md:w-7/12 w-11/12 mx-auto mt-28">
            <h2 className="font-bold text-4xl mt-40">{dataArt.subtitle}</h2>
            <div className="mt-8 componentArt">
              {articleTag ? parse(articleTag) : null }
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Article;
