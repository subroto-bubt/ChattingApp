import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarImage from "../../assets/avatar.jpg";
import { ActiveSingle } from "../../features/Slices/ActiveSingleSlice";

const Friends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [friends, setFriends] = useState([]);
  const [friendUnFriend, setFriendUnFriend] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().senderId ||
          user.uid == item.val().receiverId
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndArr);
    });
  }, [db, user.uid]);

  const handleRemoveFriend = (data) => {
    remove(ref(db, "friends/" + data.id));
  };

  const handleSingleChat = (data) => {
    if (user.uid === data.receiverId) {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
        })
      );
    } else {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
    }
  };

  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[700px]">
        <h1 className="font-fontBold text-black text-xl">All Friends</h1>

        {friends?.map((item) => (
          <div
            className="flex items-center justify-between mt-3 hover:bg-[#efefef] cursor-pointer px-4 py-2 rounded-md transition-all ease-linear duration-100 "
            key={item.id}
            onClick={() => handleSingleChat(item)}
          >
            {}

            <div className="flex items-center gap-x2">
              <div className="w-12 h-12 rounded-ful overflow-hidden">
                {user.uid === item.receiverId ? (
                  <img
                    src={item.senderProfile || AvatarImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.receiverProfile || AvatarImage}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-fontRegular text-black text-lg">
                {user.uid === item.senderId
                  ? item.receiverName
                  : item.senderName}
              </h3>
            </div>
            <div>
              <button
                className=""
                onClick={() => handleRemoveFriend(item)}
                onMouseEnter={() => setFriendUnFriend(false)}
                onMouseLeave={() => setFriendUnFriend(true)}
              >
                {friendUnFriend ? (
                  <h1 className=" px-4 py-2  rounded-md font-fontRegular bg-green-600 text-white">
                    Friend
                  </h1>
                ) : (
                  <h1 className="px-4 py-2  rounded-md font-fontRegular bg-red-600 text-white">
                    Unfriend
                  </h1>
                )}
              </button>
            </div>
            {location.pathname == "/" && (
              <button
                onClick={() => {
                  navigate("/messages");
                }}
                className="px-4 py-2 font-fontRegular bg-[#6CD0FB] text-white rounded-md"
              >
                Messages
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
