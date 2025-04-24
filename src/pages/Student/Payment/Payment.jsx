import React from "react";
import GetUserInfo from "../../../utils/GetUserInfo";
import axios from "axios";
import IsPayment from "../../../utils/IsPayment";
import img from "../../../assets/JUST_logo_transparent.png"

const Payment = () => {
  const user = GetUserInfo();
  const payment = IsPayment();
  console.log("User", user);
  const currentUser = user && user.length > 0 ? user[0] : null;
  const listArray = [
    "Efficient book management",
    "Fast library search",
    "Auto fine and alerts",
  ];

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const today = getCurrentDate();
  console.log("data",today);
  
  const handlePayment = async () => {
    const paymentData = {
      name: currentUser.Name,
      stdID: currentUser.StdID,
      email: currentUser.Email,
      department: currentUser.Department,
      date: new Date().toISOString().split("T")[0],
      status: "false",
      amount: "100",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/order",
        paymentData
      );
      console.log("Payment successful:", response.data);
      window.location.replace(response.data.url);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const generateCardNumber = (stdID) => {
    let hash = 0;
    for (let i = 0; i < stdID.length; i++) {
      hash = stdID.charCodeAt(i) + ((hash << 5) - hash);
    }
    const num = Math.abs(hash % 10000); // 4-digit number
    return num.toString().padStart(4, '0'); // ensure it's 4 digits
  };
  
  const cardNumber = generateCardNumber(currentUser?.StdID || "");

  return (
    <div className="flex items-center justify-center my-10">
      {payment ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-[#D6F0F4] p-5 rounded-lg shadow-lg w-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              {/* University Logo */}
              <img
                src={img}
                alt="University Logo"
                className="w-[70px] h-16 object-cover"
              />
              
              <div className="">
                <h3 className="text-[22px] font-bold font-oswald">
                  Jashore University of Science & Technology
                </h3>
              </div>
            </div>

            {/* Student Information */}
            <div className="flex items-center justify-between mb-4">
              
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{currentUser?.Name}</h3>
                <p className="text-sm">Department:{currentUser?.Department}</p>
                <p className="text-sm">Roll No: {currentUser?.StdID}</p>
              </div>
              <img
                src={currentUser?.Image}
                alt="User"
                className="rounded-none w-20 h-20 object-cover"
              />
            </div>

            {/* Divider */}
            <div className="border-t-2 border-gray-400 my-2"></div>

            {/* Footer */}
            <div className="text-sm">
              <p className="font-semibold mb-2">Student ID Card</p>
              <p className="text-center">Card No: {cardNumber}</p>
              <div className="text-center mt-4">
                <p className="italic">
                  "Issued by Jessore Science & Technology University"
                </p>
              </div>
              <div className="mt-10 flex justify-between">
                <p className=" border-black border-t-[1px]">Student's Signature</p>
                <p className=" font-semibold">Date: {today}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative space-y-8 bg-slate-200 p-8 shadow-[0px_0px_30px_2px_rgba(100,100,111,0.1)] dark:bg-[#18181B] md:w-[300px]">
          {/* top part */}
          <div>
            <img
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded-full border bg-slate-100 object-cover p-2 duration-300 hover:scale-105"
              src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL2pvYjk2OC1lbGVtZW50LTAxMi14LmpwZw.jpg"
              alt="card navigate ui"
            />
            {/* Ribbon omitted for brevity */}
            {/* <div className="absolute left-7 top-8 flex flex-col text-xl font-semibold text-white"> */}
            {/* Price Ribbon SVG  */}
            <div className="absolute -right-[20px] -top-4 ">
              <div className="relative h-full w-full">
                {/* svg  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="120"
                  height="120"
                  x="0"
                  y="0"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <defs>
                    <linearGradient
                      id="skyGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#0095FF", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#87CEFA", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <g>
                    <path
                      d="M384 0H149.333c-41.237 0-74.667 33.429-74.667 74.667v426.667a10.668 10.668 0 0 0 6.592 9.856c1.291.538 2.676.813 4.075.811a10.663 10.663 0 0 0 7.552-3.115l120.448-120.619C260.48 434.795 325.44 499.2 332.416 507.136c3.261 4.906 9.882 6.24 14.788 2.979a10.67 10.67 0 0 0 3.964-4.835 6.53 6.53 0 0 0 .832-3.947v-448c0-17.673 14.327-32 32-32 5.891 0 10.667-4.776 10.667-10.667S389.891 0 384 0z"
                      style={{ fill: "url(#skyGradient)" }}
                    />
                    <path
                      d="M394.667 0c23.564 0 42.667 19.103 42.667 42.667v32c0 5.891-4.776 10.667-10.667 10.667H352V42.667C352 19.103 371.103 0 394.667 0z"
                      style={{ fill: "#1976d2" }}
                    />
                  </g>
                </svg>
                {/* Price  */}
                <div className="absolute left-7 top-8 flex flex-col text-xl font-semibold text-white">
                  <span>
                    <sub className="text-sm font-normal">৳</sub>
                    <span>100</span>
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="space-y-4">
            <p className="capitalize text-gray-500 dark:text-sky-100">
              most popular
            </p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-[#139DFE]">
              Advance
            </h3>
            <ul className="space-y-3">
              {listArray?.map((each, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-[#4BB3FF]"
                >
                  {/* Icon omitted */}
                  {each}
                </li>
              ))}
            </ul>
            <div className="flex justify-center pt-4">
              <button
                onClick={handlePayment}
                className="btn text-base bg-sky-800 h-10 w-full rounded-lg border-2 border-sky-300 hover:text-sky-800 font-black text-white duration-300 dark:text-[#6CC2FB]"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
