import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../svg/AddFriend";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import AvatarImage from "../../assets/avatar.jpg";

const UserLists = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [users, setUsers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [cancelReq, setCancelReq] = useState([]);

  const storage = getStorage();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          getDownloadURL(Ref(storage, userList.key))
            .then((downloadURL) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  //Send FriendRequest handler
  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest")), {
      senderName: user.displayName,
      senderId: user.uid,
      senderProfile: user.photoURL ?? "/src/assets/avatar.jpg",
      receiverName: data.username,
      receiverId: data.id,
      receiverProfile: data.photoURL ?? "/src/assets/avatar.jpg",
    });
  };

  //Show Friend Request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancelReq = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().senderId);
        cancelReq.push({ ...item.val(), id: item.key });
      });
      setFriendReqList(reqArr);
      setCancelReq(cancelReq);
    });
  }, [db]);

  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelReq.find(
      (req) => req.receiverId == itemId && req.senderId == user.uid
    );

    if (reqToCancel) {
      remove(ref(db, "friendRequest/" + reqToCancel.id));
    }
  };

  return (
    <div className="px-8 pt-3 bg-[#FBFBFB] h-[700px]">
      <h1 className="font-fontBold text-black text-xl">All Users</h1>
      {users.map((item, i) => (
        <div className="flex items-center justify-between mt-5" key={i}>
          <div className="flex items-center gap-x2">
            <div className="w-12 h-12 rounded-ful overflow-hidden">
              <img
                src={item.photoURL || AvatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-fontRegular text-black text-lg">
              {item.username}
            </h3>
          </div>
          {friendReqList.includes(item.id + user.uid) ? (
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                onClick={() => handleCancelReq(item.id)}
              >
                Cancel Request
              </button>
            </div>
          ) : friendReqList.includes(user.uid + item.id) ? (
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                onClick={() => handleCancelReq(item.id)}
              >
                Panding Request
              </button>
            </div>
          ) : (
            <div
              className="text-black cursor-pointer"
              onClick={() => handleFriendRequest(item)}
            >
              <AddFriendIcon />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserLists;
