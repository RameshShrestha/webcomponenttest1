import { Bar, Dialog, Icon, Title, Button, FormItem, Input, TextArea, Select, Option } from "@ui5/webcomponents-react";
import { Form } from "@ui5/webcomponents-react";
import { LocalStorage } from "../Data/LocalStorage";
import { useState } from "react";
import { useUsefulLinkContext } from "../Data/ContextHandler/UsefulLinksContext";
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
const _myLocalStorageUtility = LocalStorage();

function AddLinkDialog({ openState, setOpenState }) {
    const [newLink, setNewLink] = useState({ type: "", url: "", description: "" });
    const {fetchIntialUserLinks } =useUsefulLinkContext();
    const saveUsefulLink = async () => {
        console.log(newLink);
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        if (_token) {
            try {
                const response = await fetch(baseURL + '/usefullinks/addlink', {
                    method: 'POST',
                    body: JSON.stringify(newLink),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${_token}`
                    }
                });
                const result = await response.json();
                setNewLink({ type: "", url: "", description: "" });
                setOpenState(false);
                fetchIntialUserLinks();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return <>
        <Dialog
            style={{ width: "600px" }}
            open={openState}
            className="headerPartNoPadding footerPartNoPadding"
            footer={<Bar design="Footer" endContent={
                <>
                    <Button style={{ width: "10rem" }} onClick={saveUsefulLink}>Add Link</Button>
                    <Button onClick={function _a() { setOpenState(false) }}>Close</Button>
                </>} />}

            headerText="Add New Link"
            onAfterClose={function _a() { setOpenState(false) }}
            onAfterOpen={function _a() { }}
            onBeforeClose={function _a() { }}
            onBeforeOpen={function _a() { }}
        >
            <Form

                backgroundDesign="Transparent"
                columnsL={2}
                columnsM={2}
                columnsS={1}
                columnsXL={2}
                labelSpanL={4}
                labelSpanM={3}
                labelSpanS={12}
                labelSpanXL={4}
                style={{
                    alignItems: 'center'
                }}

            >

                <FormItem label="Link URL">
                    <Input name="url" style={{ width: "100%" }} placeholder="Link URL" value={newLink.url}
                        onChange={(e) => {
                            setNewLink({ ...newLink, "url": e.target.value })
                        }} />
                </FormItem>
                <FormItem label="Link Description">
                    <TextArea name="description" rows={3} placeholder="Link Description" value={newLink.description}
                        onChange={(e) => {
                            setNewLink({ ...newLink, "description": e.target.value })
                        }} />
                </FormItem>
                <FormItem label="Link Type">
                    <Select name="type" style={{ width: "12rem" }} placeholder="Link Type" value={newLink.type}
                        onChange={(e) => {
                            setNewLink({ ...newLink, "type": e.target.value })
                        }}
                    >
                        <Option>Video</Option>
                        <Option>URL Link</Option>
                    </Select>
                </FormItem>
            </Form>
            {/* <div style={{ display: "flex", flexDirection: "column", width: "50vw", marginLeft: "20px" }}>
            <Input name="url" style={{ width: "100%" }} placeholder="Link URL" value={newLink.url}
                onChange={(e) => {
                    setNewLink({ ...newLink, "url": e.target.value })
                }} />
            <TextArea name="description" rows={3} placeholder="Link Description" value={newLink.description}
                onChange={(e) => {
                    setNewLink({ ...newLink, "description": e.target.value })
                }} />
            <Select name="type" style={{ width: "12rem" }} placeholder="Link Type" value={newLink.type}
                onChange={(e) => {
                    setNewLink({ ...newLink, "type": e.target.value })
                }}
            >
                <Option>Video</Option>
                <Option>URL Link</Option>
            </Select>
            <Button style={{ width: "10rem" }} onClick={saveUsefulLink}>Add Link</Button>
        </div> */}

        </Dialog>
    </>
}
export default AddLinkDialog;