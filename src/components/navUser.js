import React, { useEffect } from 'react'
import { IoMdApps } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { Logo } from '../assets/icons';
import { MdOutlineLogout,MdPerson } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';

const NavUser = () => {

    const navigate = useNavigate();
    const token = Cookies.get('token');

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
          if (token) {
            const responseUser = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
              }
            });
    
            if (responseUser.status === 200) {
              console.log(responseUser.data);
              Cookies.remove('token');
              navigate('/'); // Redirect to the home page
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div className='md:w-2/12 md:h-screen bg-slate-100 flex flex-col justify-between py-8 fixed left-0 top-0'>

            {/* Logo */}
            <div className='flex justify-center'>
                <img className='w-32' src={Logo} />
            </div>

            {/* List Menu */}
            <div className='pt-16 md:flex hidden text-left flex-col text-gray-800 flex-1'>
                <a href='/profile' className='cursor-pointer hover:font-semibold hover:text-sky-800 text-sm px-6 py-2 flex items-center'><IoMdApps className='text-2xl mr-1' /><span>Dashboard</span></a>
                <a href='/profile/data' className='cursor-pointer hover:font-semibold hover:text-sky-800 text-sm px-6 py-2 flex items-center'><MdPerson className='text-2xl mr-1' /><span>User</span></a>
                <a href='/profile/order' className='cursor-pointer hover:font-semibold hover:text-sky-800 text-sm px-6 py-2 flex items-center'><TbReportSearch className='text-2xl mr-1' /><span>Order</span></a>

            </div>

            {/* Logout */}
            <button onClick={(e) => handleLogOut(e)} className='text-gray-800 md:flex hidden cursor-pointer hover:font-semibold hover:text-sky-800 text-sm px-6 py-2 items-center'><MdOutlineLogout className='text-2xl mr-1' /><span>Keluar</span></button>

        </div>
    )
}

export default NavUser