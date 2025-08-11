import {
Button, Icon
} from "@ui5/webcomponents-react";
import OnlineStatusIcon from "../LoginComponents/OnlineStatusIcon";
function ChatListItem({user}) {
    return <>
    {user &&
        <div style={{ display: "flex", alignItems: "center",width:"100%",justifyContent:"space-between" }}  >
            <div >
                <img style={{ borderRadius: "30px" }} src={user.image || "./dummyUser.PNG"} loading="lazy" alt={"user" + user.id} height={40} width={40} />
            </div>
      
            <div style={{ marginLeft: "3px" }}>
                <h4 >
                    {user.name}
                </h4>
            </div>
            <div style={{width:"40px"}}>
            <OnlineStatusIcon height={20} width={20} status={user.status}  showText={false}/>
            {user.chatNotification > 0 &&

                <Button className="chatCountBtn" design="Negative" >
                    {user.chatNotification}
                </Button>
                }
            </div>
        </div>
        }
    </>
}
export default ChatListItem;