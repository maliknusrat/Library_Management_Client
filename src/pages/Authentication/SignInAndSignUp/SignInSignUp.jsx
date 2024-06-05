/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/Auth-unsplash.jpg"
import Swal from 'sweetalert2';
const image_hosting_token = import.meta.env.VITE_Image_Upload_token;
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from './../../../Provider/AuthProvider';
import axios from "axios";
import { data } from "autoprefixer";


const SignInSignUp = () => {
    const [showName1, setShowName1] = useState({});

    const [registers, setRegister] = useState(false);
    // const axiosPublic = useAxiosPublic()
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const [image, setImage] = useState(null);
    const [Name, setName] = useState('');
    const [eMail, setEmail] = useState([]);
    const [Id, setId] = useState('');
    const [type, setType] = useState('Student');
    const [regNmbr, setregNmbr] = useState('');
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

    const { createUser, signIn, } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || '/';



    //Registration
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
                                Name, eMail, Id, image, type, regNmbr
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


    //LOGIN
    const loginHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            // eslint-disable-next-line no-unused-vars
            .then(result => {
                form.reset();
                axios.get( `http://localhost:5000/users/${email}`)
                .then(res => {
                    localStorage.setItem('type', res.data.type)
                    localStorage.setItem('email', res.data.email)
                    Swal.fire({
                        title: 'Login Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    if (res.data.type == 'Admin') {
                        const from = location.state?.from?.pathname || '/admin';
                        navigate(from , {replace:true});
                    } else if (res.data.type == 'Student'){
                        const from = location.state?.from?.pathname || '/student';
                        navigate(from , {replace:true});
                    } else {
                        const from = location.state?.from?.pathname || '/staff';
                        navigate(from , {replace:true});
                    }
                } )

               
            })
            .catch(error => {
                Swal.fire({
                    title: 'Email or Password do not matched',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                console.log(error.message);
            })
    }


    return (
        <div className="w-80 md:w-96 my-16 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl">


            {/* register form  */}
            <form onSubmit={handleRegister} className={`p-8 w-full ${registers ? 'lg:translate-x-0' : 'lg:-translate-x-full hidden lg:block'} duration-500`}>
                <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">Register</h1>
                <div className="space-y-3">
                    {/* <label htmlFor="name" className="block">Name</label> */}
                    <input id="name" onChange={e => setName(e.target.value)} name="name" placeholder="John Doe" className="p-3 h-9 text-sm block w-full outline-none border rounded-md  border-black" />

                    
                    <input id="uemail" onChange={e => setEmail(e.target.value)} name="email" placeholder="example@example.com" className="p-3 h-9 text-sm block w-full outline-none border rounded-md  border-black" />

                    <div>
                        <label htmlFor="photo" className="flex w-full max-w-[600px]">
                            <p className="w-full truncate rounded-md hover:shadow-[0px_0px_4px_0.5px] border-[1px] border-black px-4 py-2 text-sm  text-black shadow-md">{showName1.name ? showName1.name : 'CHOOSE FILE'}</p>
                        </label>
                        <input
                            onChange={(e) => {
                                setImage(e.target.files[0])
                                if (e.target.files && e.target.files[0]) {
                                    const imageFile = e.target.files[0];
                                    setShowName1(imageFile);
                                }
                            }} className="hidden" type="file" name="photo" id="photo" />
                    </div>
                    


                    <input
                        className="input h-9 text-sm p-3 block w-full outline-none border rounded-md border-black"
                        name="registrationType"
                        defaultValue={type} readOnly // Set a default value for the 
                    />

                    <input id="id" name="id" onChange={e => setId(e.target.value)} required placeholder="Enter Your ID" className="p-3 h-9 text-sm block w-full outline-none border rounded-md border-black" />


                    <input id="resNmbr" name="resNmbr" onChange={e => setregNmbr(e.target.value)} placeholder="Enter Your Registration Number" className="p-3 h-9 text-sm block w-full outline-none border rounded-md required border-black" />

                    <input id="u_password" name="password" type="password" placeholder="Password" min={5} className="p-3 h-9 text-sm block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                </div>

                {/* button type will be submit for handling form submission*/}
                <input type="submit" value='Register' className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block" />
                <p className="mb-3 text-center">Already have an account?<Link onClick={() => { setRegister(!registers); }} className="underline font-semibold">Login</Link></p>
                <hr />
            </form>

            {/* img */}
            <div className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${registers ? 'translate-x-full rounded-bl-full  duration-500' : 'rounded-br-full '}`}>
                <img src={img} className="h-full w-full" alt="card navigate ui" />

            </div>

            {/* login form */}
            <form onSubmit={loginHandler} className={`p-8 w-full mr-0 ml-auto duration-500 ${registers ? 'lg:translate-x-full hidden lg:block' : ''}`}>
                <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">Login</h1>
                <div className="space-y-5">
                    <label htmlFor="_email" className="block">Email</label>
                    <input id="_email" name="email" type="email" placeholder="example@example.com" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />

                    <label htmlFor="_password" className="block">Password</label>
                    <input id="_password" name="password" type="password" placeholder=".............." min={5} className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                </div>
                {/* button type will be submit for handling form submission*/}
                <input type="submit" value='Submit' className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block" />
                <p className="mb-3 text-center">Don&apos;t have an account?<Link onClick={() => { setRegister(!registers); }} className="underline font-semibold">Register</Link></p>
                <hr />
            </form>
        </div>
    );
};

export default SignInSignUp;