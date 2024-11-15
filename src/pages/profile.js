import React, { useEffect, useState } from "react";
import { onValue, ref as rtdbref, set } from "firebase/database";
import { FIREBASE_STORE, FIREBASE_DB } from "../firebaseinit";
import axios from "axios";
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState({})
  const [order, setOrder] = useState({})
  const [orderDone, setOrderDone] = useState([])
  const [transaction,  setTransaction] = useState([])


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
          console.log(responseOrders.data.data[0])
          setOrder(responseOrders.data.data)
          setTransaction(responseOrders.data.data.reduce((a,c) => a + (c.price+c.delivery_price), 0))
          setOrderDone(responseOrders.data.data.filter((o) => {return o.status ===  'PROCESS'}))
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function formatToIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',-';
  }

  return (
    <div className="w-10/12 mx-auto flex justify-around pt-16 gap-x-10 bg-white">

      {/* Display  Number of Orders */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Orders Process</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{order ? order.length : 0}<span className="text-sm font-light ml-2">order</span></p>
      </div>

      {/* Display  Number of Files */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Orders Done</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{order ? order.length - orderDone.length : 0}<span className="text-sm font-light ml-2">order</span></p>
      </div>

      {/* Display  Number of Files */}
      <div className="w-4/12 bg-slate-100 px-8 py-4 rounded-md">
        <h2 className="text-lg text-slate-900">Total Transaction</h2>
        <p className="text-4xl text-sky-900 flex justify-end items-end mt-4 font-bold">{transaction ? formatToIDR(transaction) : 0}<span className="text-sm font-light ml-2">IDR</span></p>
      </div>




    </div>
  );
};

export default Profile;
