function OnlineStatusIcon({status,width, height,showText}){
    let color = "red";
    if(status.toLowerCase() ==="online"){
        color = "green";
    }else if (status.toLowerCase() ==="offline"){
        color = "grey";
    }else if(status === "Away"){
        color = "#caae26";
    }
        return <>
        <div style={{display:"flex",alignItems:"center",width:"70%"}}> 
        <svg width={`${width}`} height={`${height}`} style={{marginRight:"5px"}}>
    <circle cx="10" cy="10" r="7"
    fill={`${color}`} />
   
        </svg>
        {showText && <span color={`${color}`}>{status}</span>}
        
        </div>
        </>

}
export default OnlineStatusIcon;