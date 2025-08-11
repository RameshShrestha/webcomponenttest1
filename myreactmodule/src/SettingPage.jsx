import { Bar, Button, CheckBox, Form, FormGroup, FormItem,  Label, Page, Toast } from "@ui5/webcomponents-react";
import StandardField from "./UserComponents/StandardField";
import { useState, useRef, useEffect } from "react";
import { useAuth } from './Data/ContextHandler/AuthContext';
import { render, createPortal } from 'react-dom';
import { LocalStorage } from "./Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
function SettingPage() {
    const { contextData } = useAuth();
    const { settingConfig, setSettingConfig } = contextData;
    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.open = true;
    };
    const loadUserSettings = async()=>{
        const _token = loggedInUser?.token || "";
        const response = await fetch(baseURL + '/settings', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${_token}`
          }
        });
        if(response.status < 300){
        const result = await response.json();
          console.log(result);
          setSettingConfig(result[0]);
      }else{
       
      }
      }
      useEffect(()=>{
            if(!settingConfig){ // direct refresh of the page it does not have settings
                loadUserSettings();
            }
      },[]);
    const localSettingData = {
        defaultLanguage: "En",
        theme: "sap_fiori_3",
        showNotification: true,
        showWeatherCard: true,
        showProductCard: true,
        showMyActivityCard: true,
        showStockPriceCard: true
    }
    const [settingData, setSettingData] = useState(settingConfig);
    const [settingDataOriginal, setSettingDataOriginal] = useState(settingConfig);
    const [editMode, setEditMode] = useState(false);
   // const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
    const triggerSaveData = async () => {
        const _token = loggedInUser?.token || "";
        const response = await fetch(baseURL + '/settings', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(settingData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }
        });
        if (response.status < 300) {
            const result = await response.json();
            console.log(result);
            setEditMode(false);
            showToast(result.message);
            setSettingConfig(result.data);
        } else {
            console.log(response);
        }
    }
    const onChangeValue = (e) => {
        if (e.target.tagName.toLowerCase().indexOf("checkbox") > -1) {
            console.log(e.target.name, e.target.checked)
            setSettingData({ ...settingData, [e.target.name]: e.target.checked });
        }
        else {
            console.log(e.target.name, e.target.value)
            setSettingData({ ...settingData, [e.target.name]: e.target.value });
        }
    };
    return <Page
        footer={editMode && (<Bar design="FloatingFooter" endContent={<><Button design="Positive"
            onClick={(e) => {
                triggerSaveData()
            }}>Save</Button>
            <Button design="Emphasized" onClick={(e) => {
                setSettingData({ ...settingDataOriginal });
            }}>Reset</Button>
            <Button design="Transparent" onClick={(e) => {
                setEditMode(false);
                setSettingData({ ...settingDataOriginal });
            }}>Cancel</Button></>}
        />)}
        header={!editMode && (<Bar endContent={<Button icon="edit" title="Edit" onClick={(e) => {
            setEditMode(true);
        }} />} ><Label>Settings</Label></Bar>)}
        style={{
            height: '90vh'
        }}
    >
        <div>
            {/* <h1>Setting Page </h1> */}
            <div>
                {/* <Button onClick={(e) => {
                    setEditMode(!editMode);
                }}>Toggle {editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button> */}
                <Form
                    backgroundDesign="Transparent"
                    columnsL={2}
                    columnsM={2}
                    columnsS={1}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={2}
                    labelSpanS={12}
                    labelSpanXL={4}
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FormGroup headerText="General">
                  
                      
                        <FormItem labelContent={<Label>Default Language</Label>}>
                            <StandardField editMode={editMode} value={settingData.defaultLanguage}
                                inputType="Select" selectOptions={["En", "De"]}
                                onChange={onChangeValue} name="defaultLanguage" />
                        </FormItem>
                        <FormItem labelContent={<Label>Theme</Label>}>
                            <StandardField editMode={editMode} value={settingData.theme}
                                inputType="Select" selectOptions={["" ,"sap_horizon","sap_horizon_dark", "sap_fiori_3", "sap_fiori_3_dark", "sap_belize"]}
                                onChange={onChangeValue} name="theme" />
                        </FormItem>
                        <FormItem labelContent={<Label>Show Notifications</Label>}>
                       
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue} name="showNotification"
                                checked={settingData.showNotification}
                            />
                        </FormItem>
                    </FormGroup>
                    <FormGroup headerText="Home Page">
                      
                        <FormItem labelContent={<Label>Show Weather Card</Label>}>
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue} name="showWeatherCard"
                                checked={settingData.showWeatherCard}
                            />
                        </FormItem>
                       
                        <FormItem labelContent={<Label>Show Product Card</Label>}>
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showProductCard"
                                checked={settingData.showProductCard}
                            />
                        </FormItem>
                      
                        <FormItem labelContent={<Label>Show MyActivity Card</Label>}>
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showMyActivityCard"
                                checked={settingData.showMyActivityCard}
                            />
                        </FormItem>
                     
                        <FormItem labelContent={<Label>Show Stock Price Card</Label>}>
                            <CheckBox
                                disabled={!editMode}
                                onChange={onChangeValue}
                                name="showStockPriceCard"
                                checked={settingData.showStockPriceCard}
                            />
                        </FormItem>
                    </FormGroup>
                </Form>
            </div>
        </div>
    </Page>
}
export default SettingPage;