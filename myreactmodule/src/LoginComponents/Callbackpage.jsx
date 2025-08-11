import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../Data/ContextHandler/AuthContext";
function Callbackpage() {
      // Use the useLocation hook to access the query string
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code'); // Extract query parameter from the URL
 // Accessing the login function from the AuthContext
 const { contextData } = useAuth();
 const { githubLogin }= contextData;
    const printUserParams  =()=>{
        
       console.log(code);
       if(code){
        githubLogin(code);

       }else{
        console.log("No Code");
       }
    }
    useEffect(()=>{
        console.log("testing");
        console.log(printUserParams());
    },[]);
    return (<><div>Hello</div></>);
}
export default Callbackpage;
//code=6b39173bdfa3a779e44d