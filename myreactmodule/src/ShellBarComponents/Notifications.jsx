import { Toast,  ResponsivePopover } from "@ui5/webcomponents-react";
import MyNotificationItem from "./MyNotificationItem";
import { useEffect, useRef, useState } from "react";
import { socket } from '../socket';
import { render, createPortal } from 'react-dom';
import { LocalStorage } from "../Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
function Notifications() {
  const toast = useRef(null);

  const showToast = (message) => {
    const modalRoot = document.getElementById('root');
    render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
    toast.current.open = true;

  };
 
  const fetchNotifications = async()=>{
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    if (_token) {
      const response = await fetch(baseURL + '/notifications', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      if (response.status < 300) {
        const result = await response.json();
     //   console.log(result);
        setUserNotificaitions(result.notifications);
      }
    }
  }
  const [userNotifications, setUserNotificaitions] = useState([]);

  socket.on("NotificationFromAdmin", (notification) => {
    console.log("new Notification from Admin", notification);
    setUserNotificaitions([...userNotifications, notification]);
    showToast("New Notification \n" + notification.title);

  })
  const removeNotification = (notificationId) => {
    setUserNotificaitions(userNotifications.filter(item => item.id !== notificationId));
  }
  useEffect(()=>{
    fetchNotifications();
  },[])
  return <>

    <ResponsivePopover
      id="notificationPopOver"
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
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "300px", height: "80vh" }}>
        {userNotifications?.length > 0 && userNotifications.map((_notification) => {
          return <MyNotificationItem key={_notification.id} data={_notification} removeNotification={removeNotification} />
        })}
        {userNotifications?.length === 0 && <div className="noNotificationItem"> No new Notifications available</div>}
      </div>


    </ResponsivePopover>


  </>
}
export default Notifications;