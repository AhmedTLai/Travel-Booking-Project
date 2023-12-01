import { createContext, useEffect, useState } from "react";
import api from '../assets/data/api_Url_Config.js';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedAuthData = localStorage.getItem('Auth_token');
  const initialCurrentUser = storedAuthData ? JSON.parse(storedAuthData) : null;
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [err, setErr] = useState(null);

  const Login = async (data) => {
    try {
      const res = await api.post('/user/login', data, { withCredentials: true });
      setCurrentUser(res.data);
      setErr(null); // Clear any previous errors

      // Remove the Auth_token from localStorage after 1 second
      setTimeout(() => {
        localStorage.removeItem('Auth_token');
      }, 1000 * 60 * 60 * 24);
    } catch (error) {
      setErr(error);
    }
  };

  const EditUpdate = (data)=>{
    try{
      setCurrentUser(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('Auth_token', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('Auth_token'); // Remove the item if currentUser is null
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, err, Login ,EditUpdate}}>
      {children}
    </AuthContext.Provider>
  );
};