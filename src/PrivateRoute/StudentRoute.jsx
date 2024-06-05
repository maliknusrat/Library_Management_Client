import { Navigate, useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const StudentRoute = ({children}) => {
    const location = useLocation()
    
    if (localStorage.getItem("type")== 'Student') {
        return children;
    }
    return (
       <Navigate
          to="/logIn" state={{from: location}}
          replace >
       </Navigate>
    );
};

export default StudentRoute;