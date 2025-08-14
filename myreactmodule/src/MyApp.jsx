import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Products from "./ProductComponents/Products";

import EditProducts from "./ProductComponents/EditProducts";
import { EditProductContext } from './ContextCreator';
import ImageList from "./ImageList";
import NewProduct from "./ProductComponents/NewProduct";
import UsersConainer from "./UsersConainer";
import UsersDetailPage from "./UserComponents/UsersDetailPage";
import UserContextProvider from "./Data/ContextHandler/UsersContext";
import ToDoListContextProvider from "./Data/ContextHandler/ToDoListContext";
import LoginPage from './LoginComponents/LoginPage';
import RegisterPage from './LoginComponents/RegisterPage';
import { socket } from './socket';
import { useAuth } from './Data/ContextHandler/AuthContext';
import ProtectedRoutes from "./LoginComponents/ProtectedRoutes";
import ResetPassword from "./LoginComponents/ResetPassword";
import WelcomeScreen from "./WelcomePage/WelcomeScreen";
import AboutPage from "./WelcomePage/AboutPage";
import ContactPage from "./WelcomePage/ContactPage";
import Loader from "./LoginComponents/Loader";
import ToDoMainPage from "./ToDoComponents/ToDoMainPage";
import NewsPage from "./RapidAPI/News/NewsPage";
import UsefulLinkMainPage from "./UsefulLinks/UsefulLinkMainPage";
import ImageListMainPage from "./ImageContainer/ImageListMainPage";
import WeatherMainPage from "./WeatherPage/WeatherMainPage";
import SettingPage from "./SettingPage";
import HelpPage from "./WelcomePage/HelpPage";
import CountriesMainPage from "./CountriesCompoents/CountriesMainPage";
import UnProtectedRoutes from "./LoginComponents/UnProtectedRoutes";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { ThemeProvider } from '@ui5/webcomponents-react';
import UserLocationContextProvider from "./Data/ContextHandler/UserLocationContext";
import UsefulLinksContextProvider from "./Data/ContextHandler/UsefulLinksContext";
import AllLinksContent from "./UsefulLinks/AllLinksContent";
import AdminMessageBox from "./AdminComponents/AdminMessageBox";
import AdminLogs from "./AdminComponents/AdminLogs";
import Callbackpage from "LoginComponents/Callbackpage";
import ArticleCardContainer from "RapidAPI/News/ArticleCardContainer";
import AddQuestions from "QuizComponents/AddQuestions";
import EditViewQuestion from "QuizComponents/EditViewQuestion";
import ManageQuestions from "QuizComponents/ManageQuestions";
import Quiz from "QuizComponents/Quiz";
export default function MyApp() {
  const { contextData } = useAuth();
  const { user, settingConfig } = contextData;
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
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user]);
 // const EditProductContext = React.createContext();
  const [editRows, setEditRows] = useState([]);

  setTheme("sap_horizon_dark");

  return (

    <div>
      <Routes>
        <Route element={<UnProtectedRoutes />}>
          <Route exact path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/images" element={<ImageListMainPage />} />
          <Route exact path="/weather" element={<UserLocationContextProvider><WeatherMainPage /></UserLocationContextProvider>} />
          <Route exact path="/news" element={<ArticleCardContainer />} />
          <Route exact path="/countries" element={<CountriesMainPage />} />
          <Route exact path="/help" element={<HelpPage />} />
           <Route path="/usefullinks" element={<UsefulLinksContextProvider><AllLinksContent/></UsefulLinksContextProvider>} /> 
           <Route exact path="/addproduct" element={<NewProduct />} /> 
           <Route exact path="/products1" element={<Products setEditRows={setEditRows} />} /> 
           <Route exact path="/editproducts" element={<EditProductContext.Provider value={{ editRows }}><EditProducts /> </EditProductContext.Provider>} /> 
           <Route exact path="/loader" element={<Loader />} /> 
           <Route exact path="/authcallback" element={<Callbackpage/>} />

        </Route>
       
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/home" element={<UserLocationContextProvider><Home /> </UserLocationContextProvider>} />
          <Route exact path="/detail" element={<Detail />} />
          <Route exact path="/products" element={<Products setEditRows={setEditRows} />} /> 
          <Route exact path="/settings" element={<SettingPage />} />
          <Route exact path="/editproducts" element={<EditProductContext.Provider value={{ editRows }}><EditProducts /> </EditProductContext.Provider>} /> 
          <Route exact path="/imagelist" element={<ImageList />} />
           <Route exact path="/addproduct" element={<NewProduct />} /> 
          <Route exact path="/users" element={<UserContextProvider><UsersConainer /> </UserContextProvider>} />
          <Route exact path="/users/:id" element={<UsersDetailPage />} />
          <Route exact path="/myprofile" element={<UsersDetailPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
           <Route path="/usefullinks1" element={<UsefulLinksContextProvider><UsefulLinkMainPage /></UsefulLinksContextProvider>} /> 
           <Route exact path="/todolist" element={<ToDoListContextProvider><ToDoMainPage user={user} /> </ToDoListContextProvider>} /> 
          <Route exact path="/adminmessagebox" element={<AdminMessageBox />} />
           <Route exact path="/adminlogs" element={<AdminLogs />} /> 
          <Route exact path="/about1" element={<AboutPage />} />
          <Route exact path="/contact1" element={<ContactPage />} />
          <Route exact path="/images1" element={<ImageListMainPage />} />
          <Route exact path="/weather1" element={<UserLocationContextProvider><WeatherMainPage /></UserLocationContextProvider>} />
          <Route exact path="/news1" element={<ArticleCardContainer />} />
          <Route exact path="/countries1" element={<CountriesMainPage />} />
          <Route exact path="/help1" element={<HelpPage />} />
          <Route exact path="/addquestion" element={<AddQuestions />} />
          <Route exact path="/displayquestion" element={<EditViewQuestion />} />
          <Route exact path="/managequestion" element={<ManageQuestions />} />
          <Route exact path="/quiz" element={<Quiz />} />
          

          <Route path="/" element={<Navigate replace to="/home" />} /> 

        </Route>
        
        <Route path="*" element={<Navigate replace to="/welcome" />} />
      </Routes>
    </div>

  );
}

