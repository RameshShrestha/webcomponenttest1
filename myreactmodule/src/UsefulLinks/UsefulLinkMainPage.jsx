import {  Tab, TabContainer } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import { LocalStorage } from "../Data/LocalStorage";
import MyLinksContent from "./MyLinksContent";
import AllLinksContent from "./AllLinksContent";
import AddLinkDialog from "./AddLinkDialog";
import MyMessageBox from "./MyMessageBox";
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
const _myLocalStorageUtility = LocalStorage();
function UsefulLinkMainPage() {
    const [openState, setOpenState] = useState(false);
    const [openMessageBox,setOpenMessageBox] = useState(false);
    const [messageContent,setMessageContent] = useState("");
    const [selectedData,setSelectedData]=useState({});
    return <>
        <TabContainer
            contentBackgroundDesign="Solid"
            headerBackgroundDesign="Solid"
            onTabSelect={function Xs(){}}
            tabLayout="Standard"
        >
            <Tab
                selected
                text="My Links"
            >
                <MyLinksContent setOpenState={setOpenState} setOpenMessageBox={setOpenMessageBox} setSelectedData ={setSelectedData}/>
            </Tab>
            <Tab  text="All Links" >
            <AllLinksContent/>
            </Tab>
        </TabContainer>
        <AddLinkDialog openState={openState} setOpenState={setOpenState}></AddLinkDialog>
        <MyMessageBox open={openMessageBox} setOpenMessageBox={setOpenMessageBox} 
          selectedData={selectedData} />
    </>
}
export default UsefulLinkMainPage
