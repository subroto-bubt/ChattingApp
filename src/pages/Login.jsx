import Lottie from "lottie-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loginAnimation from "../animations/loginAnimation.json";
import LoginFormCom from "../Components/Login";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className=" w-full h-screen flex items-center justify-center">
        <div className="w-2/4 bg-white shadow-md rounded-md p-4 flex items-center justify-between gap-x-2">
          <div className="w-[48%]">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <div className="w-[48%] ">
            <LoginFormCom toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
