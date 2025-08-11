import { Icon, Button } from "@ui5/webcomponents-react";

function MyNotificationItem({ data, removeNotification }) {
    let colorName = "";
    let iconName = "information";
    switch (data?.type) {
        case "Success":
            colorName = "green";
            iconName = "accept";
            break;
        case "Error":
            colorName = "red";
            iconName = "high-priority";
            break;
        case "Warning":
            colorName = "#9d9d22";
            iconName = "alert";
            break;
        case "Info":
            colorName = "blue";
            iconName = "information";
            break;
    }
    //  console.log("colorName", colorName)

    return <>
        <div className="notificationItem" style={{ background: colorName }}>

            <div style={{ flexGrow: 1 }}><Icon name={iconName} /></div>
            <div style={{ flexGrow: 10, color: "white" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {data.title}
                </div>
                <div style={{ fontSize: "12px" }}>
                    {data.message}
                </div>
                <div>
                    From : {data.from_user}
                </div>
            </div>
            <div style={{ flexGrow: 1 }}>
                {data.to_user !== 'AllUsers' &&
                    <Icon name="decline" interactive onClick={() => {
                        console.log("remove Notificaiton", data.id);
                        removeNotification(data.id);
                    }} />
                }

            </div>


        </div>
    </>
}
export default MyNotificationItem;