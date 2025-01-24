import { createContext, useEffect, useState } from "react";

export const tokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
