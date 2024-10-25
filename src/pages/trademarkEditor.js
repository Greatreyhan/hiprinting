import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BiSave } from "react-icons/bi";


const TrademarkEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [trademark, setTrademark] = useState("");



    const handleSendData = (e) => {
        e.preventDefault();


        // Construct the database reference for the location where you want to write the data
        const timestamp = Date.now();
        const dbRef = rtdbref(FIREBASE_DB, "trademark/" + (id ? id : timestamp));

        // Create an object containing the data you want to write
        const newData = {
            trademark
        };

        // Use the set method to write the data to the specified location
        set(dbRef, newData)
            .then(() => {
                // Data sent successfully
                navigate("/admin/trademark");
            })
            .catch((error) => {
                // Handle error
                console.error("Error sending data to Firebase:", error);
            });
    };


    return (
        <div className="App overflow-x-hidden">
            <div className="pt-16">

                <form className="w-10/12 flex flex-col mx-auto my-8 justify-around items-center">
                   
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="trademark">
                            Merek
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            required
                            value={trademark}
                            onChange={(e) => setTrademark(e.currentTarget.value)}
                            name="trademark"
                            id="trademark"
                            type="text"
                            placeholder="Merek Produk"
                        />
                    </div>

                    <div className="flex w-full justify-end items-center gap-x-5">
                        <Link className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-white text-sky-900 border border-sky-800 rounded-full font-semibold" to="/admin/trademark">Kembali</Link>
                        <button
                            onClick={handleSendData}
                            className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-sky-900 rounded-full text-white font-semibold"
                        >
                            <BiSave className="mr-2" />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TrademarkEditor