/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/Auth-unsplash.jpg";
import Swal from "sweetalert2";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useForm } from "react-hook-form";
import { AuthContext } from "./../../../Provider/AuthProvider";
import axios from "axios";

const SignInSignUp = () => {
  const [showName1, setShowName1] = useState({});

  const [registers, setRegister] = useState(false);
  // const axiosPublic = useAxiosPublic()
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const [image, setImage] = useState(null);
  const [Name, setName] = useState("");
  const [eMail, setEmail] = useState([]);
  const [dept, setDept] = useState([]);
  const [Id, setId] = useState("");
  const [type, setType] = useState("Student");
  const [regNmbr, setregNmbr] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  

  const {
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  function validateEmail(email) {
    // Regular expression to check if the domain is "student.just.edu.bd"
    const regex = /@student\.just\.edu\.bd$/;

    // Test the email against the regex
    if (regex.test(email)) {
        console.log("Email domain is valid.");
        return true;
    } else {
        console.log("Email domain is invalid.");
        return false;
    }
}

  //Registration
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const Id = form.id.value;
    const dept = form.dept.value;
    const regNmbr = form.resNmbr.value;


    if (password.length < 6) {
      Swal.fire({
        title: "Password must be six characters",
      });
      return;
    }
  
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)) {
      Swal.fire({
        title: "Password must contain an uppercase letter and one special character",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("image", photo);
  
    axios.post(image_hosting_url, formData)
      .then((res) => {
        const image = res.data.data.display_url;
        if (res.data.success) {
          axios.post("http://localhost:5000/registration", {
            Name: name,
            eMail: email,
            Id,
            image,
            type,
            dept,
            regNmbr,
            phnNmbr: "",
            password
          })
          .then((res) => {
            Swal.fire({
              title: "Registration Completed Successfully",
              icon: "success",
            });
            navigate("/");
          })
          .catch((err) => console.log("Registration error:", err));
        }
      });
  };
  
//_________________________________LOGIN_____________________
  const loginHandler = (event) => {
    
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email);
     
        axios.post('http://localhost:5000/logIn',
            {
            email,password
         }).then((res) => {
          console.log(res.data);
          localStorage.setItem("type", res.data.data.RegisterType);
          localStorage.setItem("email", res.data.data.Email);
          Swal.fire({
            title: `${res.data.message}`,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          if (res.data.success) {
            console.log('hit success', res.data.data.RegisterType);
              if (res.data.data.RegisterType == "Admin") {
                console.log('admin hit');
                const from = "/admin";
                console.log(from);
                navigate(from, { replace: true });
              } else if (res.data.data.RegisterType == "Student") {
                const from = "/student";
                navigate(from, { replace: true });
              } else {
                const from =  "/staff";
                navigate(from, { replace: true });
              }
          }
          
        });

  };

  return (
    <div className="w-80 md:w-96 my-16 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden font-oswald shadow-xl">
      {/* register form  */}
      <form
        onSubmit={handleRegister}
        className={`p-8 w-full ${
          registers
            ? "lg:translate-x-0"
            : "lg:-translate-x-full hidden lg:block"
        } duration-500`}
      >
        <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">Register</h1>
        <div className="space-y-3">
          {/* <label htmlFor="name" className="block">Name</label> */}
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="John Doe"
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md  border-black"
          />

          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="example@example.com"
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md  border-black"
          />

          <div>
            <label htmlFor="photo" className="flex w-full max-w-[600px]">
              <p className="w-full truncate rounded-md hover:shadow-[0px_0px_4px_0.5px] border-[1px] border-black px-4 py-2 text-sm  text-black shadow-md">
                {showName1.name ? showName1.name : "CHOOSE FILE"}
              </p>
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
                if (e.target.files && e.target.files[0]) {
                  const imageFile = e.target.files[0];
                  setShowName1(imageFile);
                }
              }}
              className="hidden"
              type="file"
              name="photo"
              id="photo"
            />
          </div>

          <input
            className="input h-9 text-sm p-3 block w-full outline-none border rounded-md border-black"
            name="registrationType"
            defaultValue={type}
            readOnly // Set a default value for the
          />

          <input
            id="dept"
            name="dept"
            onChange={(e) => setDept(e.target.value)}
            required
            placeholder="Enter Your Department"
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md border-black"
          />

          <input
            id="id"
            name="id"
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="Enter Your ID"
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md border-black"
          />

          <input
            id="resNmbr"
            name="resNmbr"
            onChange={(e) => setregNmbr(e.target.value)}
            placeholder="Enter Your Registration Number"
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md required border-black"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            min={5}
            className="p-3 h-9 text-sm block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
          />
        </div>

        {/* button type will be submit for handling form submission*/}
        <input
          type="submit"
          value="Register"
          className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
        />
        <p className="mb-3 text-center">
          Already have an account?
          <Link
            onClick={() => {
              setRegister(!registers);
            }}
            className="underline font-semibold"
          >
            Login
          </Link>
        </p>
        <hr />
      </form>

      {/* img */}
      <div
        className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${
          registers
            ? "translate-x-full rounded-bl-full  duration-500"
            : "rounded-br-full "
        }`}
      >
        <img src={img} className="h-full w-full" alt="card navigate ui" />
      </div>

      {/* login form */}
      <form
        onSubmit={loginHandler}
        className={`p-8 w-full mr-0 ml-auto duration-500 ${
          registers ? "lg:translate-x-full hidden lg:block" : ""
        }`}
      >
        <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">Login</h1>
        <div className="space-y-5">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
          />

          <label htmlFor="_password" className="block">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder=".............."
            min={5}
            className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
          />
          
        </div>
        <div className="mt-1 flex items-end justify-end"><Link className="hovertext-zinc-700 hover:underline dark:text-zinc-300" to="/forget"> Forget Password</Link></div>
        {/* button type will be submit for handling form submission*/}
        <input
          type="submit"
          value="Submit"
          className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
        />
        <p className="mb-3 text-center">
          Don&apos;t have an account?
          <Link
            onClick={() => {
              setRegister(!registers);
            }}
            className="underline font-semibold"
          >
            Register
          </Link>
        </p>
        <hr />
      </form>
    </div>
  );
};

export default SignInSignUp;
