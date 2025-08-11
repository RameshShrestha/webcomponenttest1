import { Icon } from "@ui5/webcomponents-react";
import { useContext, useEffect, useRef, useState } from "react";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import ChatIcons from "./ChatIcons";
import ChatMessage from "./ChatMessage";
import { socket } from '../socket';

function ChatitingBox({ user, currentUser }) {
    //  console.log("From Prop current User :", currentUser ,user.name);
    const [expandChat, setExpandChat] = useState(false);
    const { activeChatsList, setActiveChatList, currentUserDetail } = useContext(OnlineUsersContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [oldMessages, setOldMessages] = useState([]);
    const [chattingUser, setChattingUser] = useState(user.name);
    const [userTyping, setUserTyping] = useState(false);
    let currentUserTyping = false;
    const sendChatMessage = (chatData) => {
        if (chatData) {
            socket.emit("chatMessage", chatData);
            //   console.log("Message Sent to Server", chatData);
        }
    }
    const chatbox = useRef(null);
    useEffect(() => {
        //    console.log("Fetching old Chats",currentUser ,user.name);
        socket.emit("fetchUserChat", { "currentUser": currentUser, "chatUser": user.name });
    }, []);
    useEffect(() => {
        if (expandChat) {


            chatbox.current.scrollIntoView(false);
        }
    }, [oldMessages]);
    socket.on("chatHistoryLoad", (oldMessages) => {
        // console.log("Inside chatHistoryLoad", currentUser ,user.name);
        //  console.log(oldMessages.oldChat);
        if (chattingUser === oldMessages.chatUser) {
            setOldMessages(oldMessages.oldChat);
            const currentChatbox = document.getElementById("chat_" + chattingUser);
            if (currentChatbox) {
                currentChatbox.scrollTop = currentChatbox.scrollHeight;
            }
        }
    })
    socket.on("newChatMessageRecieved", (newMessage) => {
        //  console.log(newMessage);
        if (newMessage.sender === currentUser) {
            if (chattingUser === newMessage.receiver) {
                setOldMessages([...oldMessages, newMessage]);
                // console.log(document.getElementById("chat_"+newMessage.receiver));
                const currentChatbox = document.getElementById("chat_" + newMessage.receiver);
                if (currentChatbox) {
                    currentChatbox.scrollTop = currentChatbox.scrollHeight + 40;
                }

            }
        }
        if (newMessage.receiver === currentUser) {
            if (chattingUser === newMessage.sender) {
                setOldMessages([...oldMessages, newMessage]);
                // console.log(document.getElementById("chat_"+chattingUser));

                const currentChatbox = document.getElementById("chat_" + chattingUser);
                if (currentChatbox) {
                    currentChatbox.scrollTop = currentChatbox.scrollHeight + 40;
                }
                const currentChatboxBtn = document.getElementById("chatBtn_" + chattingUser);
                if (currentChatboxBtn) {
                    console.log(currentChatboxBtn);
                    currentChatboxBtn.classList.add("blinkDiv")
                }
            }
        }

    })
    socket.on("chatUserTyping", (data) => {
        // console.log("Chatting Event Triggered", data);
        if (!userTyping) {
            setUserTyping(true);
            setTimeout(() => {
                setUserTyping(false);
            }, 3000)
        }

    })
    socket.on("receiveChatMessage", (chatData) => {
        // console.log(chatData);
        if (chatData.sender === currentUser) {
            if (chattingUser === chatData.receiver) {
                setOldMessages([...oldMessages, chatData]);
            }
        }
        if (chatData.receiver === currentUser) {
            if (chattingUser === chatData.sender) {
                setOldMessages([...oldMessages, chatData]);
            }
        }
        //  setAllChatMessages(chatData);
    })
    const handleOnMessageChange = (e) => {
        setCurrentMessage(e.target.value);
        if (!currentUserTyping) {
            socket.emit("typingEvent", { sender: currentUser, receiver: user.name });
            currentUserTyping = true;
            setTimeout(() => {
                //socket.emit("stopTypingEvent", {sender :currentUser, receiver :user}); 
                currentUserTyping = false;
            }, 5000)
        }
    }

    return <>
        <div className="chatBoxContainer" >
            <div id={`chatBtn_${user.name}`} style={{ width: "100%", border: "solid #a5c3d9", display: "flex", background: "#a5c3d9", marginRight: "10px" }}
                onClick={(e) => {
                    setExpandChat(!expandChat);
                    e.target.parentElement.classList.remove("blinkDiv");
                }}>
                <button className="chatButton" style={{ width: "100%", color: "rebeccapurple" }}> {user.name}</button>
                <Icon style={{ height: "30px", width: "30px", color: "rebeccapurple" }} name="decline" interactive onClick={(e) => {
                    const otherActiveChats = activeChatsList.filter((item) => item.name !== user.name);
                    setActiveChatList([...otherActiveChats]);
                }} />
                {/* <Button icon={expandChat ? "navigation-down-arrow" :"navigation-up-arrow"} /> */}
            </div>
            <div className={expandChat ? "is-visible" : "is-invisible"} style={{ width: "100%", border: "solid #a5c3d9", background: "#3b4f3b" }}>
                <div style={{ height: expandChat ? "400px" : "0px" }}>

                    <div id={`chat_${user.name}`} style={{ height: "365px", overflow: "scroll", overflowX: "hidden" }}
                    >
                        <ChatMessage user={user} oldMessages={oldMessages} />
                        <div ref={chatbox} style={{ height: "30px", padding: "5px", color: "white" }}>{userTyping && <span>{user.name} is typing...</span>}</div>
                    </div>
                    <div className="chatInputContainer">
                        <input className="chatInput" value={currentMessage}
                            placeholder="Write message.."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendChatMessage({ sender: currentUser, receiver: user.name, currentMessage: currentMessage });
                                    setCurrentMessage("");
                                }
                            }}
                            onChange={handleOnMessageChange} />

                        <ChatIcons name="PaperPlane" height="30px" width="30px" fill="green" />
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ChatitingBox;