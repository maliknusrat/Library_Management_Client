/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";


const AddStaff = () => {
    // const [registers, setRegister] = useState(false);
    // const axiosPublic = useAxiosPublic()
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const [image, setImage] = useState(null);
    const [Name, setName] = useState('');
    const [eMail, setEmail] = useState([]);
    const [type, setType] = useState('Staff');
    const [phnNmbr, setPhnNmbr] = useState('');
    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/students')
            .then(res => {
                setInfo(res.data);
            })
            .catch(err => console.log(err))
        console.log(info);
    }, [info])


    const { register, formState: { errors } } = useForm();

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            Swal.fire({
                title: 'Password must be six characters',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }

        if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/.test(password)) {
            Swal.fire({
                title: 'Password must an upper latter and one special character',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            return;
        }

        //create User

        // eslint-disable-next-line no-undef
        createUser(email, password)
            .then(result => {
                updateUserData(result.user, name, photo);
                console.log(result.user, name);


                //post operation
                const formData = new FormData();
                formData.append('image', image);

                axios.post(image_hosting_url, formData,
                    {
                        headers: {
                            'Content-Type': undefined // Remove Content-Type header
                        }
                    })
                    .then(res => {
                        console.log(res.data.data.display_url);
                        // setDisplayImage(res.data.data.display_url);
                        const image = res.data.data.display_url;
                        console.log(image);
                        if (res.data.success) {
                            axios.post('http://localhost:5000/students', {
                                Name, eMail, image, type, phnNmbr
                            })
                                .then(res => {
                                    console.log(res);
                                    Swal.fire({
                                        title: 'Registration',
                                        text: 'Registration Complete Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Cool!!!'
                                    })
                                    navigate('/');
                                }).catch(err => console.log(err));
                        }
                    })
            }




            )
    }

    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }
    const updateUserData = (user, name, photo) => {
        updateProfile(user, {
            displayName: name, photoURL: photo,
        })
            .then(() => {
                console.log('User Profile Updated');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="mx-auto my-4 max-w-3xl border border-gray-200 rounded-lg shadow-lg p-6 bg-white  hover:shadow-xl  ">
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="tracking-tight text-2xl font-bold text-gray-900 ">Add Staff</h3>
                    <p className="text-sm text-gray-500 ">Please fill in the form to Register a new Staff.</p>
                </div>
                {/* Form Inner content */}
                <div className="p-6">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <div className="">

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Your Name
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Your name"id="name" onChange={e => setName(e.target.value)} name="name"  />
                                    </div>
                                    {/* image */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Profile Image
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter the Book Image" id="photo" name="photo" required type="file" onChange={handleImage} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="email">
                                        Your Mail
                                    </label>
                                    <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Your Email"id="uemail" onChange={e => setEmail(e.target.value)} name="email" 
                                    />
                                </div>

                            </div>

                            <div>
                                <div className="">

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Phone number
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" placeholder="Enter Your Phone number" onChange={e => setPhnNmbr(e.target.value)} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="message">
                                            Register Type
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" name="registrationType" defaultValue={type} readOnly
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 " htmlFor="first-name">
                                            Password
                                        </label>
                                        <input className="flex h-10 w-full px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100  border border-gray-300  rounded-md" id="u_password" name="password" type="password" placeholder="Password" min={5} />
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Submit button */}
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">Submit</button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default AddStaff;