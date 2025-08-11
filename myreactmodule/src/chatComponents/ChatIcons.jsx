function ChatIcons({name,fill,height,width}){
  //  console.log(name,fill,height,width);
    if (!fill){
        fill="none";
    }
    let svgIcon = "";
    if(name =="PaperClip"){
        svgIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={`${fill}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
      </svg>
      
    }else if(name ==="PaperPlane"){
        svgIcon =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    }
return <>
<div style={{height:height,width:width, marginRight:"5px"}}>
{svgIcon}
</div>
</>
}
export default ChatIcons;

