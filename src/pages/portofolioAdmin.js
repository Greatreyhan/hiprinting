import React, { useEffect, useState } from "react";
import { onValue, ref as rtdbref, remove } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const PortofolioAdmin = () => {
    const [dataPorto, setDataPorto] = useState([])
    const [keyPorto, setKeyPorto] = useState([])

    useEffect(() => {

        onValue(rtdbref(FIREBASE_DB, "portofolio"), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const key = Object.keys(data)
                setKeyPorto(key)
                setDataPorto(data)
            }
        });
    }, [])

    const handleDeletePorto = (e,key) =>{
        e.preventDefault()
        const record_ref = rtdbref(FIREBASE_DB, 'portofolio/'+key)
        remove(record_ref)
            .then(()=>{
                console.log('delete success')
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }

    return (
        <div className="w-10/12 mx-auto pt-8">
            <div className="flex items-center justify-between py-8">
            <p> Total Portofolio : {keyPorto ? keyPorto.length : 0}</p>
            <Link className="inline-flex items-center px-6 py-1.5 bg-sky-800 rounded-full text-white" to={"/admin/add-portofolio"}><span className="text-2xl mr-2">+</span>Add</Link>
            </div>
            <div className="flex justify-center items-center">

                <table className="table p-4 bg-white rounded-lg shadow">
                    <thead>
                        <tr>
                            <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                #
                            </th>
                            <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                Title
                            </th>
                            <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                Tag
                            </th>
                            <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                Desc
                            </th>
                            <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {keyPorto?.map((key,i) => {
                            return (
                                <tr key={key} className="text-gray-700">
                                    <td className="border p-4 dark:border-dark-5">
                                    {i+1}
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                    {dataPorto[key]?.title}
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                    {dataPorto[key]?.tag}
                                    </td>
                                    <td className="border p-4 dark:border-dark-5">
                                    {dataPorto[key]?.desc}
                                    </td>
                                    <td className="border-t p-4 flex gap-x-3 justify-around items-center">
                                        <Link className="p-2 text-sky-800 rounded-full bg-sky-100" to={"/admin/edit-portofolio/"+key}><MdEdit /></Link>
                                        <button className="p-2 text-rose-800 rounded-full bg-rose-100" type="button" onClick={e=>handleDeletePorto(e,key)}><MdDelete /></button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default PortofolioAdmin