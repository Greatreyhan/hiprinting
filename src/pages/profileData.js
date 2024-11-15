import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { HeroProfile } from "../assets/images";
import { Avatar } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { BiSave } from "react-icons/bi";

const ProfileData = () => {
  const [user, setUser] = useState({})
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [address, setAddress] = useState("")

  const navigate = useNavigate();

  const token = Cookies.get('token');

  const fetchData = async () => {
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
          setEmail(responseUser.data.data.email)
          setUsername(responseUser.data.data.username)
          setAddress(responseUser.data.data.address)
          setWhatsapp(responseUser.data.data.whatsapp_number)
          setUser(responseUser.data.data)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSaveData = async (e) => {
    e.preventDefault()
    try {
      if (token) {
        const responseUser = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/users`,{
          email,
          username,
          whatsapp_number: whatsapp,
          address
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
        });
        if (responseUser.status === 200) {
          console.log(responseUser.data)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div
        className="w-full h-52"
        style={{
          backgroundImage: `url(${HeroProfile})`, // Use the imported image
          backgroundAttachment: "fixed", // Creates the parallax effect
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
      </div>

      <div className="w-full flex justify-center -mt-16">
        <img className="w-32 h-32 rounded-full border-2" src={Avatar} />
      </div>

      <form onSubmit={(e) => handleSaveData(e)} className="w-10/12 flex flex-col mx-auto my-8 justify-around items-center">
        <div className="flex gap-10 w-full justify-between">
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <label className="mt-4 text-xs my-2" htmlFor="title">
                Email
              </label>
              <input
                className="px-2 py-1 border-b-2 border-sky-950 w-full"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                width={90}
                name="email"
                id="email"
                type="email"
                placeholder="email"
                disabled={true}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mt-4 text-xs my-2" htmlFor="trademark">
                Username
              </label>
              <input
                className="px-2 py-1 border-b-2 border-sky-950 w-full"
                required={true}
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                name="username"
                id="username"
                type="text"
                placeholder="username"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col w-full">
              <label className="mt-4 text-xs my-2" htmlFor="trademark">
                Address
              </label>
              <input
                className="px-2 py-1 border-b-2 border-sky-950 w-full"
                required={true}
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
                name="address"
                id="address"
                type="text"
                placeholder="address"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mt-4 text-xs my-2" htmlFor="desc">
                Whatsapp
              </label>
              <input
                className="px-2 py-1 border-b-2 border-sky-950 w-full"
                required={true}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.currentTarget.value)}
                name="whatsapp"
                id="whatsapp"
                type="text"
                placeholder="whatsapp"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end items-center gap-x-5 mt-8">
          <Link onClick={handleLogOut} className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-white text-sky-900 border border-sky-800 rounded-full font-semibold" to="/admin/Produk">Log Out</Link>
          <button
            className="mt-4 px-6 py-2 inline-flex justify-center items-center bg-sky-900 rounded-full text-white font-semibold"
          >
            <BiSave className="mr-2" />

            Save
          </button>
        </div>
      </form>

    </div>

  );
};

export default ProfileData;
