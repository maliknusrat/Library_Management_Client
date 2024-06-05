/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";


const StaffRoute = ({children}) => {
    const location = useLocation()
    
    if (localStorage.getItem("type")== 'Staff') {
        return children;
    }
    return (
       <Navigate
          to="/logIn" state={{from: location}}
          replace >
       </Navigate>
    );
};

export default StaffRoute;