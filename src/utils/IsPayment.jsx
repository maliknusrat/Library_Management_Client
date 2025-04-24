import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";



const IsPayment = () => {
    const { user } = useContext(AuthContext);
    const [users, getUser] = useState([]);
    console.log(users);
    

    useEffect(() => {
        axios.get(`http://localhost:5000/ispayment/${users.StdID}`)
            .then(res =>{ getUser(res.data)
                console.log(res);
            })
            .catch(err => console.log(err));
    },[user]);

    return users;
};

export default IsPayment;