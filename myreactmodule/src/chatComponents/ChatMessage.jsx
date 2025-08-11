import { useContext, useEffect, useState } from "react";
import { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
function ChatMessage({user,oldMessages}){
    const {receiveChatMessage,currentUserDetail} =useContext(OnlineUsersContext);
    return<>
    {oldMessages && oldMessages.map((message)=>{
        return  <div  key={new Date(message.createdAt).getTime()} className="chatMessage" >
                    <div className={`${message.sender === currentUserDetail.name? 'userMessage': 'senderMessage' }`}>
                        <div className="chatMessageText">{message.content}</div>
                      
                    </div>
                    <div className={`${message.sender === currentUserDetail.name ? 'userMessage': 'senderMessage' }`} style={{fontSize:"0.7rem"}}> {new Date(message.createdAt).toLocaleTimeString()}</div>
                </div>
    })}
    </>
}
export default ChatMessage;