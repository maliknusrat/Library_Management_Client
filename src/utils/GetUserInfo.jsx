import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";


const GetUserInfo = () => {
    const { user } = useContext(AuthContext);
    const [users, getUser] = useState([]);
   

    useEffect(() => {
        axios.get(`http://localhost:5000/singleUser/${user?.email}`)
            .then(res => getUser(res.data))
            .catch(err => console.log(err));
    },[user]);

    return users;
};

export default GetUserInfo;