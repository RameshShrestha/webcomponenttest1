import { Link } from "@ui5/webcomponents-react";
import LogoSVG from "./LogoSVG";

function WelcomeFooter(){
    return <>
    <div className="FooterWS">    <a href="/" className="brand-name">
                <LogoSVG color="#283c64"  height="40px" width="150px"/>
            </a>
            <span > Ramesh Shrestha © 2024  <Link style={{color:"white",marginRight:"10px"}}>fx_ra@hotmail.com</Link> </span>
            </div>
    </>
}
export default WelcomeFooter;