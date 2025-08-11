import { Form, FormGroup, FormItem, Input, Label, TextArea, Button } from "@ui5/webcomponents-react";
import { useState } from "react";
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
function ContactPage() {
    const [messageContent,setMessageContent] =useState({
        name :"",
        address :"",
        mailid:"",
        message :""
    });
    const sendMessage =async ()=>{
        console.log(messageContent);
       
        try {

            const response = await fetch(baseURL + '/contactmsg/sendMessageToAdmin', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(messageContent),
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            const result = await response.json();
            console.log("returning", result);
            if (result?.message === "Message Sent Successfully") {
                setMessageContent({  name :"",  address :"",  mailid:"", message :"" });
             
            }
            return result;
    
          } catch (e) {
            console.log(e);
          }
    }
    return <div className="contactContainer">
        <h1>Contact Details</h1>
        <div style={{ display: "flex", background: "#ccc9c4", flexWrap: "wrap-reverse" }}>
            <div>
                <div className="contactRow">
                    <label>Name </label>
                    <span>:</span>
                    <text><b>Ramesh Shrestha</b></text>
                </div>
                <div className="contactRow">
                    <label>Address</label>
                    <span>:</span>
                    <address style={{ maxWidth: "450px" }}>Ashraya Layout ,Garudacharpalya, Bangalore ,
                        560048, Karnataka, Bangalore</address>
                </div>
                <div className="contactRow">
                    <label>Mobile No </label>
                    <span>:</span>
                    <div>+91 9986434052</div>
                </div>
                <div className="contactRow"><label>Email Id  </label> <span>:</span>
                    <a href="mailto:fx_ra@hotmail.com">fx_ra@hotmail.com</a>
                </div>
                <div className="contactRow"><label>LinkedIn </label><span>:</span> <a href="linkedin.com/in/shrestharamesh">linkedin.com/in/shrestharamesh</a></div>
                <div className="contactRow"><label>Facebook </label><span>:</span> <a href="facebook.com/RameshShrestha1987">facebook.com/RameshShrestha1987</a></div>
                <div className="contactRow"><label>Company </label><span>:</span> <div>IBM India</div></div>
                <div className="contactRow"><label>Designation </label><span>:</span> <div>Package Consultant</div></div>
                <div className="contactRow"><label>Role </label><span>:</span> <div>SAP Fiori Developer / Consultant</div></div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <img src="./penguin.jpg" alt="Contact person"
                    height="200px" width="200px" style={{ borderRadius: "120px" }} />
            </div>

        </div>
        <div style={{ background: "#513111", height: "5px" }} />
        <div style={{ display: "flex", background: "#5f655f" ,flexWrap:"wrap", width:"100vw"}}>
            <div style={{ minWidth: "400px", width: "500px" }}>
                <Form
                    backgroundDesign="Transparent"
                    columnsL={2}
                    columnsM={1}
                    columnsS={1}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={2}
                    labelSpanS={4}
                    labelSpanXL={4}
                    style={{
                        alignItems: 'center',
                        margin: "5px"
                    }}
                    titleText="Message Directly"
                >

                    <FormGroup>
                        <FormItem label="Name">
                            <Input placeholder="Your Name" value={messageContent.name} 
                               onChange={(e)=>{
                                setMessageContent({...messageContent, name : e.target.value})
                            }}/>
                        </FormItem>
                        <FormItem label={<Label>Address</Label>}>
                            <Input placeholder="Your Address" value={messageContent.address} 
                               onChange={(e)=>{
                                setMessageContent({...messageContent, address : e.target.value})
                            }}/>
                        </FormItem>
                        <FormItem label={<Label>Mail Id</Label>}>
                            <Input placeholder="Mail Id" value={messageContent.mailid} 
                               onChange={(e)=>{
                                setMessageContent({...messageContent, mailid : e.target.value})
                            }} />
                        </FormItem>
                    </FormGroup>
                    {/* <FormGroup>
                <FormItem label={<Label style={{ alignSelf: 'start', paddingTop: '0.25rem' }}>Additional Comment</Label>}>
                    <TextArea
                        placeholder="Type your message here"
                        rows={5}
                    />
                </FormItem>
                </FormGroup> */}
                </Form>
            </div>

            <div style={{ width: "40%", padding: "10px", minWidth: "350px", margin: "10px" }}>
                <h5 style={{ margin: "0px" }}> Your Message :</h5>
                <TextArea maxlength={2000}
                    value={messageContent.message} 
                    onChange={(e)=>{
                        setMessageContent({...messageContent, message : e.target.value})
                    }}
                    placeholder="Type your message here, max 2000 characters"
                    rows={6}
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    </div>
}
export default ContactPage;