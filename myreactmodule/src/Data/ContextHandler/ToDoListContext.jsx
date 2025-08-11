import React, { createContext, useContext, useEffect, useReducer } from "react";

import { LocalStorage } from "../LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
export let ToDoListContext = createContext({
  contextData: {
    todoList: [],
    addToDo: async () => { },
    removeToDo: async () => { },
    updateToDo: async () => { }
  }
});
export const useToDoContext = () => useContext(ToDoListContext);
const ToDoListReducer = (todoList, action) => {
  switch (action.type) {
    case "AddToDo":
      return [...todoList, action.payload];
    case "RemoveToDo": {
      console.log("function to remove",action.payload);
      todoList = todoList.filter((item) => {
        return item._id !== action.payload
      })
      return todoList;
    }
    case "addInitialTodoList": {
      //  console.log(action.payload);
      return [...action.payload];
    }
    case "UpdateToDo": {
        console.log("User found",action.payload);
      let newToDoList = todoList.map((todo) => {
        if (todo._id === action.payload._id) {
          return action.payload;//updated todo
        } else {
          return todo; // old todo
        }
      });

      //  console.log("updatedUserlist", newUserList)
      return [...newToDoList];
    }
    default:
      return [...todoList];
  }
};

export default function ToDoListContextProvider({ children }) {
  const [todoList, dispatchTodo] = useReducer(ToDoListReducer, []);
  const addToDo = async (newToDoItem) => {
    console.log("Item to be created", newToDoItem);
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    try {
      const response = await fetch(baseURL + '/todolist/addTodoList', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newToDoItem),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      console.log("returning", result);
      dispatchTodo({
        type: "AddToDo",
        payload: result.item
      });
      return result;
    } catch (error) {
      console.log("Error", error);
      return error;
    }




  }
  const removeToDo = async(todoItemId) => {
    console.log("deleting ", todoItemId);
    const _token = loggedInUser?.token || "";
    try {

      const response = await fetch(baseURL + `/todolist/removeItem/${todoItemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
     // const result = await response.json();
      dispatchTodo({
        type: "RemoveToDo",
        payload: todoItemId
      })
    
    } catch (error) {
      console.log(error);
    }

   
  }
  const updateToDo = async(updatedToDoItem) => {
    console.log("Updating ", updatedToDoItem);

    try {
      const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
      const _token = loggedInUser?.token || "";
      const response = await fetch(baseURL + `/todolist/updateItem/${updatedToDoItem._id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(updatedToDoItem),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      dispatchTodo({
        type: "UpdateToDo",
        payload: updatedToDoItem
      })
    
    } catch (error) {
      console.log(error);
    }



    
  }
  const initialToDoList = (initialTodolist) => {
    dispatchTodo({
      type: "addInitialTodoList",
      payload: [...initialTodolist]
    })
  }
  const fetchIntialToDolist = async () => {
   // const baseURL = process.env.REACT_APP_SERVER_URI;
    const baseURL = "MyDataprovider";
    try {
      const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
      const _token = loggedInUser?.token || "";
      const response = await fetch(baseURL + '/todolist/getList', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_token}`
        }
      });
      const result = await response.json();
      initialToDoList(result.todoList);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchIntialToDolist();
  }, []);
  const values = {
    todoList,
    addToDo,
    removeToDo,
    updateToDo,

  };

  return (
    <>
      <ToDoListContext.Provider value={values}>
        {children}
      </ToDoListContext.Provider>
    </>
  );
}