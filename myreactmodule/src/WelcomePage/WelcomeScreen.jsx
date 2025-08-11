import { useEffect, useState } from "react";
import LoginPage from "../LoginComponents/LoginPage";
import { Text, Title } from "@ui5/webcomponents-react";
function WelcomeScreen() {
   
    //const [dbConnected, setDBConnected] = useState(false);
    // const getServerStatus = async () => {
    //     const baseURL = process.env.REACT_APP_SERVER_URI;
    //     console.log(baseURL);
    //     try {
    //         const response = await fetch(baseURL + '/serverstatus', {
    //             method: 'GET',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const result = await response.json();
    //         setDBConnected(result.dbConnected);
    //         console.log(result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    useEffect(() => {
      //  getServerStatus();
    }, []);
    return <main className="MainWS sapScrollBar">
            <div className="FirstSection" style={{ display: "flex", width: "100%" }}>
                <div className="flexLeft" style={{ height: "420px", width: "40%" }}>
                    {/* {dbConnected ? (<LoginPage />) : (<div style={{
                        height: "100%", background: "black", color: "white",
                        fontSize: "50px", fontWeight: "bold"
                    }}> No DB Connected </div>)} */}
                    <LoginPage />
                </div>
                <div className="flexRight" style={{ height: "420px", display: "flex", alignItems: "center", minWidth: "300px", width: "60%" }}>
                    <img src="./NodeReactImg.PNG" height="100%" width="100%" alt="wall image" />
                </div>
                <div className="flexRight" style={{ height: "420px", display: "flex", alignItems: "center", minWidth: "300px", width: "60%", background:"black"}}>
                   {/* <img src ="https://sap.github.io/ui5-webcomponents/assets/illustrations/compatibility-frameworks/UI5.svg"
                    height="200px"/> */}
                      <img src ="./JavaScriptLogo.png" height="200px"/>
                </div>
            </div>
            {/* <Title>  Explore the React and Node JS Sample Application </Title>
            <Text>
                This application is developed as part of my learning React and NodeJS.
                Multiple Learning resources have been used from Youtube and Github.
                Thanks for the initiators who have kept there free learning channels
            </Text>
            <Title>  Place holder, will add other content in future </Title> */}
        </main>
      
}
export default WelcomeScreen;