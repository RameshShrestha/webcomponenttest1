import React, { createContext, useReducer, useState } from "react";
import onlineUserReducer, { initialState } from "./onlineUserReducer";
import { socket } from '../../socket';
import { ADD_USER ,REMOVE_USER} from "./constant";
export let OnlineUsersContext = createContext({
  onlineUsersData :[],
  activeChatsList : [],
  allChatMessages :[],
  currentUserDetail: { id:'', name: 'Guest', status: "Online", loginTime: new Date(), image: './dummyUser.PNG', chatNotification: 0 },
  addUser :()=>{},
  removeUser : ()=>{},
  updateUser :()=>{},
  addInitialUsers :()=>{},
  setActiveChatList:()=>{},
  sendChatMessage : ()=>{},
  receiveChatMessage : ()=>{}
});

export default function OnlineUsersContextProvider({ children }) {
socket.on("userlist",(data)=>{
  console.log("userlist triggered");
  addInitialUsers(data.users);
})
socket.on("message",(data)=>{
  console.log(data);
  updateUser(data);
})
socket.on("useronline",(data)=>{
  console.log(data);
  updateUser(data);
})
socket.on("useroffline",(data)=>{
  console.log("Offline");
  updateUser(data);
})
socket.on("loggedInUserDetail",(data)=>{
  console.log("Current User Details received");
  setCurrentUserDetail(data);
})
socket.on("newUserJoined",(newUser)=>{
  console.log("New User is online",newUser);

  //console.log("New User added trigger");
  //Check if user already exists
  let user = onlineUsersData.users.filter((user)=> user.id === newUser.id);
  if(!user ){
  addUser(newUser);
 }
    updateUser(newUser);
})
 socket.on("newChatMessageRecieved",(newMessage)=>{
   console.log(newMessage);
   setAllChatMessages([...allChatMessages,newMessage]);
 })
 socket.on("receiveChatMessage",(chatData)=>{
   console.log(chatData);
   setAllChatMessages(chatData);
 })

  const [onlineUsersData, dispatchUser] = useReducer(onlineUserReducer, initialState);
  const [currentUserDetail,setCurrentUserDetail] = useState(null);
  const [activeChatsList,setActiveChatList] = useState([]);
  const [allChatMessages,setAllChatMessages] = useState([]);
  const addInitialUsers = (initialOnlineUsers)=>{
   // console.log(initialOnlineUsers);
    dispatchUser({
      type :"ADD_INITAL_USERS",
      payload :[...initialOnlineUsers]
    })
   } 
   const addUser = (user)=>{
    dispatchUser({
      type :ADD_USER,
      payload :user
    })
   } 
   const removeUser = (removeUserId)=>{
    dispatchUser({
      type :REMOVE_USER,
      payload :{name:removeUserId}
    })
   } 
  
   const updateUser = (updatedUser)=>{
    dispatchUser({
      type :"UPDATE_USER",
      payload :{user : updatedUser}
    })
   } 

   const receiveChatMessage = (chatBoxUser)=>{
    //Function to receive messages from server
    //console.log("received chats", data);
    const currentUser = currentUserDetail.name;
    if( !chatBoxUser){
      return [];
    }
    const filteredChats = allChatMessages.filter((ChatMessage)=>{
      if(ChatMessage.sender === currentUser || ChatMessage.receiver === currentUser || 
        ChatMessage.sender === chatBoxUser || ChatMessage.receiver === chatBoxUser){
          return ChatMessage;
        }
    });
   // console.log(filteredChats);//Chat between currentUser and Chatbox user only
    return filteredChats;
   }

   const sendChatMessage = (chatData)=>{
    if(chatData){
    socket.emit("chatMessage", chatData);
   // console.log("Message Sent to Server", chatData);
    }
   }
   
  const values = {
    onlineUsersData,
    dispatchUser,
    addInitialUsers,
    addUser,
    removeUser,
    updateUser,
    currentUserDetail,
    activeChatsList,
    setActiveChatList,
    sendChatMessage,
    receiveChatMessage,
    allChatMessages
  };

  return (
    <>
      <OnlineUsersContext.Provider value={values}>
        {children}
      </OnlineUsersContext.Provider>
    </>
  );
}