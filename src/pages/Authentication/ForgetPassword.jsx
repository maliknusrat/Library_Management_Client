/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/Auth-unsplash.jpg";
import axios from "axios";

const ForgetPassword = () => {
  const [registers, setRegister] = useState(false);

  const updatePassword = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const newPassword = form.newPassword.value;
    const password = form.password.value;
    axios
      .put("http://localhost:5000/changePass", {
        email,
        password,
        newPassword
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="font-oswald">
      <div className="w-80 md:w-96 my-16 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl">
        <div
          className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${
            registers
              ? "translate-x-full rounded-bl-full  duration-500"
              : "rounded-br-full "
          }`}
        >
          {/* <img src={img} className="h-full w-full" alt="card navigate ui" /> */}
        </div>
        <form
          onSubmit={updatePassword}
          className={`p-8 w-full mr-0 ml-auto duration-500 ${
            registers ? "lg:translate-x-full hidden lg:block" : ""
          }`}
        >
          <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">
            Reset Your Password
          </h1>
          <div className="space-y-5">
            <label htmlFor="_email" className="block">
              Email
            </label>
            <input
              id="_email"
              name="email"
              type="email"
              placeholder="example@example.com"
              className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />

            <label htmlFor="_password" className="block">
            Your Password
            </label>
            <input
              id="_password"
              name="password"
              type="password"
              placeholder=".............."
              min={5}
              className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />

            <label htmlFor="_password" className="block">
            New Password
            </label>
            <input
              id="_password"
              name="newPassword"
              type="password"
              placeholder=".............."
              min={5}
              className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
            />
          </div>

          {/* button type will be submit for handling form submission*/}
          <input
            type="submit"
            value="Submit"
            className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
