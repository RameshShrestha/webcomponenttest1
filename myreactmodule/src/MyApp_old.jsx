import React, { useEffect, useState } from "react";
import { Avatar, ShellBar, ShellBarItem, ResponsivePopover, Title, List, ListItemStandard, ListItemCustom, Button } from "@ui5/webcomponents-react";
import addIcon from "@ui5/webcomponents-icons/dist/add.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
//import  '@ui5/webcomponents-react/dist/Assets';
import { ThemeProvider } from '@ui5/webcomponents-react';
import Products from "./Products";
import EditProducts from "./EditProducts";
import { EditProductContext } from './ContextCreator';
import ImageList from "./ImageList";
import NewProduct from "./NewProduct";
import UsersConainer from "./UsersConainer";
import UsersDetailPage from "./UserComponents/UsersDetailPage";
import UserContextProvider from "./Data/ContextHandler/UsersContext";
import ToDoListContextProvider from "./Data/ContextHandler/ToDoListContext";
import ChatBox from "./chatComponents/ChatBox";
import LoginPage from './LoginComponents/LoginPage';
import RegisterPage from './LoginComponents/RegisterPage';
import ChatingBoxContainer from "./chatComponents/ChatingBoxContainer";
import OnlineUsersContextProvider from "./Data/ContextHandler/OnlineUsersContext";
import { socket } from './socket';
import { useAuth } from './Data/ContextHandler/AuthContext';
import ProtectedRoutes from "./LoginComponents/ProtectedRoutes_older";
import OnlineStatusIcon from "./LoginComponents/OnlineStatusIcon";
import ResetPassword from "./LoginComponents/ResetPassword";
import WelcomeScreen from "./WelcomePage/WelcomeScreen";
import AboutPage from "./WelcomePage/AboutPage";
import ContactPage from "./WelcomePage/ContactPage";
import Loader from "./LoginComponents/Loader";
import MyShellBar from "./ShellBarComponents/MyShellBar";
import UserPopover from "./ShellBarComponents/UserPopover";
import Notifications from "./ShellBarComponents/Notifications";
import ToDoMainPage from "./ToDoComponents/ToDoMainPage";
import NewsPage from "./RapidAPI/News/NewsPage";
import UsefulLinkMainPage from "./UsefulLinks/UsefulLinkMainPage";
import ImageListMainPage from "./ImageContainer/ImageListMainPage";
import WeatherMainPage from "./WeatherPage/WeatherMainPage";
import SettingPage from "./SettingPage";
import HelpPage from "./HelpPage";
import CountriesMainPage from "./CountriesCompoents/CountriesMainPage";
//import '@ui5/webcomponents-react/dist/Assets';
export default function MyApp() {
  const { contextData } = useAuth();
  const { token, user, settingConfig, userDetail } = contextData;
  //console.log(settingConfig);
  const [isConnected, setIsConnected] = useState(socket.connected);
  // let onlineStatus = "Online";
  //console.log(socket);
  const { logout } = useAuth();
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
          actionPopover.showAt(event.detail.targetRef);
        }
      );
      shellbar.addEventListener(
        "ui5-notifications-click",
        function (event) {
          notificationPopover.showAt(event.detail.targetRef);
        }
      );
    }
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user]);
  //  const EditProductContext = React.createContext();
  const [editRows, setEditRows] = useState([]);
  // if(settingConfig?.theme){
  //   setTheme(settingConfig.theme);
  // }else{
  setTheme("sap_horizon_dark");
  // }

  // setTheme("sap_belize");
  // setTheme("sap_horizon");
  // setTheme("sap_fiori_3_dark");
  //  setTheme("sap_fiori_3");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("./");
  };
  return (
    <>
      <div>
        {user &&
          <MyShellBar />
        }
        <UserPopover isConnected={isConnected} setIsConnected={setIsConnected} />
        <Notifications />
        <div className="mainContainer" style={{ height: `${user && isConnected ? "82vh" : "91vh"}`, overflow: "auto", overflowX: "hidden", background: "var(--sapBackgroundColor)" }}>
          <Routes>
            {/* <Route  path="/" element={
              token && user ? (
                <Navigate replace to="/home" />
              ) : (
                <Navigate replace to="/welcome" />
              )
            } /> */}
            <Route exact path="/welcome" element={

              token && user ? (
                <Navigate replace to="/home" />
              ) : (
                <WelcomeScreen />
              )
            } />
            <Route path="/login" element={
              token && user ? (
                <Navigate replace to="/home" />
              ) : (
                <LoginPage />
              )
            } />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/images" element={<ImageListMainPage />} />
            <Route exact path="/weather" element={<WeatherMainPage />} />
            <Route exact path="/news" element={<NewsPage />} />
            <Route exact path="/countries" element={<CountriesMainPage />} />
            <Route exact path="/help" element={<HelpPage />} />
            <Route exact path="/loader" element={<Loader />} />
            <Route exact path="/home" element={<ProtectedRoutes><Home /> </ProtectedRoutes>} />
            <Route exact path="/detail" element={<ProtectedRoutes><Detail /> </ProtectedRoutes>} />
            <Route exact path="/products" element={<ProtectedRoutes><Products setEditRows={setEditRows} /> </ProtectedRoutes>} />
            <Route exact path="/settings" element={<ProtectedRoutes><SettingPage /> </ProtectedRoutes>} />
            <Route exact path="/editproducts" element={<ProtectedRoutes><EditProductContext.Provider value={{ editRows }}><EditProducts /> </EditProductContext.Provider></ProtectedRoutes>} />
            <Route exact path="/imagelist" element={<ProtectedRoutes><ImageList /> </ProtectedRoutes>} />
            <Route exact path="/addproduct" element={<ProtectedRoutes><NewProduct /> </ProtectedRoutes>} />
            <Route exact path="/users" element={<UserContextProvider><ProtectedRoutes><UsersConainer /> </ProtectedRoutes></UserContextProvider>} />
            <Route exact path="/users/:id" element={<ProtectedRoutes><UsersDetailPage /> </ProtectedRoutes>} />
            <Route exact path="/myprofile" element={<ProtectedRoutes><UsersDetailPage /> </ProtectedRoutes>} />
            <Route path="/resetPassword" element={<ProtectedRoutes><ResetPassword /> </ProtectedRoutes>} />
            <Route path="/usefullinks" element={<ProtectedRoutes><UsefulLinkMainPage /> </ProtectedRoutes>} />
            <Route exact path="/todolist" element={<ToDoListContextProvider><ProtectedRoutes><ToDoMainPage user={user} /> </ProtectedRoutes></ToDoListContextProvider>} />
            {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </div>
      {user && isConnected &&
        <div className="pageFooter">
          <OnlineUsersContextProvider>
            <ChatingBoxContainer />
            <ChatBox />
          </OnlineUsersContextProvider>
        </div>
      }

    </>
  );
}

