import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../svg/AddFriend";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import AvatarImage from "../../assets/avatar.jpg";
const UserLists = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [users, setUsers] = useState([]);
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
      serderId: user.uid,
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
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().serderId);
      });
    });
  }, [db]);

  return (
    <div className="px-8 pt-3 bg-[#FBFBFB] h-[700px]">
      <h1 className="font-fontBold text-black text-xl">All Users</h1>
      {users.map((item, i) => (
        <div className="flex items-center justify-between mt-5" key={i}>
          <div className="flex items-center gap-x2">
            <div className="w-12 h-12 rounded-ful overflow-hidden">
              <img src={item.photoURL || AvatarImage} />
            </div>
            <h3 className="font-fontRegular text-black text-lg">
              {item.username}
            </h3>
          </div>
          <div
            className="text-black cursor-pointer"
            onClick={() => handleFriendRequest(item)}
          >
            <AddFriendIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLists;
