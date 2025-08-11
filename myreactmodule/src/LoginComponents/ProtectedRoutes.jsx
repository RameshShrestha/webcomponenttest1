import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../Data/ContextHandler/AuthContext';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { setTheme ,getTheme} from "@ui5/webcomponents-base/dist/config/Theme.js";
import MyShellBar from '../ShellBarComponents/MyShellBar';
import UserPopover from '../ShellBarComponents/UserPopover';
import Notifications from '../ShellBarComponents/Notifications';
import OnlineUsersContextProvider, { OnlineUsersContext } from '../Data/ContextHandler/OnlineUsersContext';
import ChatingBoxContainer from '../chatComponents/ChatingBoxContainer';
import ChatBox from '../chatComponents/ChatBox';
import React, { useEffect, useState } from "react";
import { socket } from '../socket';
import { LocalStorage } from "../Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const ProtectedRoutes = ({ children }) => {
   // console.log("Applied Theme : ", getTheme());
    const [isConnected, setIsConnected] = useState(socket.connected);
   // const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "Dataprovider";
    const { contextData } = useAuth();
    const navigate = useNavigate();
    const { token, user, userDetail, settingConfig } = contextData;
    //const user = useSelector((state) => state.user);
    let location = useLocation();
   // console.log("location", location);
   // console.log("Executed here Protected router", userDetail);
    const checkIfUserSessionIsValid = async () => {
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        const response = await fetch(baseURL + '/realusers/nouser', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }
        });
        if (response.status < 300) {
           // setIsConnected(true);
            //return children;
            //refreshToken

        } else {
            // return <Navigate to="/welcome" state={{ from: location }} replace />
            navigate("/welcome");
        }
    }
    if (!userDetail) {
        checkIfUserSessionIsValid();
    }
    if (settingConfig?.theme) {
     //   console.log("Applied Theme : ", settingConfig.theme);
        setTheme(settingConfig.theme);
      //  setTheme("sap_horizon_dark");
    } else {
        setTheme("sap_horizon_dark");
    //    console.log("Applied Theme is set", "sap_horizon_dark");
    }
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        const shellbar = document.getElementById("shellBar");
        const actionPopover = document.getElementById(
            "userPopOver"
        );
        const notificationPopover = document.getElementById(
            "notificationPopOver"
        );
        if (shellbar) {
            shellbar.addEventListener(
                "ui5-profile-click",
                function (event) {
                    actionPopover.opener = event.detail.targetRef;
                    actionPopover.open = true;
                }
            );
            shellbar.addEventListener(
                "ui5-notifications-click",
                function (event) {
                   // notificationPopover.showAt(event.detail.targetRef);
                    notificationPopover.opener = event.detail.targetRef;
                    notificationPopover.open = true;
                }
            );
        }
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [user]);
    return (
        <ThemeProvider>
            <div className="mainContainer sapScrollBar" style={{ height: `${user && isConnected ? "100vh" : "100vh"}`, overflow: "auto", overflowX: "hidden", background: getTheme().indexOf("dark") > -1 ? "var(--sapBackgroundColor)" :"#a8b4d9"} }>

                <MyShellBar />
                <UserPopover isConnected={isConnected} setIsConnected={setIsConnected} />
                <Notifications />
                <Outlet />
                {user && isConnected &&
                    <div className="pageFooter">
                        <OnlineUsersContextProvider>
                            <ChatingBoxContainer />
                            <ChatBox />
                        </OnlineUsersContextProvider>
                    </div>
                }

            </div>
        </ThemeProvider>

    );

};

export default ProtectedRoutes;