import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";


export let UsersContext = createContext({
  usersData :[],
  addUser :()=>{},
  removeUser : ()=>{},
  updateUser :()=>{},
  addInitialUsers :()=>{}
});

export default function UserContextProvider({ children }) {

  const [usersData, dispatchUser] = useReducer(reducer, initialState);

  const addInitialUsers = (initialUsers)=>{
   // console.log(initialUsers);
    dispatchUser({
      type :"ADD_INITAL_USERS",
      payload :[...initialUsers]
    })
   } 
   const addUser = (newUser)=>{
    dispatchUser({
      type :"ADD_USER",
      payload :{newUser}
    })
   } 
   const removeUser = (removeUserId)=>{
    dispatchUser({
      type :"REMOVE_USER",
      payload :{removeUserId}
    })
   } 
   const updateUser = (updatedUser)=>{
    dispatchUser({
      type :"UPDATE_USER",
      payload :{updatedUser}
    })
   } 

  const values = {
    usersData,
    dispatchUser,
    addInitialUsers,
    addUser,
    removeUser,
    updateUser
  };

  return (
    <>
      <UsersContext.Provider value={values}>
        {children}
      </UsersContext.Provider>
    </>
  );
}