import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../Data/ContextHandler/AuthContext';
const ProtectedRoutes = ({ children }) => {
  //  const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
    const { contextData } = useAuth();
    const { token, user, userDetail } = contextData;
    //const user = useSelector((state) => state.user);
    let location = useLocation();
    console.log("location", location);
    console.log("Executed here Protected router", userDetail);
    const checkIfUserSessionIsValid = async () => {
        const response = await fetch(baseURL + '/realusers/nouser', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status < 300) {
            return children;

        } else {
            return <Navigate to="/welcome" state={{ from: location }} replace />
        }
    }
    if (!userDetail) {
        checkIfUserSessionIsValid();
    }
    return children
};

export default ProtectedRoutes;