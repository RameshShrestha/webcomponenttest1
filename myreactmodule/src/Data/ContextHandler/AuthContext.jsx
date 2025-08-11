import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { loginUser, logoutUser, registerUser } from "../../api/APIManage";
import Loader from "../../LoginComponents/Loader";
//import { UserInterface } from "../interfaces/user";
//import { LocalStorage, requestHandler } from "../utils";
import { LocalStorage } from "../LocalStorage";
const _myLocalStorageUtility = LocalStorage();
// Create a context to manage authentication-related data and functions
// const validDummyUsers = [{ username: "Ramesh", "password": "Ramesh" },
// { username: "Shrestha", "password": "Shrestha" },
// { username: "Guest", "password": "Guest" },
// { username: "User1", "password": "User1" },
// { username: "User2", "password": "User2" }];

const AuthContext = createContext({
  contextData: {
    user: null,
    token: null,
    role: null,
    settingConfig: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    userDetail: null
  }
});

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);
// Create a component that provides authentication-related data and functions
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [settingConfig, setSettingConfig] = useState(null);
  const [role, setRole] = useState(["USER"]);
  const [token, setToken] = useState("");
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate();
  //const baseURL = process.env.REACT_APP_SERVER_URI;
  const baseURL = "MyDataprovider";
  //console.log("Executed here AuthContext initial");
  // Function to handle user login
  const login = async (data) => {
   // console.log("Login", data);
    // await requestHandler(
    //   async () => await loginUser(data),
    //   setIsLoading,
    //   (res) => {
    //     const { data } = res;
    //     setUser(data.user);
    //     setToken(data.accessToken);
    //     LocalStorage.set("user", data.user);
    //     LocalStorage.set("token", data.accessToken);
    //     navigate("/chat"); // Redirect to the chat page after successful login
    //   },
    //   alert // Display error alerts on request failure
    // );


    if (data.username && data.password) {
     // console.log("login", data);
      // const loggedInUser = validDummyUsers.find((dummyUser) => {
      //   if (dummyUser.username === data.username) {
      //     return dummyUser;
      //   }
      //   return null;
      // });
      // if (loggedInUser) {
      //   if (loggedInUser.password === data.password) {
      //     //success
      //     setUser(data.username);
      //     //     setToken(data.accessToken);
      //     setToken("dummyToken");
      //     _myLocalStorageUtility.setLoggedInUserData(loggedInUser.username, "dummyToken");
      //     navigate("/home");

      //   } else {
      //     //worng password
      //     console.log("Wrong Password");
      //   }
      // } else {
      //   console.log("User Does not exist");
      // }
     // const baseURL = process.env.REACT_APP_SERVER_URI;
      const baseURL = "MyDataprovider";
      try {

        const response = await fetch(baseURL + '/realusers/login', {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
       // console.log("returning", result);
        if (result?.message === "Logged in successfully") {
          setUser(result.user.username);
          setRole(result.user.role);
          setToken(result.accessToken);
          _myLocalStorageUtility.setLoggedInUserData(result.user.username, result.accessToken, result.user.role);
          loadUserSettings();
          loadLoggedInUserDetail(result.user.username);
          //navigate("/home");
        }
        return result;

      } catch (e) {
        console.log(e);
      }
    }
  };
  const githubLogin = async (code)=>{
    const baseURL = "MyDataprovider";
    console.log("provided Code :" ,code);
      try {
        const response = await fetch(baseURL + '/auth/github/callback/'+code, {
          method: 'GET'
        });
        const result = await response.json();
        if (result?.message === "Logged in successfully") {
          setUser(result.user.username);
          setRole(result.user.role);
          setToken(result.accessToken);
          _myLocalStorageUtility.setLoggedInUserData(result.user.username, result.accessToken, result.user.role);
          loadUserSettings();
          loadLoggedInUserDetail(result.user.username);
          //navigate("/home");
        }
        return result;
      } catch (e) {
        console.log(e);
      }
     
  }
  const loadUserSettings = async () => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    if (_token) {
      const response = await fetch(baseURL + '/settings', {
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
        setSettingConfig(result[0]);
      } else {

      }
    }
  }
  const loadLoggedInUserDetail = async (username) => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    if (_token) {
      const response = await fetch(baseURL + '/realusers/' + username, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      if (response.status < 300) {
        const result = await response.json();
        setUserDetail(result);
        if (!user) {
          setUser(result.username);
          setRole(result.role);
        }
      } else {
        setToken("");
        _myLocalStorageUtility.removeLoggedInUserData();
        setUser(null);
         navigate("/welcome");
      }
    }
  }

  // Function to handle user registration
  const register = async (data) => {
   // console.log("Register", data);
    // await requestHandler(
    //   async () => await registerUser(data),
    //   setIsLoading,
    //   () => {
    //     alert("Account created successfully! Go ahead and login.");
    //     navigate("/login"); // Redirect to the login page after successful registration
    //   },
    //   alert // Display error alerts on request failure
    // );
   // const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
   // console.log(baseURL);
    try {
      const response = await fetch(baseURL + '/realusers/createUser', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
     // console.log("returning", result);
     if(result?.message.indexOf("Registered Successfully") > -1){
      //refresh user list on server
      await fetch(baseURL + '/newusercreated', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
     }
      return result;

    } catch (e) {
      console.log(e);
    }
    // if (result.message === 'Added Successfully') {
    //     showToast(result.message);
    //     navigate("/products");
    // }
    // post("/users/register", data);
  };
  // Function to handle user registration
  const resetPassword = async (data) => {
   // console.log("Reset Password", data);
    // await requestHandler(
    //   async () => await registerUser(data),
    //   setIsLoading,
    //   () => {
    //     alert("Account created successfully! Go ahead and login.");
    //     navigate("/login"); // Redirect to the login page after successful registration
    //   },
    //   alert // Display error alerts on request failure
    // );
  };
  // Function to handle user logout
  const logout = async () => {

   // const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
   // console.log(baseURL);
    try {

      const response = await fetch(baseURL + '/realusers/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
     // console.log("Logout");
      setUser(null);
      setToken("");
      _myLocalStorageUtility.removeLoggedInUserData();
      navigate("/welcome");
    } catch (error) {
      setUser(null);
      setToken("");
      _myLocalStorageUtility.removeLoggedInUserData();
      console.log(error);
    }
    // await requestHandler(
    //   async () => await logoutUser(),
    //   setIsLoading,
    //   () => {
    //     setUser(null);
    //     setToken(null);
    //     LocalStorage.clear(); // Clear local storage on logout
    //     navigate("/login"); // Redirect to the login page after successful logout
    //   },
    //   alert // Display error alerts on request failure
    // );
  };

  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    //Commented to not store in local storage
    setIsLoading(true);
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    const _user = loggedInUser?.user || "";
    const _role = loggedInUser?.role || "";
    if (_token && _user) {
      setUser(_user);
      setToken(_token);
      setRole(_role);
      loadLoggedInUserDetail(_user);

    }
    setIsLoading(false);
    if (!userDetail) {

    //  console.log("Executed here AuthContext UseEffect");
      loadLoggedInUserDetail('nouser');
      loadUserSettings();
    }
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ contextData: { user, role, login,githubLogin, settingConfig, setSettingConfig, register, logout, token, resetPassword, userDetail } }}>
      {isLoading ? <Loader /> : children}
      {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };
