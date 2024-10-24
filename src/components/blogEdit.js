import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onValue, ref as rtdbref, remove } from "firebase/database";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL, deleteObject
  } from "firebase/storage";
import { FIREBASE_DB, FIREBASE_STORE } from "../firebaseinit";

const BlogEdit = ({ imgArt, title, tag, desc, dateTime }) => {
  const [dateString, setDateString] = useState("");
  useEffect(() => {
    const date = new Date(parseInt(dateTime));
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setDateString(formattedDate);
  }, []);

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;

  const handleDelete = (id,imgUrl) =>{
    const urlFile = decodeURIComponent(new URL(imgUrl).pathname);
    const parts = urlFile.split('/');
    const imageName = parts[parts.length - 1];
    const storageRef = ref(FIREBASE_STORE, `images/${imageName}`);
    console.log(imageName)
    deleteObject(storageRef)
    remove(rtdbref(FIREBASE_DB, "data/" + id));
  }
  return (
    <div className="w-80 min-h-96 my-4 bg-white relative">
      <div className="bg-red w-full h-full bg-blue-900 top-0 absolute flex flex-col justify-center opacity-0 hover:opacity-100 items-center">
        <Link to={"/editor/"+dateTime} className="w-60 font-semibold text-center my-2 py-2 bg-amber-300 text-amber-950">Edit</Link>
        <a onClick={()=>handleDelete(dateTime, imgArt)} className="w-60 cursor-pointer font-semibold text-center my-2 py-2 bg-red-300 text-red-950">Hapus</a>
        <Link to={"/article/"+dateTime} className="w-60 font-semibold text-center my-2 py-2 bg-green-300 text-green-950">Lihat</Link>
      </div>
      <div>
        <div className="w-full h-52">
          <img src={imgArt} className="object-cover h-full w-full" />
        </div>
        <div>
          <div className="-mt-1 ml-3">
            <span className="px-1.5 bg-blue-900 text-white py-1 text-xs">
              #{tag}
            </span>
          </div>
          <h4 className="text-lg mx-3 font-semibold text-blue-950 mt-4">
            {title}
          </h4>
          <p className="text-sm mx-3 mt-1">{truncateText(desc, 100)}</p>
          <p className="text-xs m-4">{dateString}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;
