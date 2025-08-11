// Import necessary components and hooks
//import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useAuth } from "../Data/ContextHandler/AuthContext";
import { useNavigate } from "react-router-dom";
// Component for user registration
const ResetPassword = () => {
  // State to manage user registration data
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  // Access the register function from the authentication context
  const { contextData} = useAuth();
  const { resetPassword } = contextData;

  // Handle data change for input fields
  const handleDataChange =
    (e, name) => {
      // Update the corresponding field in the data state
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Handle user registration
  const handleResetPassword = async () => await resetPassword(data);

  return (
    // Register form UI
    <div className="mainLoginScreen">
       {/* <h1 className="text-3xl font-bold" style={{color:"white"}}>Ramesh React Application</h1> */}
      <div className="loginComponents">
        <div style={{ height: "50px", width: "50px", color: "white" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h1 style={{color:"white"}}>Change Password
        </h1>

        {/* Input fields for username, password, and email */}
        <input className="loginInput"
          placeholder="Enter the email..."
          type="email"
          value={data.email}
          onChange={(e) => { handleDataChange(e, "email") }}
        />
        <input className="loginInput"
          placeholder="Enter old Password..."
          type="password"
          value={data.username}
          onChange={(e) => { handleDataChange(e, "username") }}
        />
        <input className="loginInput"
          placeholder="Enter new password..."
          type="password"
          value={data.password}
          onChange={(e) => { handleDataChange(e, "password") }}
        />
        {/* Register button */}
        <button className="loginButton"
          disabled={Object.values(data).some((val) => !val)}
          onClick={handleResetPassword}
        >
          Change Password
        </button>
        {/* Login link */}
        <small style={{color:"white"}}>
         
          <span className="loginLink" onClick={() => { navigate("/login"); }}>
            Login
          </span>
          
        </small>
      </div>
    </div>
  );
};

export default ResetPassword;
