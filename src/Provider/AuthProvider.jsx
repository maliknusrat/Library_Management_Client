/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import app from "../Firebase/firebase.config";

// import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();


  //createUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }


  //signIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth);
  }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const userEmail =currentUser?.email || user?.email ;
      const loggedUser = {email: userEmail}
        setUser(currentUser);
        console.log('current user',currentUser);
        setLoading(false);
        // if(currentUser){
          
        //   axios.post('https://scribblex-server.vercel.app/jwt',loggedUser, {withCredentials:true,
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${'15335aa279ac7ddde5cb7535eb46801204da9b1423e502ee70c600b276610bfc979af82bd2b024ab4082c12afb37ea0b4e5a661b9b4d19f3def48c6cb05d7848'}`, // Add this line
        //   },
        // },)
        // .then(res=>{
        //     console.log('token responce',res.data);
        //   })
        // }else{
        //   axios.post('https://scribblex-server.vercel.app/logout', loggedUser,{
        //     withCredentials:true
        //   })
        //   .then(res =>{
        //     console.log(res.data);
        //   })
        // }

    })
    return () => {
        return unsubscribe();
    }
  }, [])
  
    const authInfo = {
      createUser,
      signIn,
      user,
      logOut,
      loading,
      loginWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
          {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;