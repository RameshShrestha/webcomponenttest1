import { FlexibleColumnLayout, ListItemStandard, List, Text, Title, Button, Input } from '@ui5/webcomponents-react';
import { useEffect, useState } from 'react';
import { LocalStorage } from '../Data/LocalStorage';
const _myLocalStorageUtility = LocalStorage();
const baseURL ="MyDataprovider" ;
//const baseURL2 = process.env.REACT_APP_SERVER_URI;
function AdminMessageBox() {
  const [messages, setMessages] = useState([]);
  const [selectedMail, setSelectedMail] = useState({
    "name": "", "address": "", "mailid": "", "message": "", "createdAt": new Date()
  });
  const [layout, setLayout] = useState("OneColumn");
  const fetchMessages = async () => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    if (_token) {
      const response = await fetch(baseURL + '/contactmsg/getMessages', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      if (response.status < 300) {
        const result = await response.json();
      //  console.log(result);
        setMessages(result.messages);
      } else {

      }
    }

  }
  const deleteMessage = async (mailId) => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    try {
      const response = await fetch(`${baseURL}/contactmsg/deleteMessage/${mailId}`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      if (result.message === "Deleted Successfully") {
        setLayout("OneColumn");
        fetchMessages();
      }
    //  console.log("returning", result.message);
    } catch (e) {
      console.log(e);
    }
  }
  const sendMarkRead = async (mailId) => {
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    try {
      const response = await fetch(`${baseURL}/contactmsg/markRead/${mailId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      if (result.message === "Marked as Read") {

      }
    //  console.log("returning", result.message);
    } catch (e) {
      console.log(e);
    }
  }
  const onStartColumnClick = e => {
    let selectedMailDetail = messages.find(item => item._id === e.detail.item.dataset.id);
    if (selectedMailDetail.status === "New") {
      sendMarkRead(selectedMailDetail._id);
    }
    setSelectedMail(selectedMailDetail);
    setLayout("TwoColumnsMidExpanded");
  };
  useEffect(() => {
    fetchMessages();
  }, [])
  return <>
    <FlexibleColumnLayout
      startColumn={
        <div>
         <div  style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft:"10px", marginRight:"10px"}}>
          <Input placeholder='Search' style={{width:"100%"}}/>
          <Button icon='refresh' onClick={fetchMessages}/>
        </div>
        <List  onItemClick={onStartColumnClick} style={{height:"86vh"}}>
       
          {messages && messages.map((item) => {
            return (<ListItemStandard key={item._id} data-id={item._id} additionalText={item.status}
              icon={item.status === 'New' ? "email" : "email-read"}
              additionalTextState='Success'
              description={'Sent On : ' + new Date(item.createdAt).toLocaleString()} >From : {item.name}</ListItemStandard>)
          })}

        </List>
        </div>
      }
      midColumn={
        <div style={{ display: "flex", flexDirection: "column", height: "91dvh" }}>
          <div>
            <Title> From : {selectedMail.name}</Title>
           
            <Button icon="decline" design={"Transparent"} onClick={() => {
              setLayout("OneColumn");
            }} />
          </div>
          <div className="sapScrollBar" style={{ marginBottom: "auto", overflow:"scroll",overflowX:"hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "1rem", marginRight: "1rem" }}>
              <Text>Mail Id : {selectedMail.mailid}</Text>
              <Text>Sent On : {new Date(selectedMail.createdAt).toLocaleString()}</Text>
            </div>

            <div></div>
            <Text style={{ margin: "1rem" ,width:"100%"}}>Message</Text>
            <Text style={{ minHeight: "15rem", background: "#8e8f8914", padding: "1rem",width:"100%" }}>
              {selectedMail.message}
            </Text>
            <address style={{ color: "var(--sapContent_IconColor)", marginLeft: "1rem" }}>Address : {selectedMail.address}</address>
          </div>
         <div>
            <Button design={"Transparent"} onClick={(e) => {
            //  console.log(selectedMail._id)
              deleteMessage(selectedMail._id);
            }} >Delete</Button>
          </div>
        </div>

      }
      layout={layout}
      onLayoutChange={function _a() { }}

    />

  </>
}
export default AdminMessageBox;