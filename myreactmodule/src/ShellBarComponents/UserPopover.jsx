import { Avatar, ShellBar, ShellBarItem, ResponsivePopover, Title, List, ListItemStandard, ListItemCustom, Button, Panel, ListItemGroup } from "@ui5/webcomponents-react";
import { useState } from "react";
import { socket } from '../socket';
import OnlineStatusIcon from "../LoginComponents/OnlineStatusIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Data/ContextHandler/AuthContext";
function UserPopover({ isConnected, setIsConnected }) {

  const navigate = useNavigate();
  const { contextData } = useAuth();
  const { logout, token, user, userDetail } = contextData;
  return <>
    <ResponsivePopover
      id="userPopOver"
      className="footerPartNoPadding"
      hideArrow
      horizontalAlign="Center"
      onAfterClose={function _a() { }}
      onAfterOpen={function _a() { }}
      onBeforeClose={function _a() { }}
      onBeforeOpen={function _a() { }}
      opener="openResponsivePopoverBtn"
      placementType="Bottom"
      verticalAlign="Center"
    >
      {/* <Label>
            Press "Esc", click outside or in mobile-mode press the "x" in the corner to close the ResponsivePopover.
          </Label> */}
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img src={userDetail?.image} alt="usr pic" style={{ height: "80px", width: "80px", border: "solid white", borderRadius: "40px" }} />
        <Title style={{ padding: "0.25rem 1rem 0rem 1rem" }}>{userDetail?.firstName} {userDetail?.lastName}</Title>
      </div>
      <div style={{ marginTop: "1rem" }}>

        <List separators="None"
         growing="Scroll"
          onItemToggle={(e) => {
            console.log("Toggle Parent");
          }
          }
          onItemClick={async (e) => {
            console.log(e);
            const actionPopover = document.getElementById(
              "userPopOver"
            );
            const selectedItem = e.detail.item.innerHTML;
            if (selectedItem === "Sign out") {
              //Sign out trigger
              console.log("sign out");

              await logout();
              actionPopover.open  = false;
            }
            else if (selectedItem === "Reset Password") {
              //Sign out trigger
              console.log("Reset Password");
              actionPopover.open  = false;
              navigate("/resetPassword");

            } else if (selectedItem === "My Profile") {
              //Sign out trigger
              console.log("My Profile");
              actionPopover.open  = false;
              navigate("/myprofile");

            } else if (selectedItem === "About") {
              //Sign out trigger
              console.log("About");
              actionPopover.open  = false;
              navigate("/about1");

            } else if (selectedItem === "Contact") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.open  = false;
              navigate("/contact1");

            } else if (selectedItem === "My Todo Activity") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.open  = false;
              navigate("/todolist");

            }
            else if (selectedItem === "Weathers") {
              //Sign out trigger
              console.log("Contact");
              actionPopover.open  = false;
              navigate("/weather1");

            }
            else if (selectedItem === "Images") {
              //Sign out trigger
              console.log("Images");
              actionPopover.open  = false;
              navigate("/images1");

            }
            else if (selectedItem === "Useful Links") {
              //Sign out trigger
              console.log("Useful Links");
              actionPopover.open  = false;
              navigate("/usefullinks1");

            }
            else if (selectedItem === "Settings") {
              //Sign out trigger
              console.log("Settings");
              actionPopover.open  = false;
              navigate("/settings");

            }
            else if (selectedItem === "Help") {
              //Sign out trigger
              console.log("Help");
              actionPopover.open  = false;
              navigate("/help1");

            }
            else if (selectedItem === "Countries") {
              //Sign out trigger
              console.log("Help");
              actionPopover.open  = false;
              navigate("/countries1");

            }
            


          }}>

          <ListItemCustom>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <OnlineStatusIcon height={20} width={20} status={`${isConnected ? "Online" : "Offline"}`} showText={true} />
              {/* <StatusMenu></StatusMenu> */}
              <Button design="Transparent" onClick={(e) => {
                setIsConnected(!isConnected);
                if (isConnected) {
                  socket.disconnect();
                } else {
                  //     const userDummylist = ["ramesh", "test1", "Shrestha", "Rasal", "Test user2", "Test 4", "Test5", "Mills", "last user", "last 2"];
                  //        const currentUser = userDummylist[Math.floor(Math.random() * 10)]
                  socket.connect();
                
                  // socket.engine.on("connection_error", (err) => {
                  //   console.log(err.req);      // the request object
                  //   console.log(err.code);     // the error code, for example 1
                  //   console.log(err.message);  // the error message, for example "Session ID unknown"
                  //   console.log(err.context);  // some additional error context
                  // });

                  socket.on("connect_error", (err) => {
                    // the reason of the error, for example "xhr poll error"
                    console.log(err.message);
                  
                    // some additional description, for example the status code of the initial HTTP response
                    console.log(err.description);
                  
                    // some additional context, for example the XMLHttpRequest object
                    console.log(err.context);
                  });
                  console.log({
                    "name": user,
                    "image": userDetail?.image,
                    "loginTime": new Date().toLocaleTimeString()
                  } );
                  console.log("Socket emit getOnline");
                  socket.emit('getOnline', {
                    "name": user,
                    "image": userDetail?.image,
                    "loginTime": new Date().toLocaleTimeString()
                  })
                }

              }} >
                {`${isConnected ? "Go Offline" : "Go Online"}`}
              </Button>
            </div></ListItemCustom>

          <ListItemStandard key="profile" icon="employee">My Profile</ListItemStandard>
          <ListItemStandard key="todolist" icon="employee">My Todo Activity</ListItemStandard>
          <ListItemStandard key="settings" icon="settings">Settings</ListItemStandard>
          <ListItemStandard key="ResetPw" icon="edit">Reset Password</ListItemStandard>
          <ListItemStandard key="About" icon="information">About</ListItemStandard>
          <ListItemStandard key="Contact" icon="call">Contact</ListItemStandard>
          <ListItemStandard key="help" icon="sys-help">Help</ListItemStandard>
          <ListItemStandard key="logout" icon="log">Sign out</ListItemStandard>
          <ListItemGroup>
            Others
          </ListItemGroup>
          <ListItemStandard key="Usefullinks" icon="internet-browser">Useful Links</ListItemStandard>
          <ListItemStandard key="Countries" icon="map-fill">Countries</ListItemStandard>
          <ListItemStandard key="Weathers" icon="cloud">Weathers</ListItemStandard>
          <ListItemStandard key="Images" icon="image-viewer">Images</ListItemStandard>

        </List>

      </div>

    </ResponsivePopover>
  </>
}
export default UserPopover;