// Importing necessary components and hooks
//import { LockClosedIcon } from "";
import { useState } from "react";
import { useAuth } from "../Data/ContextHandler/AuthContext";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../Data/LocalStorage";
import Loader from "./Loader";

const validDummyUsers = [{username :"Ramesh","password":"Ramesh"},
                         {username :"Shrestha","password":"Shrestha"},
                         {username :"Guest","password":"Guest"},
                         {username :"User1","password":"User1"},
                         {username :"User2","password":"User2"}];

// Component for the Login page
const LoginPage = () => {
  const [isLoading,setIsLoading]= useState(false);
  const [message,setMessage]= useState("");
  const navigate = useNavigate();
  // State to manage input data (username and password)
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  // Accessing the login function from the AuthContext
  const { contextData } = useAuth();
const { login,githubLogin }= contextData;
  // Function to update state when input data changes
  const handleDataChange = (e, name) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  }

  // Function to handle the login process

  const handleLogin = async () => await login(data);
  const loginClicked = async function(e){
    if(!Object.values(data).some((val) => !val)){
      setIsLoading(true);
      const result = await handleLogin();
      setIsLoading(false);
      console.log(result);
      if(result?.message){
        setMessage(result?.message);
      }
      setData({
        username: "",
        password: "",
      });
      navigate("/home");
    }
  }
 // const handleLogin = async () => await login(data);
  //  const handleLogin = async() => {
  //   console.log(data);
  //   await login(data);
  //  };
  return (
    <div className="mainLoginScreen">
      {/* <h1 className="text-3xl font-bold" style={{color:"white"}}>Ramesh React Application</h1> */}
      <div className="loginComponents">
        <div style={{ height: "50px", width: "50px", color: "#4e4646" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h1 style={{color:"#4e4646"}}>Login
        </h1>


        {/* Input for entering the username */}
        <input className="loginInput"
          placeholder="Enter the username..."
          value={data.username}
          onChange={(e) => { handleDataChange(e, "username") }}
        />
        {/* Input for entering the password */}
        <input className="loginInput"
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={(e) => { handleDataChange(e, "password") }}
        />
        {/* Button to initiate the login process */}
        <button className="loginButton"
          disabled={Object.values(data).some((val) => !val)}

          onClick={loginClicked}
        >
          Login
        </button>
        
        
        <button className="loginButton"
          onClick={function(){
            window.open("https://github.com/login/oauth/authorize?client_id=Iv23liZsvmp28QExsBAD&scope=user","_self");
          }}
        >
          <img src="./githubmarkwhite.png" alt="githublogo" style={{height:"22px",marginRight:"5px"}}/>
          GitHub Login
        </button>
       
        {isLoading && <Loader/>}
        {message.length>0 && <small>{message}</small>}

        {/* Link to the registration page */}
        <small className="text-zinc-300" style={{color:"#4e4646"}}>
          Don&apos;t have an account?{" "}
          <span className="loginLink" onClick={() => { navigate("/register"); }}>
            Register
          </span>
        </small>
      </div>
    </div>
  );
};

export default LoginPage;
