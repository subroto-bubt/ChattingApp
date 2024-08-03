import React from "react";
import RegFormCom from "../Components/Registration";
import Lottie from "lottie-react";
import RagistrationAnimation from "../animations/regAnimation.json";
import { ToastContainer, toast } from "react-toastify";

const Ragistration = () => {
  return (
    <>
      <ToastContainer />
      <div className=" w-full h-screen flex items-center justify-center">
        <div className="w-2/4 bg-white shadow-md rounded-md p-4 flex items-center justify-between gap-x-2">
          <div className="w-[48%]">
            <Lottie animationData={RagistrationAnimation} loop={true} />
          </div>
          <div className="w-[48%] ">
            <RegFormCom toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ragistration;
