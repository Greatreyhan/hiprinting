import React, { useState } from 'react'
import axios from "axios";
import Cookies from 'js-cookie';

const InsertFile = ({ setDataFiles, dataFiles, setShowForm, showForm }) => {
    const [size, setSize] = useState('A4')
    const [mode, setMode] = useState('COLOR')
    const [description, setDescription] = useState('')
    const [scanFile, setScanFile] = useState({})
    const [dataFile, setDataFile] = useState({})

    const token = Cookies.get('token');

    const handleSubmitFile = async (e) => {
        e.preventDefault()
        if (dataFile) {
            const formData = new FormData();
            formData.append("pdf", dataFile);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/check/save`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': token
                    },
                });
                if (response.status === 200) {
                    console.log(response.data)
                    const data = {
                        link: response.data.data.pdfPath,
                        total_page: (response.data.data.totalPage.BNW + response.data.data.totalPage.FCL + response.data.data.totalPage.NCL),
                        total_BNW: response.data.data.totalPage.BNW,
                        total_NCL: response.data.data.totalPage.NCL,
                        total_FCL: response.data.data.totalPage.FCL,
                        price: response.data.data.totalCost,
                        size: size,
                        mode: mode,
                        description: description
                    };
                    setDataFiles([...dataFiles, data])
                    setShowForm(false)

                }
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setDataFile(file)
        if (file) {
            const formData = new FormData();
            formData.append("pdf", file);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/check`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': token
                    },
                });
                if (response.status === 200) {
                    setScanFile(response.data)

                }
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
    };
    return (
        <div className='fixed w-full h-full left-0 top-0 bg-black bg-opacity-15 flex justify-center items-center'>
            <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300">
                            </div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="px-2 text-gray-500 bg-white">
                                Insert File
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="w-full space-y-6">
                            <div className="w-full">
                                <p className='text-xs '>Ukuran Kertas</p>
                                <select required={true} id="size" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" value={size} onChange={(e) => setSize(e.currentTarget.value)}>
                                    <option value="A4">A4</option>
                                    <option value="F4">F4</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <p className='text-xs '>Location</p>
                                <select required={true} id="size" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" value={size} onChange={(e) => setMode(e.currentTarget.value)}>
                                    <option value="COLOR">COLOR</option>
                                    <option value="BNW">BNW</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <p className='text-xs '>Description</p>
                                <div className=" relative ">
                                    <input required={true} type="text" id="search-form-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="Your message" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-xs my-2" htmlFor="art-image">
                                    File
                                </label>
                                <div className="flex items-center gap-x-5">
                                    <input
                                        required={true}
                                        onChange={handleUpload}
                                        name="file"
                                        id="file"
                                        type="file"
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="flex items-center gap-x-5 w-full rounded-md shadow-sm">
                                    <button onClick={() => setShowForm(false)} type="button" className="py-2 px-4  text-blue-600 w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Batalkan
                                    </button>
                                    {scanFile.data ? 
                                        <button onClick={(e) => handleSubmitFile(e)} type="button" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Tambahkan
                                    </button>
                                    : 
                                    <button disabled={true} type="button" className="py-2 px-4  bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Tambahkan
                                    </button>
                                    }
                                    
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 flex items-center justify-between py-6 text-xs border-t-2 border-gray-200 bg-gray-50 sm:px-10">
                    <h3>Total Harga</h3>
                    <p>Rp {scanFile.data ? scanFile.data.totalCost : 0}</p>
                </div>
            </div>

        </div>
    )
}

export default InsertFile