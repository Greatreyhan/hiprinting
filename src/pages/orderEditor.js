import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MdOutlineAdd, MdDelete } from "react-icons/md";
import axios from "axios";
import { BiSave } from "react-icons/bi";
import Cookies from 'js-cookie';
import InsertFile from "./insertFile";


const OrderEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataEdit, setDataEdit] = useState("");
    const [location, setLocation] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [giveReceipt, setGiveReceipt] = useState(false);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [isUpload, setIsUpload] = useState(false);
    const [scanFile, setScanFile] = useState({})
    const [dataFiles, setDataFiles] = useState([])
    const [showForm, setShowForm] = useState(false)
    const token = Cookies.get('token');

    const handleSendData = async (e) => {
        e.preventDefault();
        if (dataFiles.length === 0) {
            console.log("File can't be empty!");
        } else {

            // Total Price File
            const totalPriceFile = dataFiles.reduce((a,c) => a + c.price, 0)
            // Create an object containing the data you want to write
            const formData = {
                price: totalPriceFile,
                delivery_price:4000,
                type_service:"COD",
                time_delivery: dateTime, 
                location:location,
                give_receipt: giveReceipt,
                description: description
            }

            // Create Order
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    },
                });
                if (response.status === 201) {
                    console.log(response.data)

                    // Create file
                    dataFiles.map( async (file)=>{
                        try {
                            const responseFile = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/orders/${response.data.data.id}/files`, file, {
                                headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': token
                                },
                            });
                            console.log(responseFile.data)

                            if (responseFile.status === 201) {
                                navigate('/profile/order')
                            }
                        } catch (error) {
                            console.error("Error Create File", error);
                        }
            
                    })

                }
            } catch (error) {
                console.error("Error Create order", error);
            }

        }
    };

    const handleDeleteFile = (i) => {
        const updatedFiles = dataFiles.filter((_, index) => index !== i);
        setDataFiles(updatedFiles);
    };

    useEffect(() => {
        console.log(dataFiles)
    }, [dataFiles]);


    return (
        <div className="App overflow-x-hidden">
            {showForm ? <InsertFile setDataFiles={setDataFiles} dataFiles={dataFiles} setShowForm={setShowForm} showForm={showForm} /> : null}
            <div className="pt-16">
                {isUpload ? (
                    <div className="w-full h-full fixed bg-black bg-opacity-50 z-50 top-0 flex justify-center items-center">
                        <div className="loader"></div>
                    </div>
                ) : null}
                <form onSubmit={(e)=>handleSendData(e)} className="w-10/12 flex flex-col mx-auto my-8 justify-around items-center">
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-blue-950 w-full"
                            required={true}
                            value={location}
                            onChange={(e) => setLocation(e.currentTarget.value)}
                            width={90}
                            name="location"
                            id="location"
                            type="text"
                            placeholder="Lokasi Pengambilan"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="dateTime">
                            Waktu Pengambilan
                        </label>
                        <input
                            className="px-2 py-1 border-b-2 border-blue-950 w-full"
                            required={true}
                            value={dateTime}
                            onChange={(e) => setDateTime(e.currentTarget.value)}
                            name="dateTime"
                            id="dateTime"
                            type="datetime-local"
                            placeholder="Waktu Pengambilan"
                        />
                    </div>


                    <div className="flex flex-col w-full">
                        <label className="mt-4 text-xs my-2" htmlFor="desc">
                            Add Message
                        </label>
                        <textarea
                            className="px-2 py-1 border-b-2 border-sky-950 w-full"
                            maxLength={200}
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Desc Produk"
                        ></textarea>
                    </div>

                    <div className="flex flex-row my-4 items-center bg-red-500justify-start w-full">
                        <input
                            className="px-2 border-b-2"
                            value={giveReceipt}
                            onChange={(e) => setGiveReceipt(e.currentTarget.value)}
                            name="giveReceipt"
                            id="giveReceipt"
                            type="checkbox"
                            placeholder="Tambahkan Nota"
                        />
                        <label className="text-xs ml-2" htmlFor="dateTime">
                            Tambahkan Nota
                        </label>
                    </div>

                    <div className="text-left w-full ">
                        <p className="text-sm font-bold">{scanFile.data ? "Total : Rp " + scanFile.data.totalCost + ",-" : null}</p>
                    </div>

                    <p className="w-full flex justify-start text-sm">Files</p>
                    <div className=" w-full flex justify-start  items-center mt-4 gap-5">
                        <div className="flex items-center gap-5">

                                    {dataFiles
                                        ? dataFiles.map((data, i) => (
                                            <div
                                                key={i}
                                                onClick={() => handleDeleteFile(i)}
                                                className="bg-blue-800 hover:bg-red-700 hover:py-6 flex flex-col justify-center items-center text-white font-semibold text-2xl p-4 rounded-md cursor-pointer group"
                                            >
                                                {/* Show text by default, and show delete icon on hover */}
                                                <div className="group-hover:hidden">
                                                    <p className="text-center">{data.total_page}</p>
                                                    <p className="text-xs font-normal">pages</p>
                                                </div>
                                                <MdDelete className="hidden group-hover:block text-white text-3xl" />
                                            </div>
                                        ))
                                        : null}

                        </div>
                        <button className="border-blue-700 border hover:border-blue-800 text-blue-800 text-3xl rounded-md p-4 py-6" onClick={(e) => { e.preventDefault(); setShowForm(!showForm) }}><MdOutlineAdd /></button>
                    </div>

                    <div className="flex w-full justify-end items-center gap-x-5">
                        <Link className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-white text-blue-900 border border-blue-800 rounded-full font-semibold" to="/admin/Produk">Kembali</Link>
                        <button
                            className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-blue-900 rounded-full text-white font-semibold"
                        >
                            <BiSave className="mr-2" />
                            Pesan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OrderEditor