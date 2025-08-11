import { ADD_USER ,REMOVE_USER} from "./constant";
export const initialState = {
  users: []
};

const reducer = (usersList, action) => {

  switch (action.type) {
    case ADD_USER:
     
      return {
        users: [...usersList.users, action.payload]
      };
    case REMOVE_USER:{
      usersList.users = usersList.users.filter((item)=>{
            return item.id !==action.payload.id
        })
        return {
        users:[...usersList.users]
        };
    }
    case "ADD_INITAL_USERS" : {
      return{
        users : action.payload
      }
    }
    case "UPDATE_USER" : {
      return{
        users : action.payload
      }
    }
    default:
      return usersList;
  }
};

export default reducer;