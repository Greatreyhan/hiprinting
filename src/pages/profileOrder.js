import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import Cookies from 'js-cookie';

const ProfileOrder = () => {
  const [dataArt, setDataArt] = useState([])
  const [user, setUser] = useState({})
  const [order, setOrder] = useState([])


  const fetchData = async () => {
    const token = Cookies.get('token');
    try {
      if (token) {
        const responseUser = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
        });
        if (responseUser.status === 200) {
          setUser(responseUser.data.data)
        }

        const responseOrders = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
        });
        if (responseOrders.status === 200) {
          console.log(responseOrders.data)
          setOrder(responseOrders.data.data)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function formatToIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',-';
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="w-10/12 mx-auto pt-8">
      <div className="flex items-center justify-between py-8">
        <p> Total Order : {order ? order.length : 0}</p>
        <Link className="inline-flex items-center px-6 py-1.5 bg-sky-800 rounded-full text-white" to={"/profile/add-order"}><span className="text-2xl mr-2">+</span>Add</Link>
      </div>
      <div className="flex justify-center items-center">

        <table className="table p-4 bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                #
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Waktu Pengambilan
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Lokasi Pengambilan
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Total Harga
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Status
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {order.length !== 0 ? order.map((data, i) => {
              return (
                <tr key={i} className="text-gray-700">
                  <td className="border p-4 dark:border-dark-5">
                    {i + 1}
                  </td>
                  <td className="border p-4 dark:border-dark-5">
                    {new Date(data?.time_delivery).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      timeZone: 'UTC'
                    })}
                  </td>
                  <td className="border p-4 dark:border-dark-5">
                    {data?.location}
                  </td>
                  <td className="border p-4 dark:border-dark-5">
                    {formatToIDR(data?.price + data?.delivery_price)}
                  </td>
                  <td className="border p-4 dark:border-dark-5">
                    {data?.status}
                  </td>
                  <td className="border p-4 dark:border-dark-5">
                    {data?.description}
                  </td>
                  {/* <td className="border-t p-4 flex gap-x-3 justify-around items-center">
                                        <Link className="p-2 text-sky-800 rounded-full bg-sky-100" to={"/admin/edit-product/"+key}><MdEdit /></Link>
                                        <button className="p-2 text-rose-800 rounded-full bg-rose-100" type="button" onClick={e=>handleDeletePorto(e,key)}><MdDelete /></button>
                                    </td> */}
                </tr>
              )
            }) : null}

          </tbody>
        </table>

      </div>
    </div>
  )
}

export default ProfileOrder