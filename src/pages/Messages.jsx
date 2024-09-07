import React from "react";
import Friends from "../Components/Friends";
import Chatting from "../Components/Chatting";

const Messages = () => {
  const handleDeactive = () => {
    localStorage.removeItem("active");
  };
  return (
    <>
      <div className="grid grid-cols-[2fr,4fr]">
        <div className="w-full" onClick={handleDeactive}>
          <Friends />
        </div>
        <div className="mx-3">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Messages;
