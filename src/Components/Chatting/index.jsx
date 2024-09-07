import React, { useEffect, useRef, useState } from "react";
import { CameraIcon } from "../../svg/Camera";
import { SmileIcon } from "../../svg/Smile";
import { GalleryIcon } from "../../svg/Gallery";
import demoMedia from "../../assets/demoPic.jpg";
import { useSelector } from "react-redux";
import AvatarImage from "../../assets/avatar.jpg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { formatDistance } from "date-fns";
import EmojiPicker from "emoji-picker-react";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  const [messages, setMessages] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const db = getDatabase();
  const user = useSelector((user) => user.login.loggedIn);
  const chooseFile = useRef(null);

  const handleSendMessage = () => {
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiverName: singleFriend.name,
        whoReceiverId: singleFriend.id,
        message: messages,
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
      });
    }
  };

  //get Messages
  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      let singleMessageArry = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whoSendId &&
            item.val().whoReceiverId === singleFriend?.id) ||
          (user.uid === item.val().whoReceiverId &&
            item.val().whoSendId === singleFriend?.id)
        ) {
          singleMessageArry.push(item.val());
        }
      });
      setAllMessages(singleMessageArry);
    });
  }, [singleFriend?.id]);

  const handleEmojiSelect = ({ emoji }) => {
    setMessages(messages + emoji);
    setEmojiShow(!emojiShow);
  };

  return (
    <>
      <div className="  bg-white">
        <div className="py-2 bg-[#e2d9d9] px-6">
          <div className="flex items-center gap-x-2 mt-5">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={singleFriend?.profile || AvatarImage}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <span className="font-fontRegular text-black">
                {singleFriend?.name || "Please select you friend for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[515px] bg-[#FBFBFB] px-6 py-3 overflow-y-auto">
          {singleFriend?.status === "single"
            ? allMessages.map((item, i) => (
                <div key={i}>
                  {item.whoSendId === user.uid ? (
                    <div className="w-[70%] ml-auto flex flex-col items-end">
                      <p className="text-white font-fontRegular text-sm bg-slate-500 py-2 px-4 rounded-md inline-block ">
                        {item.message}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[70%] my-3 mr-auto flex flex-col items-start">
                      <p className="text-black font-fontRegular text-sm bg-[#efefef] py-2 px-4 rounded-md inline-block">
                        {item.message}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : ""}

          {/* Sender Messages */}
          {/* <div className="w-[70%] ml-auto">
            <p className="text-white font-fontRegular text-sm bg-slate-500 py-2 px-4 rounded-md inline-block">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              animi laudantium et consectetur neque, obcaecati cum libero eum
              vero dolorum sunt quam, dignissimos ut fugiat ducimus nisi,
              exercitationem nobis nostrum odio! Id odit aliquam quibusdam
              dolorem quae fuga tenetur nostrum reiciendis dignissimos
              exercitationem! Sed maxime culpa odit minima rem aut blanditiis
              saepe soluta perferendis vitae sapiente doloremque aliquid animi,
              labore necessitatibus. A at velit iure voluptate culpa alias
              aliquam eveniet dolor nulla hic adipisci, nisi eum quas
              recusandae, labore nostrum amet sed ex ea aut ipsa earum placeat
              dignissimos aperiam. Deserunt voluptates cumque incidunt autem
              itaque? Vel, numquam eaque exercitationem quasi, minus rem, eius
              tempora laborum omnis vero laudantium! Vitae ad fugit beatae,
              tempore sed mollitia, repellat, quaerat ipsam ullam numquam cumque
              earum eius adipisci iusto culpa. Vitae dolores quas iste ipsa
              eaque consectetur? Ipsa commodi repudiandae, ipsum, officiis autem
              dolores omnis, voluptate corrupti sapiente cumque saepe ex. Omnis
              maiores itaque rerum, facilis suscipit beatae pariatur
              voluptatibus minus temporibus consectetur, eaque perferendis
              nesciunt, reiciendis obcaecati. Distinctio eveniet tempora
              temporibus quod voluptas sit doloremque odit. Dicta nisi placeat
              magni molestiae provident!
            </p>
          </div> */}
          {/* Reciver Messages */}
          {/* <div className="w-[70%] my-3 mr-auto">
            <p className="text-black font-fontRegular text-sm bg-[#efefef] py-2 px-4 rounded-md inline-block">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              animi laudantium et consectetur neque, obcaecati cum libero eum
              vero dolorum sunt quam, dignissimos ut fugiat ducimus nisi,
              exercitationem nobis nostrum odio! Id odit aliquam quibusdam
              dolorem quae fuga tenetur nostrum reiciendis dignissimos
              exercitationem! Sed maxime culpa odit minima rem aut blanditiis
              saepe soluta perferendis vitae sapiente doloremque aliquid animi,
              labore necessitatibus. A at velit iure voluptate culpa alias
              aliquam eveniet dolor nulla hic adipisci, nisi eum quas
              recusandae, labore nostrum amet sed ex ea aut ipsa earum placeat
              dignissimos aperiam. Deserunt voluptates cumque incidunt autem
              itaque? Vel, numquam eaque exercitationem quasi, minus rem, eius
              tempora laborum omnis vero laudantium! Vitae ad fugit beatae,
              tempore sed mollitia, repellat, quaerat ipsam ullam numquam cumque
              earum eius adipisci iusto culpa. Vitae dolores quas iste ipsa
              eaque consectetur? Ipsa commodi repudiandae, ipsum, officiis autem
              dolores omnis, voluptate corrupti sapiente cumque saepe ex. Omnis
              maiores itaque rerum, facilis suscipit beatae pariatur
              voluptatibus minus temporibus consectetur, eaque perferendis
              nesciunt, reiciendis obcaecati. Distinctio eveniet tempora
              temporibus quod voluptas sit doloremque odit. Dicta nisi placeat
              magni molestiae provident!
            </p>
          </div> */}

          {/* Sender image */}
          {/* <div className="w-[70%] ml-auto">
            <img
              src={demoMedia}
              alt="Cat"
              className="w-full h-full object-cover rounded-md"
            />
          </div> */}

          {/* Reciver image */}
          {/* <div className="w-[70%] my-3 mr-auto">
            <img
              src={demoMedia}
              alt="Cat"
              className="w-full h-full object-cover rounded-md"
            />
          </div> */}
        </div>
        <div className="bg-[#F5F5F5] py-4">
          <div className="bg-white w-[532px] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
            <div className="flex items-center gap-x-2 w-[15%]">
              <div className="relative">
                <div
                  className="cursor-pointer"
                  onClick={() => setEmojiShow((prev) => !prev)}
                >
                  <SmileIcon />
                </div>
                {emojiShow && (
                  <div className="absolute bottom-8 -left-4">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => chooseFile.current.click()}
              >
                <GalleryIcon />
              </div>
              <input ref={chooseFile} hidden type="file" />
            </div>
            <input
              placeholder="type something"
              className="w-[60%] outline-none"
              onChange={(e) => setMessages(e.target.value)}
              value={messages}
            />
            <div className="w-[15%]">
              <button
                className="bg-[#4A81D3] px-4 py-2 rounded-md font-fontRegular text-sm text-white"
                onClick={handleSendMessage}
              >
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
