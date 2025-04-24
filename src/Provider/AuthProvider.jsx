/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [storeEmail, setStoreEmail] = useState(null);
  
  const [user, setUser] = useState( null);
  
  useEffect(() => {
    setStoreEmail(localStorage.getItem("email"));
    setUser(localStorage.getItem("email"));
  }, [localStorage.getItem("email")]);

  const storedEmail = localStorage.getItem("email");
  console.log(storedEmail);
  
  const [loading, setLoading] = useState(false);

  let authInfo = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.proptypes ={
  children : PropTypes.node
}
export default AuthProvider;