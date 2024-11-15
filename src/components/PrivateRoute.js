import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state

  const fetchData = async () => {
    const token = Cookies.get("token");
    try {
      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
          },
        });
        setIsAuthenticated(response.status === 200);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // If still loading, you can return a loading spinner or similar
  if (isAuthenticated === null) return <div>Loading...</div>;

  // If authenticated, render the outlet for child components; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
