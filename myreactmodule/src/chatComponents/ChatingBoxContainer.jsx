
import ChatitingBox from "./ChattingBox";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import { useContext, useEffect } from "react";
function ChatingBoxContainer() {

    const { activeChatsList,currentUserDetail } = useContext(OnlineUsersContext);
    console.log("currentUserDetail",currentUserDetail);
   // console.log(onlineUsersData);
  //  const users = [{name:"Ramesh Shrestha",id:1},{name :"Test User1",id:2}];
  // useEffect(()=>{
  //   addInitialUsers(users);
  // },[]);
    return <>
        {activeChatsList.length > 0 && currentUserDetail.name && activeChatsList.map((user) => {

            return (
              <ChatitingBox key={user.name} user= {user} currentUser ={currentUserDetail.name}/>
            )
        })}
    </>
}
export default ChatingBoxContainer;