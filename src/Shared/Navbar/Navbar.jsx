
import { Link, NavLink  } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
 
  const navlinks = <>
    <ul className="flex items-center justify-center gap-4">
      {/* <li> <NavLink to='/' className="text-zinc-600 font-bold group flex  cursor-pointer flex-col">Home<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span></NavLink></li> */}



      <li><NavLink to='/logIn' className="text-zinc-600 font-bold group flex  cursor-pointer flex-col">

        <FaUser /><span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span></NavLink></li>


    </ul>
  </>

  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-25 bg-black text-amber-100 ">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">JUSTLibary</a>
        </div>
        <div className="navbar-center hidden lg:flex gap-4 uppercase">
          <Link to='/'>Home</Link>
          <Link to='/admin/book'>Admin</Link>
          <Link to='/student/dashBoard'>Student</Link>
          <Link to='/staff/dashBoard'>Staff</Link>
          <Link to='/allBooks'>Books</Link>
        </div>
        <div className="navbar-end">
          {navlinks}
        </div>
      </div>
    </div>
  );
};

export default Navbar;