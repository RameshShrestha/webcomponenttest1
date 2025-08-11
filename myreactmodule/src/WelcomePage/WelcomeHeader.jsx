import { useState } from "react";
import LogoSVG from "./LogoSVG";
import MyIcon from "./MyIcon";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@ui5/webcomponents-react";
export default function WelcomeHeader({ dbConnected }) {
    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const iconClickEvent = (e) => {
        console.log("Pressed", e.target.innerText);
        const selectedMenu = e.target.innerText;
        if (selectedMenu === "Login") {
            navigate("/login");
        } else if (selectedMenu === "Join Now") {
            navigate("/register");
        }
        else if (selectedMenu === "Contact") {
            navigate("/contact");
        }
        else if (selectedMenu === "Home") {
            navigate("/welcome");
        }
        else if (selectedMenu === "About") {
            navigate("/about");
        } else if (selectedMenu === "Help") {
            navigate("/help");
        }
        else if (selectedMenu === "News") {
            navigate("/news");
        }
        else if (selectedMenu === "Weather") {
            navigate("/weather");
        }
        else if (selectedMenu === "Image Galary") {
            navigate("/images");
        }
        else if (selectedMenu === "Useful Links") {
            navigate("/usefullinks");
        }
        else if (selectedMenu === "Products") {
            navigate("/products1");
        }
        
        setIsNavExpanded(false);
    }
    return (

        <nav className="HeaderWS">
            <a href="/" className="brand-name">
                <LogoSVG color="#283c64" height="50px" width="200px" />
            </a>
            <button className="hamburger" onClick={() => {
                console.log("clicked");
                setIsNavExpanded(!isNavExpanded);
            }}>
                {/* icon from heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                <ul>
                    <li>
                        <Button style={{ color: "white" }} icon="home" onClick={iconClickEvent} design="Transparent"> Home </Button>
                        {/* <MyIcon color="white" name="Home" onPress={iconClickEvent} /> */}
                    </li>
                    <li>

                        <Button style={{ color: "white" }} icon="message-information" onClick={iconClickEvent} design="Transparent">  About </Button>
                        {/* <MyIcon color="white" name="About" onPress={iconClickEvent} /> */}
                    </li>
                    <li>

                        <Button style={{ color: "white" }} icon="call" onClick={iconClickEvent} design="Transparent">  Contact </Button>
                        {/* <MyIcon color="white" name="Contact" onPress={iconClickEvent} /> */}
                    </li>
                    <li>
                        {/* <Icon name="newspaper" interactive onClick={iconClickEvent}>News</Icon> */}
                        <Button style={{ color: "white" }} icon="newspaper" onClick={iconClickEvent} design="Transparent">  News </Button>
                        {/* <MyIcon color="white" name="News" onPress={iconClickEvent} /> */}
                    </li>
                    <li>

                        <Button style={{ color: "white" }} icon="weather-proofing" onClick={iconClickEvent} design="Transparent"> Weather </Button>
                    </li>
                    <li>

                        <Button style={{ color: "white" }} icon="image-viewer" onClick={iconClickEvent} design="Transparent"> Image Galary </Button>
                    </li>
                    <li>

                        <Button style={{ color: "white" }} icon="internet-browser" onClick={iconClickEvent} design="Transparent">Useful Links</Button>
                    </li>

                    <li>

                    <Button style={{ color: "white" }} icon="product" onClick={iconClickEvent} design="Transparent">Products</Button>
                    </li>
                    

                    <li>
                        {/* <MyIcon color="white" name="Help" onPress={iconClickEvent} /> */}
                        <Button style={{ color: "white" }} icon="sys-help" onClick={iconClickEvent} design="Transparent"> Help </Button>
                    </li>
                    {dbConnected &&
                        <>
                            <li>

                                <Button style={{ color: "white" }} icon="add-employee" onClick={iconClickEvent} design="Transparent"> Join Now </Button>
                                {/* <MyIcon color="white" name="Join Now" onPress={iconClickEvent} /> */}
                            </li>
                            <li>
                                <Button style={{ color: "white" }} icon="person-placeholder" onClick={iconClickEvent} design="Transparent"> Login </Button>
                                {/* <MyIcon color="white" name="Login" onPress={iconClickEvent} /> */}
                            </li>
                        </>}

                </ul>
            </div>
            {/* <div style={{display:"flex", alignItems:"center", justifyContent:"space-around",marginRight: "20px"}}>
             
                <MyIcon color="white" name="Join Now"/>
                <MyIcon color="white" name="Login"/>
          
            </div> */}
        </nav>
    );
}