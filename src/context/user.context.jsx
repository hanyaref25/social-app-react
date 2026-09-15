import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

  async function fetchUserInfo(token) {
    try {
      const options = {
        url: "https://route-posts.routemisr.com/users/profile-data",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(options);
      console.log(data.data.user)
     
      setUserInfo(data.data.user);
      localStorage.setItem('userInfo' , JSON.stringify(data.data.user))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserInfo(token);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, userInfo }}>
      {children}
    </UserContext.Provider>
  );
}