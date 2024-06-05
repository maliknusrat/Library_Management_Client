import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const AdminRoute = ({children}) => {
    const location = useLocation()
    
    if (localStorage.getItem("type")== 'Admin') {
        return children;
    }
    return (
       <Navigate
          to="/logIn" state={{from: location}}
          replace >
       </Navigate>
    );
};

export default AdminRoute;