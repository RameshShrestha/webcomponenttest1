import { Bar, Form, Label, Input, TextArea, Icon, Title, Button, Text, FormItem, RatingIndicator, FormGroup, Page, Toast } from "@ui5/webcomponents-react";
import React, { useContext, useRef, useState } from "react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { render, createPortal } from 'react-dom';
import { EditProductContext } from "./ContextCreator";
import ImageList from "./ImageList";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "./Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();

//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
function EditProducts() {
  
    const navigate = useNavigate();
    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.open = true;
    };
    const { editRows } = useContext(EditProductContext);
    // console.log(EditProductContext);
    const [editData, setEditData] = useState(editRows);
    //  const data = editData[0];
    // console.log(editData);
    if (!editData || editData.length < 1) {
        return <><span>No Rows to Edit</span></>
    }
    const saveModifiedData = async () => {
        console.log("Saving the changes");
       // const baseURL = process.env.REACT_APP_SERVER_URI;
        const baseURL = "MyDataprovider";
        let modifiedIdList = "";
        for (let i = 0; i < editData.length; i++) {
            modifiedIdList = modifiedIdList + editData[i].id + ",";
        }
        try {
            const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
            const _token = loggedInUser?.token || "";
            const response = await fetch(baseURL + `/products/${modifiedIdList}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(editData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${_token}`
                }
            });
            const result = await response.json();
           // console.log(result);
            if (result.message === 'Updated Successfully') {
                showToast(result.message);
                navigate("/products");
            }
        } catch (error) {
            console.log('An error occurred while fetching products', error);
        }
    }
    const cancelEdit = () => {
        console.log("Cancel Edit");
            showToast("Cancel Edit");
            navigate("/products");
        
    }
    const updateFormData = (e, data) => {
        data[e.target.name] = e.target.value;
    }
    const AddImage = (e, modifieddata) => {
        //  data[e.target.name] =e.target.value;
        console.log("image to be added", modifieddata)
        modifieddata.images.push("");
        // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
        const finalData = editData.map((obj) => {
            if (obj.id === modifieddata.id) {
                return modifieddata;
            } else {
                return obj;
            }

        });
        console.log(finalData);
        setEditData(finalData);
    }
    const updateImage = (e, dataId, newImageData) => {
        //  console.log(e,dataId,newImageData);
        let updatedData = editData.filter((row) => { return row.id === dataId });
        updatedData[0].images = newImageData;

        const finalData = editData.map((obj) => {
            if (obj.id === updatedData[0].id) {
                return updatedData[0];
            } else {
                return obj;
            }
        });
        console.log(finalData);
        setEditData(finalData);
    }
    const removeImage = (e, dataId, imageToRemove) => {
        console.log(dataId, imageToRemove);
        const currentData = editData.filter((row) => { return row.id === dataId });
        console.log("image to be removed", currentData);
        currentData[0].images = currentData[0].images.filter((image) => {
            return image !== imageToRemove
        });
        const finalData = editData.map((obj) => {
            if (obj.id === currentData[0].id) {
                return currentData[0];
            } else {
                return obj;
            }

        });
        console.log(finalData);
        setEditData(finalData);
        //     const newImageData = ImageData.filter((image)=>{
        //      return image.url !== data.url
        //     });
        //     setImageData(newImageData);
    }

    return (
        <Page key="sadf"
            footer={<Bar design="FloatingFooter"
                endContent={<><Button onClick={(e) => {
                    console.log(editData);
                    saveModifiedData();
                }} design="Positive">Save</Button>

                    <Button design="Transparent" onClick={(e) => {
                        cancelEdit();
                    }}>Cancel</Button></>}
            />}
            header={<Bar > <Label>Edit Products </Label></Bar>}
            style={{
                height: '91vh'
            }}
        >
            {editData.length > 0 && editData.map((data) => {
                return (<div key={"sectionRow" + data.id}>
                    <Form key={data.id}
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
                            alignItems: 'center',
                            borderStyle: 'solid',
                            marginBottom: '5px',
                            marginTop: '2px',
                            borderColor: '#758b76',
                            borderRadius: '25px'
                        }}
                    >
                        <FormGroup>
                            <FormItem label="Id">
                                <Text>{data.id}</Text>
                            </FormItem>
                            <FormItem label="Title">
                                <Input value={data.title} name="title" onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                            <FormItem label="Description">
                                <TextArea value={data.description} name="description"
                                    onChange={(e) => { updateFormData(e, data); }}>
                                </TextArea>
                            </FormItem>
                            <FormItem label="Stock">
                                <Input value={data.stock} name="stock"
                                    onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                        </FormGroup>
                        <FormGroup>
                            <FormItem label="Price">
                                <Input value={data.price} name="price"
                                    onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                            <FormItem label="Discount ">
                                <Input value={data.discountPercentage} name="discountPercentage"
                                    onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                            <FormItem label="Brand">
                                <Input value={data.brand} name="brand"
                                    onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                            <FormItem label="Category">
                                <Input value={data.category} name="category"
                                    onChange={(e) => { updateFormData(e, data); }} />
                            </FormItem>
                            <FormItem label="Rating">
                                <RatingIndicator style={{ width: '10rem' }} name="rating"
                                    value={data.rating} onChange={(e) => { data.rating = e.target.value; }} />
                            </FormItem>

                        </FormGroup>
                        <FormGroup titleText="Images" >
                            <FormItem label="Thumbnail">
                                <div key={"Thumnail" + data.id} style={{ display: "inherit" }}>
                                    <Input style={{ width: '40rem' }} name="thumbnail"
                                        value={data.thumbnail} onChange={(e) => { updateFormData(e, data); }} />
                                    <img src={data.thumbnail} width="100px" height="100px" style={{ marginLeft: "20px" }} />
                                </div>
                            </FormItem>

                        </FormGroup>
                    </Form>
                    <Bar key={"Bar" + data.id}
                        endContent={
                            <Button icon="add" onClick={function _a(e) { AddImage(e, data); }}>Add</Button>

                        }
                        startContent={<span style={{ color: "#cba332", marginLeft: "5px", fontSize: "25px", fontWeight: "bold" }}>URLs :</span>}
                    >
                        <span>
                        </span>
                    </Bar>
                    <ImageList key={"Image" + data.id} images={data.images} dataId={data.id} removeImage={removeImage} updateImage={updateImage}></ImageList>
                </div>
                )
            })
            }
        </Page>)

}
export default EditProducts;