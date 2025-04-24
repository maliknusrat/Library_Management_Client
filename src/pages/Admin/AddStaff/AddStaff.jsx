/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const AddStaff = () => {
  // const [registers, setRegister] = useState(false);
  // const axiosPublic = useAxiosPublic()
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const [image, setImage] = useState(null);
  const [Name, setName] = useState("");
  const [eMail, setEmail] = useState([]);
  const [type, setType] = useState("Staff");
  const [phnNmbr, setPhnNmbr] = useState("");
  const [info, setInfo] = useState([]);

  const logoutHandler = () => {
    localStorage.removeItem("type");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => console.log(err));
    console.log(info);
  }, [info]);

  const {
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.files[0]; // Access the uploaded file
    const email = form.email.value;
    const phoneNmbr = form.phnNmbr.value;
    const password = form.password.value;

    // Validate password length
    if (password.length < 6) {
      Swal.fire({
        title: "Password must be six characters",
        icon: "warning",
      });
      return;
    }

    // Validate password complexity
    if (
      !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)
    ) {
      Swal.fire({
        title:
          "Password must contain an uppercase letter and a special character",
        icon: "warning",
      });
      return;
    }

    // Prepare the form data for image upload
    const formData = new FormData();
    formData.append("image", photo);

    axios
      .post(image_hosting_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const image = res.data.data.display_url;
          axios
            .post("http://localhost:5000/staffRegistration", {
              name,
              email,
              image,
              phoneNmbr,
              type,
              password,
            })
            .then((response) => {
              Swal.fire({
                title: "Registration Complete",
                text: "Registration was successful!",
                icon: "success",
              });
              navigate("/");
            })
            .catch((error) => console.error("Error in registration:", error));
        }
      })
      .catch((error) => console.error("Image upload failed:", error));
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="font-oswald">
      <div className="mx-auto my-4 max-w-3xl border border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="tracking-tight text-2xl font-bold text-gray-900 ">
            Add Staff
          </h3>
          <p className="text-sm text-gray-500 ">
            Please fill in the form to Register a new Staff.
          </p>
        </div>
        {/* Form Inner content */}
        <div className="p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Your name"
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="photo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Profile Image
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label
                    htmlFor="phnNmbr"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phnNmbr"
                    name="phnNmbr"
                    placeholder="Enter Your Phone Number"
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="registrationType"
                    className="text-sm font-medium text-gray-700"
                  >
                    Register Type
                  </label>
                  <input
                    id="registrationType"
                    name="registrationType"
                    type="text"
                    defaultValue={type}
                    readOnly
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="flex h-10 w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
