import React, { createContext, useContext, useEffect, useReducer } from "react";

import { LocalStorage } from "../LocalStorage";
const _myLocalStorageUtility = LocalStorage();
//const baseURL = process.env.REACT_APP_SERVER_URI;
   const baseURL = "MyDataprovider"
export let UsefulLinksContext = createContext({
    contextData: {
        Links : {
            userLinks: [],
            commonLinks: []
        },
        addLink: async () => { },
        removeLink: async () => { },
        addInitialUserLinks: async () => { },
        fetchIntialCommonLinks: async () => { }
    }
});
export const useUsefulLinkContext = () => useContext(UsefulLinksContext);
const UsefulLinksReducer = (Links, action) => {
    switch (action.type) {
        case "AddLink":
            return [...Links.userLinks, action.payload];
        case "RemoveLink": {
            console.log("function to remove", action.payload);
            Links = Links.userLinks.filter((item) => {
                return item._id !== action.payload
            })
            return Links;
        }
        case "addInitialLinks": {
            //  console.log(action.payload);
         
            let newLinks = {...Links};
            newLinks.userLinks = [...action.payload]
            newLinks.commonLinks = Links.commonLinks;
            return newLinks;
        }
        case "addInitialCommonLinks": {
            let newLinks = {...Links};
            newLinks.userLinks = Links.userLinks;
            newLinks.commonLinks = [...action.payload]
            return newLinks;
          
        }
        default:
            return Links;
    }
};
export default function UsefulLinksContextProvider({ children }) {
    const [Links, dispatchLinks] = useReducer(UsefulLinksReducer, []);
    useEffect(() => {
      //  fetchIntialUserLinks();
     //   fetchIntialCommonLinks();
    }, []);
    const fetchIntialUserLinks = async () => {
        try {
            const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
            const _token = loggedInUser?.token || "";
            const _user = loggedInUser?.user || "";
            const response = await fetch(baseURL + '/usefullinks/' + _user, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${_token}`
                }
            });
            const result = await response.json();
            dispatchLinks({
                type: "addInitialLinks",
                payload: [...result.links]
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetchIntialCommonLinks = async () => {
        try {
            const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
            const _token = loggedInUser?.token || "";
            // const response = await fetch(baseURL + '/usefullinks/common', {
            //     method: 'GET',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${_token}`
            //     }
            // });
             const response = await fetch(baseURL + '/usefullinks/common', {
                method: 'GET'
            });
            const result = await response.json();
            dispatchLinks({
                type: "addInitialCommonLinks",
                payload: [...result.links]
            })
        } catch (error) {
            console.log(error);
        }
    }
    const addLink = async (newLink) => {
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
                //setOpenState(false);
            } catch (e) {
                console.log(e);
            }
        }
    }
    
    const removeLink = async (linkId) => {
    
        const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
        const _token = loggedInUser?.token || "";
        if (_token && linkId) {
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
               // setOpenMessageBox(false);
            } catch (e) {
                console.log(e);
              //  setOpenMessageBox(false);
            }
        }
    }
   
    const values = {
        Links,
        addLink,
        removeLink,
        fetchIntialUserLinks,
        fetchIntialCommonLinks,
    };

    return (
        <>
            <UsefulLinksContext.Provider value={values}>
                {children}
            </UsefulLinksContext.Provider>
        </>
    );
}