import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'
import Main from './Layout/Main';
import Home from './pages/Home/Home';
// import AdminDash from './pages/Admin/AdminDash/AdminDash';
import AdminLayout from './Layout/AdminLayout';
import AddBook from './pages/Admin/AddBook/AddBook';
import BookShow from './pages/Admin/BookShow/BookShow';
import UpdateBook from './pages/Admin/UpdateBook';
import AllBooks from './pages/AllBooks/AllBooks';
import AuthProvider from './Provider/AuthProvider';
import SignInSignUp from './pages/Authentication/SignInAndSignUp/SignInSignUp';
import StudentLayout from './Layout/StudentLayout';
import BorrowBooks from './pages/Student/BorrowBooks/BorrowBooks';
import ReturnBooks from './pages/Student/ReturnBooks/ReturnBooks';
import DashBoard from './pages/Student/DashBoard/DashBoard';
import StudentBook from './pages/Student/StudentBooks/StudentBook';
import BookInfo from './pages/Student/BookInfo/BookInfo';
import AddStaff from './pages/Admin/AddStaff/AddStaff';
import Staff from './pages/Admin/Staff/Staff';
import StaffLayout from './Layout/StaffLayout';
import RequestBook from './pages/Staff/RequestBook/RequestBook';
import StaffDashboard from './pages/Staff/StaffDashboard/StaffDashboard';
import AllUsers from './pages/Admin/AllUsers/AllUsers';
import Profile from './Shared/Profile/Profile';
import OfflineBookIssue from './pages/Staff/OfflineBookIssue/OfflineBookIssue';
import AdminRoute from './PrivateRoute/AdminRoute';
import StudentRoute from './PrivateRoute/StudentRoute';
import StaffRoute from './PrivateRoute/StaffRoute';
import OfflineIssueBookLists from './pages/Staff/OfflineIssueBookLists/OfflineIssueBookLists';
import OnlineIssueBook from './pages/Staff/OnlineIssueBook/OnlineIssueBook';
import BookSummary from './pages/Staff/BookSummary/BookSummary';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children :[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/allBooks",
        element: <AllBooks></AllBooks>
      },
     
    ]
  },
  {
    path:"/logIn",
    element:<SignInSignUp></SignInSignUp>
  },
 
  {
    path:"/admin",
    element:<AdminRoute><AdminLayout></AdminLayout></AdminRoute>,
    children:[
      {
        path:"addbook",
        element:<AddBook></AddBook>
      },
      {
        path:"book",
        element:<BookShow></BookShow>
      },
      {
        path: "update/:id",
        element: <UpdateBook></UpdateBook>,
      },
      {
        path:"Staff",
        element:<Staff></Staff>
      },
      {
        path:"addStaff",
        element:<AddStaff></AddStaff>
      },
      {
        path:"adminProfile",
        element:<Profile></Profile>
      },
      {
        path:"allUsers",
        element:<AllUsers></AllUsers>
      },

    ]

  },
  {
    path:"/student",
    element:<StudentRoute><StudentLayout></StudentLayout></StudentRoute>,
    children:[
      {
        path:"borrowbook/:email",
        element:<BorrowBooks></BorrowBooks>
      },
      {
        path:"dashBoard",
        element:<DashBoard></DashBoard>
      },
      {
        path:"returnbook",
        element:<ReturnBooks></ReturnBooks>
      },
      {
        path:"StudentBook",
        element:<StudentBook></StudentBook>
      },
      {
        path:"bookInfo",
        element:<BookInfo></BookInfo>
      },
      {
        path:"profile",
        element:<Profile></Profile>
      },
    ]
  },
  {
    path:"/staff",
    element:<StaffRoute><StaffLayout></StaffLayout></StaffRoute>,
    children:[
      {
        path:"dashBoard",
        element:<StaffDashboard></StaffDashboard>
      },
      {
        path:"requestbook",
        element:<RequestBook></RequestBook>
      },
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
        path:"offlineBook",
        element:<OfflineBookIssue></OfflineBookIssue>
      },
      {
        path:"getOfflineBooks",
        element:<OfflineIssueBookLists></OfflineIssueBookLists>
      },
      {
        path:"getOnlineBooks",
        element:<OnlineIssueBook></OnlineIssueBook>
      },
      {
        path:"bookSummary",
        element:<BookSummary></BookSummary>
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthProvider>
   <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 </AuthProvider>
);
