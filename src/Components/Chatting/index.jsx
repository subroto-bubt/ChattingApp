import React from "react";
import { CameraIcon } from "../../svg/Camera";
import { SmileIcon } from "../../svg/Smile";
import { GalleryIcon } from "../../svg/Gallery";

const Chatting = () => {
  return (
    <>
      <div className="  bg-white">
        <div className="py-4 bg-[#212121] px-6">
          <div className="flex items-center gap-x-2 mt-5">
            <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden"></div>
            <div>
              <span className="font-fontRegular text-white">
                Subroto Kumar Sarker
              </span>
            </div>
          </div>
        </div>
        <div className="h-[515px] bg-[#FBFBFB] px-6">sdfasdf</div>
        <div className="bg-[#F5F5F5] py-4">
          <div className="bg-white w-[532px] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
            <div className="flex items-center gap-x-2 w-[15%]">
              <SmileIcon />
              <GalleryIcon />
            </div>
            <input
              placeholder="type something"
              className="w-[60%] outline-none"
            />
            <div className="w-[15%]">
              <button className="bg-[#4A81D3] px-4 py-2 rounded-md font-fontRegular text-sm text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
