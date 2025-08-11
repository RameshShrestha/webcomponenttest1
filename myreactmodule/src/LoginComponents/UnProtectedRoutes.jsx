import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from '../Data/ContextHandler/AuthContext';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import React, { useEffect, useState } from "react";
import WelcomeHeader from "../WelcomePage/WelcomeHeader";
import WelcomeFooter from "../WelcomePage/WelcomeFooter";
import { LocalStorage } from "../Data/LocalStorage";

const _myLocalStorageUtility = LocalStorage();
const UnProtectedRoutes = ({ children }) => {
    //const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
    const { contextData } = useAuth();
    const { token, user, userDetail } = contextData;
    //const user = useSelector((state) => state.user);
    let location = useLocation();
    const [dbConnected, setDBConnected] = useState(false);
    const getServerStatus = async () => {

        const localserverStatusData = _myLocalStorageUtility.getServerStatus();
        if(localserverStatusData){
            let currentTime = new Date().getTime();
            let differnceInMinute = (currentTime -localserverStatusData.time)/60000;
            if(differnceInMinute < 5 ){
                setDBConnected(localserverStatusData.data.dbConnected);
                return;
            }
        }

        const baseURL = "MyDataprovider";//process.env.REACT_APP_SERVER_URI;
       // console.log(baseURL);
        try {

            const response = await fetch(baseURL + '/serverstatus', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            setDBConnected(result.dbConnected);
            _myLocalStorageUtility.setServerStatus(result);
        //    console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getServerStatus();
    }, []);
    //console.log("location", location);
   // console.log("Executed here Un Protected router", userDetail);
    setTheme("sap_horizon_dark");
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    const _user = loggedInUser?.user || "";
    if (_token && _user) {
        return <Navigate to="/home" state={{ from: location }} replace />
    }
    //     const checkIfUserSessionIsValid = async () => { 
    //     if(_token && _user){
    //     const response = await fetch(baseURL + `/realusers/${_user}`, {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${_token}`
    //         }
    //     });

    //      if (response.status < 300) {
    //         console.log("User is already logged In");
    //         return <Navigate to="/home" state={{ from: location }} replace />

    //      } else {

    //      }
    //     }
    // }

    return (
        <ThemeProvider>
            <div style={{ display: "flex", flexDirection: "column", minWidth: "350px", flexWrap: "wrap" }}>
                <WelcomeHeader dbConnected={dbConnected} />
                <div className="unprotectedContainer sapScrollBar">
                    <Outlet/>
                </div>
                <WelcomeFooter />

            </div>
        </ThemeProvider>

    );

};

export default UnProtectedRoutes;