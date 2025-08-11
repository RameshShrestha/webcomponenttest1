import { Button,  TextArea } from "@ui5/webcomponents-react";
//import { useEffect, useState ,useContext} from "react";

function ImageList({ images, dataId , removeImage,updateImage}) {
    console.log(images,dataId);
  //  const data = { "products": [{ "id": 1, "title": "iPhone 9", "description": "An apple mobile which is nothing like apple", "price": 549, "discountPercentage": 12.96, "rating": 4.69, "stock": 94, "brand": "Apple", "category": "smartphones", "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg", "images": ["https://i.dummyjson.com/data/products/1/1.jpg", "https://i.dummyjson.com/data/products/1/2.jpg", "https://i.dummyjson.com/data/products/1/3.jpg", "https://i.dummyjson.com/data/products/1/4.jpg", "https://i.dummyjson.com/data/products/1/thumbnail.jpg"] }, { "id": 2, "title": "iPhone X", "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...", "price": 899, "discountPercentage": 17.94, "rating": 4.44, "stock": 34, "brand": "Apple", "category": "smartphones", "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg", "images": ["https://i.dummyjson.com/data/products/2/1.jpg", "https://i.dummyjson.com/data/products/2/2.jpg", "https://i.dummyjson.com/data/products/2/3.jpg", "https://i.dummyjson.com/data/products/2/thumbnail.jpg"] }] };
    const ImageData = images;
    //const [ImageData, setImageData] = useState(images);
    // const removeImage = (e,data) =>{
    //     const newImageData = ImageData.filter((image)=>{
    //      return image.url !== data.url
    //     });
    //     setImageData(newImageData);
    //  }
    // useEffect(() => {
    //     setImageData(ImageData);
    // }, [ImageData]);
    return <>
        {ImageData &&
            ImageData.map((image, index) =>
            // border-color: #776e6e;
            // border-radius: 20px;
            // margin: 5px;
            (
                <div key={index} className="flex-container" style={{
                    "display": "flex", alignItems: "stretch", margin: "5px"
                }}
                >

                    <div key = {"Text" + dataId + "" + index}  style={{ flexGrow: 10, margin: "5px" }}>
                        {/* <Text  style={{ color :"#cba332", marginLeft: "5px" ,fontSize:"25px" , fontWeight:"bold"}}>URL : </Text> */}
                        <TextArea key={index} value={image} rows={2} onChange={(e) => {
                            const newURL = e.target.value;
                            const newImageData = ImageData;
                            newImageData[index] = newURL ;
                            console.log(newImageData);
                           // updateImage(newImageData)
                            updateImage(e,dataId,newImageData);
                            console.log(e,dataId,newImageData);
                          //  setImageData(newImageData);
                            document.getElementById("img" + dataId + "" + index).src = e.target.value
                        }}></TextArea>
                        <Button icon="decline" onClick={function _a(e) {removeImage(e,dataId,image) }}>Remove</Button>
                    </div>
                    <div key = {"Divimg" + dataId + "" + index} style={{ flexGrow: 1, margin: "5px" }}>
                        <img id={"img" + dataId + "" + index} src={image} alt="not available"
                        style={{
                        height: "100px", "width": "100px", marginTop: "4px",
                        borderRadius: "15px"
                    }}></img></div>
                </div>
            )
            )
        }
    </>;
}
export default ImageList;