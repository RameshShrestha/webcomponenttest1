import { Bar, Button, Dialog, Icon, Title } from "@ui5/webcomponents-react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
function ImageListMainPage() {
    const [images, setImages] = useState([]);
    const [imagePage, setImagePage] = useState(1);
    const [imageLimit] = useState(10);
    const [imageTotal] = useState(1000);
    const[allDataLoaded,setAllDataLoaded]= useState(true);
    const dialogRef = useRef(null);

    const [dialogImage, setDialogImage] = useState({
        id: "",
        author: "",
        download_url: ""
    });
    const imageURL = "https://picsum.photos/v2/list?";
    const confirmServer = async()=>{
        const baseURL = "MyDataprovider"; //process.env.REACT_APP_SERVER_URI;
        try {
            await fetch(`${baseURL}/images`);
        } catch (e) {
            console.log(e);
        }
    }
    const fetchImages = async () => {
  
        try {
            const response = await fetch(`${imageURL}page=1&limit=20`);
            const data = await response.json();
            setImages(data);
            setImagePage(imagePage+1);
            setAllDataLoaded(false);
        } catch (e) {
            console.log(e);
        }
    }
    const loadMoreData =  () => {
        console.log("loading more data", imagePage , imageLimit);
        if(imagePage * imageLimit < imageTotal){
       // const url = `https://dummyjson.com/users?skip=${userSkip}&limit=${userLimit}`;
       // const imageURL = "https://picsum.photos/v2/list?page=1&limit=10";
        let url = `${imageURL}page=${imagePage}&limit=${imageLimit}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if(imagePage * (imageLimit + 1) > imageTotal){
                console.log("All Data loaded");
                setAllDataLoaded(true);
            }else{
                console.log("All Data not yet loaded");
                setAllDataLoaded(false);
                setImagePage(imagePage+1);
            }
         
            setImages([...images, ...data]);
          })
        }
      } ;

    useEffect(() => {
        fetchImages();
        confirmServer();
    }, []);
    {/*<div style={{ background: "#85b3ae" }}>

         <h1 style={{ color: "white", background: "limegreen", marginTop: "0px" }}>Images from <a href="https://picsum.photos/v2/list">https://picsum.photos/v2/list</a></h1>

        <div style={{ display: "flex", gap: "1rem", margin: "10px", flexWrap: "wrap" }}>
            {images.length > 0 &&
                images.map((imageData) => {
                    return <div style={{ position: "relative" }}>
                        <div key={imageData.id} onClick={(e) => {
                            console.log(imageData.id);
                            setDialogImage(imageData);
                            dialogRef.current.show();

                        }}>
                            <img src={imageData.download_url + ".webp"} alt="Image" height={"200px"} width={"200px"} />
                        </div>
                        <div style={{ position: "absolute", bottom: "8px", left: "16px", color: "white" }}> By : {imageData.author}</div>
                    </div>
                })
            }
        </div> */}
    return <div style={{ background: "#85b3ae" }}>
        <div id="scrollableDiv" style={{ height: "83vh", overflow: "auto" }} className="sapScrollBar">
            <h1 style={{ color: "white", background: "limegreen", marginTop: "0px" }}>Images from <a href="https://picsum.photos/v2/list">https://picsum.photos/v2/list</a></h1>

            <InfiniteScroll style={{ display: "flex", flexWrap: "wrap", background: 'var(--sapShellColor)', gap:"1rem",margin:"10px" }}
                dataLength={images.length} //This is important field to render the next data
                next={loadMoreData}
                hasMore={!allDataLoaded}

                loader={<h4 style={{ width: "100%", textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <p className="userloadedMsg" style={{ textAlign: 'center', width: "100%" }}>
                        <b>All  Images Loaded</b>
                    </p>
                }
                scrollableTarget="scrollableDiv"

            >
                {images.length > 0 &&
                    images.map((imageData) => {
                        return <div key={imageData.id} style={{ position: "relative" }}>
                            <div  onClick={(e) => {
                                console.log(imageData.id);
                                setDialogImage(imageData);
                                dialogRef.current.open=true;

                            }}>
                                <img src={imageData.download_url + ".webp"} alt="Image" height={"250px"} width={"250px"} />
                            </div>
                            <div style={{ position: "absolute", bottom: "8px", left: "16px", color: "white",background:"#00000070" }}> By : {imageData.author}</div>
                        </div>
                    })
                }
            </InfiniteScroll>
            <Dialog ref={dialogRef} className="imageDialog" style={{height:"95vh" ,width:"95%"}} >
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: "8px", right: "16px", color: "white" ,background:"#00000070"}}
                    onClick={(e) => {
                        dialogRef.current.open = false;
                    }}><Icon name="decline" /></div>
                <div> <img style={{ maxHeight: "93vh" }} src={dialogImage.download_url} alt="Image" height={"100%"} width={"100%"} /> </div>
                <div style={{ position: "absolute", bottom: "8px", left: "16px", color: "white",background:"#00000070"}}> By : {dialogImage.author}</div>
            </div>
        </Dialog>
        </div>


      

    </div>
}
export default ImageListMainPage;