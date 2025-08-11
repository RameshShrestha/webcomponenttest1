import { Bar, Form, Label, Input, TextArea, Button, Text, FormItem, RatingIndicator, FormGroup, Page, Toast } from "@ui5/webcomponents-react";
import React, { useRef, useState } from "react";
import "@ui5/webcomponents/dist/features/InputSuggestions";
//import { EditProductContext } from "./ContextCreator";
import ImageList from "../ImageList";
import { useNavigate } from "react-router-dom";
import { render, createPortal } from 'react-dom';
import ReactDOM from "react";
import { LocalStorage } from "../Data/LocalStorage";
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
const _myLocalStorageUtility = LocalStorage();
function NewProduct() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const showToast = (message) => {
        const modalRoot = document.getElementById('root');
        render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
        toast.current.open = true;
    };
    const [data, setData] = useState({
        "id": "new",
        "title": "",
        "description": "",
        "price": 0,
        "discountPercentage": 0,
        "rating": 0,
        "stock": 0,
        "brand": "",
        "category": "",
        "thumbnail": "",
        "images": [""]
    });
    //  const data = editData[0];
    // console.log(editData);
    // if (!editData || editData.length < 1) {
    //     return <><span>No Rows to Edit</span></>
    // }

    const updateFormData = (e) => {
        data[e.target.name] = e.target.value;
    }
    const AddImage = (e) => {
        //  const modifieddata = data;
        let modifieddata = Object.assign({}, data);
        modifieddata.images.push({ url: "" });

        console.log("image to be added", modifieddata)
        setData(modifieddata);

    }
    const updateImage = (e, dataId, newImageData) => {
        //  const newData = data;
        let newData = Object.assign({}, data);
        console.log(e, dataId, newImageData);

        const updatedImages = newData.images.map((image) => {
            if (image.url === newImageData.url) {
                return newImageData;
            } else {
                return image;
            }
        });
        newData.images = updatedImages;
        setData(newData);
    }
    const removeImage = (e, dataId, imageToRemove) => {
        console.log(dataId, imageToRemove);
        let newData = Object.assign({}, data);
        newData.images = newData.images.filter((image) => {
            return image.url !== imageToRemove
        });
        setData(newData);

    }

    return (
        <Page key="newProduct"
            footer={<Bar design="FloatingFooter"
                endContent={<>
                    <Button onClick={async (e) => {
                          const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
                          const _token = loggedInUser?.token || "";
                        const response = await fetch(`${baseURL}/products`, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${_token}`
                            }
                        });
                        const result = await response.json();
                        if (result.message === 'Added Successfully') {
                            showToast(result.message);
                            navigate("/products");
                        }

                    }} design="Positive">Save</Button>
                    <Button design="Transparent" onClick={(e) => {
                        showToast("Cancelled");
                        navigate("/products");
                    }}>Cancel</Button></>}
            />}
            header={<Bar > <Label>New Products </Label></Bar>}
            style={{
                height: '91vh'
            }}
        >

            <div key={"sectionRow" + data.id}>
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
                        <FormItem  labelContent={<Label>Id</Label>}>
                            <Text>{data.id}</Text>
                        </FormItem>
                        <FormItem  labelContent={<Label>Title</Label>}>
                            <Input value={data.title} name="title" onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                        <FormItem  labelContent={<Label>Description</Label>}>
                            <TextArea value={data.description} name="description"
                                onChange={(e) => { updateFormData(e); }}>
                            </TextArea>
                        </FormItem>
                        <FormItem  labelContent={<Label>Stock</Label>}>
                            <Input value={data.stock} name="stock"
                                onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                    </FormGroup>
                    <FormGroup>
                        <FormItem  labelContent={<Label>Price</Label>}>
                            <Input value={data.price} name="price"
                                onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                        <FormItem  labelContent={<Label>Discount</Label>}>
                            <Input value={data.discountPercentage} name="discountPercentage"
                                onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                        <FormItem  labelContent={<Label>Brand</Label>}>
                            <Input value={data.brand} name="brand"
                                onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                        <FormItem labelContent={<Label>Category</Label>}>
                            <Input value={data.category} name="category"
                                onChange={(e) => { updateFormData(e); }} />
                        </FormItem>
                        <FormItem  labelContent={<Label>Rating</Label>}>
                            <RatingIndicator style={{ width: '10rem' }} name="rating"
                                value={data.rating} onChange={(e) => {
                                    data.rating = e.target.value;
                                }} />
                        </FormItem>

                    </FormGroup>
                    <FormGroup headerText="Images" >
                        <FormItem  labelContent={<Label>Thumbnail</Label>}>
                            <div key={"Thumnail" + data.id} style={{ display: "inherit" }}>
                                <Input style={{ width: '40rem' }} name="thumbnail"
                                    value={data.thumbnail}
                                    onChange={(e) => {
                                        document.getElementById("thumbnailImg").src = e.target.value;
                                        updateFormData(e);
                                    }} />
                                <img id="thumbnailImg" src={data.thumbnail} alt="Thumbnail" width="100px" height="100px" style={{ marginLeft: "20px" }} />
                            </div>
                        </FormItem>
                    </FormGroup>
                </Form>
                <Bar key={"Bar" + data.id}
                    endContent={
                        <Button icon="add" onClick={function _a(e) { AddImage(e); }}>Add</Button>
                    }
                    startContent={<span style={{ color: "#cba332", marginLeft: "5px", fontSize: "25px", fontWeight: "bold" }}>Images :</span>}
                >
                    <span></span>
                </Bar>
                <ImageList key={"Image" + data.id} images={data.images} dataId={data.id} removeImage={removeImage} updateImage={updateImage}></ImageList>
            </div>

        </Page>)
}
export default NewProduct;