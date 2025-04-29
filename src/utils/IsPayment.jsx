import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import GetUserInfo from "./GetUserInfo";



const IsPayment = () => {
   const user = GetUserInfo();
    console.log(user);
    

    useEffect(() => {
        axios.get(`http://localhost:5000/ispayment/${user.StdID}`)
            .then(res =>{ getUser(res.data)
                console.log("RSS::",res);
            })
            .catch(err => console.log(err));
    },[user]);

    return user;
};

export default IsPayment;