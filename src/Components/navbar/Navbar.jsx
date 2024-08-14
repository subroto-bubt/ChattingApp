import React from "react";

import { MessageIcon } from "../../svg/Message";
import { FriendsIcon } from "../../svg/Friends";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { logOutUser } from "../../features/Slices/LoginSlice";
import { useDispatch } from "react-redux";
import { CameraIcon } from "../../svg/Camera";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(logOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-between py-3 bg-slate-900 px-7">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-orange-200 overflow-hidden"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <CameraIcon />
            </div>
          </div>
          <div>
            <span className="font-fontRegular text-white">
              Subroto Kumar Sarker
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            to="/"
            className={`${
              location.pathname == "/"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white"
            }  w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <FriendsIcon />
          </Link>
          <Link
            to="/messages"
            className={`${
              location.pathname == "/messages"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white"
            } w-10 h-10 rounded-full  flex items-center justify-center`}
          >
            <MessageIcon />
          </Link>
        </div>
        <div>
          <button
            className="bg-[#6CD0FB] px-4 py-2 rounded-md font-fontBold text-sm text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
