import { MessageBox} from "@ui5/webcomponents-react";
import { LocalStorage } from "../Data/LocalStorage";
import { useUsefulLinkContext } from "../Data/ContextHandler/UsefulLinksContext";
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
const _myLocalStorageUtility = LocalStorage();
function MyMessageBox({ open, setOpenMessageBox, selectedData }) {
    const {fetchIntialUserLinks } =useUsefulLinkContext();
    const deleteLink = async (linkData) => {
        const linkId = linkData._id;
        if (linkId) {
            const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
            const _token = loggedInUser?.token || "";
            if (_token) {
                try {
                    const response = await fetch(baseURL + '/usefullinks/deletelink/' + linkId, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${_token}`
                        }
                    });
                    const result = await response.json();
                    console.log(result);
                    setOpenMessageBox(false);
                    fetchIntialUserLinks();
                } catch (e) {
                    console.log(e);
                    setOpenMessageBox(false);
                }
            }
        }
    }
    const handleClose = (event) => {
        if (event.detail.action === "OK") {
            // Trigger Delete 
            deleteLink(selectedData);
            console.log("Delete item", selectedData)

        } else {
            // do something on "Cancel" or "Abort" button click
            console.log("Delete item aborted", selectedData)
            setOpenMessageBox(false);
        }
    }
    return <>

        <MessageBox
            open={open}
            onAfterOpen={function _a() { }}
            onBeforeClose={function _a() { }}
            onBeforeOpen={function _a() { }}
            onClose={handleClose}
            type="Confirm"
        >
            Record will be permannently deleted
        </MessageBox>
    </>
}
export default MyMessageBox;