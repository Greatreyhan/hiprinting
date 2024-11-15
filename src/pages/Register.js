import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { Hero2, Heroimage } from "../assets/images";
import Cookies from 'js-cookie';
import { MdPerson, MdMail, MdWhatsapp, MdPassword} from "react-icons/md";

const Register = () => {
  const [user, setUser] = useState(false)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    const token = Cookies.get('token');
    try {
      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
        });
        if (response.status === 200) {
          console.log('redirect')
          setUser(true)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    if(username && email && password && whatsapp){

      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/register`, {
          username: username,
          email: email,
          password: password,
          whatsapp_number: whatsapp
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
      }
      else{
        console.log('not found')
      }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="fixed overflow-x-hidden w-full h-screen bg-white flex justify-center items-center z-50">
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">

          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Sign Up.</p>
            {/* <p className="text-xs text-center text-red-500">{errorMessage.message}</p> */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdPerson className="text-xl" />
                  </span>
                  <input
                    required={true}
                    id="design-login-username"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdMail className="text-xl" />
                  </span>
                  <input
                    required={true}
                    id="design-login-email"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdWhatsapp className="text-xl" />
                  </span>
                  <input
                    required={true}
                    id="design-login-whatsapp"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    type="text"
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col pt-4 mb-12">
                <div className="flex relative ">
                  <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MdPassword className="text-xl" />
                  </span>
                  <input
                    required={true}
                    id="design-login-password"
                    className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-sky-800 shadow-lg hover:shadow-none hover:bg-blue-900 focus:outline-none focus:ring-2"
              >
                <span className="w-full">Login</span>
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src={Heroimage}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;