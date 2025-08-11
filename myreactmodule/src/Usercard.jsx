import { Button, Label,Text } from "@ui5/webcomponents-react";
import { Link, useNavigate } from "react-router-dom";
function Usercard ({user,deleteUser}){
    const navigate = useNavigate();
    //console.log(user);
    if(!user){
        return <>No Data</>
    }
    return <div className="userCard">
        <div className="cardHeader" onClick={(e)=>{
            //console.log("hello" ,user.firstName);
                        if(e.target?.type === "Button"){
                            return;
                        }
                            navigate(`/users/${user.username}`,{state:{id : user.username}});
                        }
           
            }>
                {user.firstName}  {user.lastName } 
              {deleteUser && <Button icon="decline" tooltip="Delete User" style={{float:"right"}} onClick={(e)=>{
                    e.preventDefault();
                    console.log("Button Pressed", user._id);
                    deleteUser(user._id);
                }}></Button>} 
            </div>
        <div style={{display :"flex", minHeight:"25vh",marginTop:"5px",background : 'var(--sapObjectHeader_Background)'}}>
        <div style={{width :"28%"}}><img className="userPic" src={user.image} height="85px" width="85px"/></div>    
        <div style={{width :"72%",margin:"10px"}}>
            <div><Label> Company: </Label> <Text style={{fontSize :"14px"}}>{user.company?.name}</Text></div>
            <div><Label> Email: </Label> <Text style={{fontSize:"12px" ,textDecoration: "underline",
    color: "blueviolet"}}>{user.email}</Text></div>
            <div><Label> Phone: </Label> <Text>{user.phone}</Text></div>
            <div><Label> Birth Date: </Label> <Text>{user.birthDate}</Text></div>
            <div><Label> Blood Group: </Label> <Text>{user.bloodGroup}</Text></div>
            </div>
        </div>
        <div className="cardFooter">Address: {user.address.address},{user.address.city} </div>
    </div> ;
}
export default Usercard;