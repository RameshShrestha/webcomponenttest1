import { useRef, useState } from "react";
import { socket } from '../socket';
import { TextArea, Input, Select, Option,  Button,Toast } from "@ui5/webcomponents-react";
import { render, createPortal } from 'react-dom';
function AdminNotificationSender() {

    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.open = true;
    };
    const [adminNotification, setAdminNotification] = useState({ title: "", type: "None", message: "" });
    const sendNotificationMessage = (message) => {
        if (message) {
            socket.emit("adminNotification", message);
            console.log("Message Sent to Server", message);
            showToast("Message Sent");
            setAdminNotification({ title: "", type: "None", message: "" });
        }
    }
    return <div style={{ margin: "5px", display:"flex", flexDirection:"column"}}>
        <span>Title : <Input value={adminNotification.title} placeholder="Notification Title"
            onChange={(e) => {
                setAdminNotification({ ...adminNotification, title: e.target.value });
            }} /></span>
       <span>Type :  <Select
            value={adminNotification.type}
            onChange={(e) => {
                setAdminNotification({ ...adminNotification, type: e.target.value });
            }}
            onClose={function _a() { }}
            onLiveChange={function _a() { }}
            onOpen={function _a() { }}
        >
            <Option>
                None
            </Option>
            <Option>
                Information
            </Option>
            <Option>
                Warning
            </Option>
            <Option>
                Info
            </Option>
            <Option>
                Success
            </Option>

        </Select></span>
        <TextArea maxlength={200} rows={3} value={adminNotification.message} placeholder="Notification message" onChange={(e) => {
            setAdminNotification({ ...adminNotification, message: e.target.value });
        }} />
        <Button onClick={(e) => {
            sendNotificationMessage({ notification: adminNotification });
        }}>Send</Button>
    </div>
}
export default AdminNotificationSender;