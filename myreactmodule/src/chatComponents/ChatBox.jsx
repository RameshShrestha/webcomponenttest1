import { List, ListItemCustom, Icon } from "@ui5/webcomponents-react";
import ChatListItem from "./ChatListItem";
import { useContext, useEffect, useState } from "react";
import { OnlineUsersContext } from "../Data/ContextHandler/OnlineUsersContext";
import { socket } from "../socket";
function ChatBox() {
    const [userListVisible, setUserListVisible] = useState(false);
    const { onlineUsersData,setActiveChatList ,activeChatsList,currentUserDetail} = useContext(OnlineUsersContext);
        console.log(onlineUsersData,currentUserDetail);
   console.log(onlineUsersData);
    const [onlineUsers,setOnlineUsers] = useState(onlineUsersData);
     useEffect(()=>{
         console.log(socket);
        if (socket.connected) {
            fetchOnlineUsers();
         }
     },[]);
    // const rameshLinkedInImage = "https://media.licdn.com/dms/image/D5635AQEAFm1nlka20g/profile-framedphoto-shrink_100_100/0/1637827559400?e=1704877200&v=beta&t=2Q2KXz0Zdh_ipXqDnZdLRDflcnGGW5prFQJD1xuwHEI";
    // const onlineUsers = [{ "id": 1, "name": "Ramesh Shrestha", "image": rameshLinkedInImage, chatNotification: 2 },
    // { "id": 2, "name": "Sheldon Quigley", "image": "https://robohash.org/doloremquesintcorrupti.png", chatNotification: 4 },
    // { "id": 3, "name": "Terrill Hills", "image": "https://robohash.org/consequunturautconsequatur.png", chatNotification: 0 },
    // { "id": 4, "name": "Miles Cummerata", "image": "", chatNotification: 0 },
    // { "id": 5, "name": "Mavis Schultz", "image": "", chatNotification: 5 },
    // { "id": 6, "name": "Suzu Duwa", "image": "https://robohash.org/cupiditatererumquos.png", chatNotification: 0 },
    // { "id": 7, "name": "Rasal Shrestha", "image": "", chatNotification: 0 },
    // { "id": 8, "name": "Oleta Abbott", "image": "https://robohash.org/cupiditatererumquos.png", chatNotification: 0 }
    // ]

    const fetchOnlineUsers = () => {
      //  console.log(socket);
        if (socket.connected) {
            socket.emit('getOnlineUsers');
            console.log("fetching online users");
        }
    }

    return <div className="chatBoxContainer">
        <div style={{ width: "100%", border: "solid #a5c3d9", display: "flex", background: "#a5c3d9" }}
            onClick={(e) => {
                setUserListVisible(!userListVisible);
            
            }}>
            <button className="chatButton" style={{ width: "100%", color: "rebeccapurple" }}>Online Users</button>
            <Icon style={{ height: "30px", width: "30px", color: "rebeccapurple" }} name={userListVisible ? "navigation-down-arrow" : "navigation-up-arrow"} />
            {/* <Button icon={userListVisible ? "navigation-down-arrow" :"navigation-up-arrow"} /> */}
        </div>
        <div className={userListVisible ? "is-visible" : "is-invisible"} style={{ width: "100%", border: "solid #a5c3d9" }}>
            <List
                style={{ height: "100%", minHeight :"200px" ,background:"#a2a2de" }}

                onItemClick={function _a() { }}
                onItemClose={function _a() { }}
                onItemDelete={function _a() { }}
                onItemToggle={function _a() { }}
                onLoadMore={function _a() { }}
                onSelectionChange={function _a() { }}
            >
                {onlineUsersData.users && onlineUsersData.users.map((user) => {
                    // if(!currentUserDetail){
                    //     return;
                    // }
                    // if(user.name === currentUserDetail?.name){
                    //     return;
                    // }
                    return (
                        <ListItemCustom key={"chatli" + user.name} onClick={(e) => { 
                            if(!activeChatsList.find((item)=>item.name ===user.name)){
                                setActiveChatList([...activeChatsList,user])
                            }
                           // console.log(user.id); 
                            }} >
                            <ChatListItem
                                user={user} />
                        </ListItemCustom>
                    )
                })}

            </List>
        </div>

    </div>
}
export default ChatBox;