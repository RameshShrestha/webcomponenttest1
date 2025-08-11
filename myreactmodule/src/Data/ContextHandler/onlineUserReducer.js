import { ADD_USER ,REMOVE_USER} from "./constant";
export const initialState = {
  users: []
};

const onlineUserReducer = (usersList, action) => {
  switch (action.type) {
    case ADD_USER:
      let user = usersList.users.filter((user)=> user.name === action.payload.name);
          if(user.length === 0){
            return{
            users: [...usersList.users, action.payload]
          }
        }else{
          return{
            users: [...usersList.users]
          }
        }
    
    case REMOVE_USER:{
      usersList.users = usersList.users.filter((item)=>{
            return item.name !==action.payload.name
        })
        return {
        users:[...usersList.users]
        };
    }
    case "ADD_INITAL_USERS" : {
    //  console.log(action.payload);
      return{
        users : action.payload
      }
    }
    case "UPDATE_USER" : {
    //  console.log("User found",action.payload);
      let newUserList = usersList.users.map((user)=> {
        if(user.name === action.payload.user.name){
          user.status = action.payload.user.status;
          
        }
        return user;
        });
    
    //  console.log("updatedUserlist", newUserList)
      return{
        users:[...newUserList]
      }
    }
    default:
      return usersList;
  }
};

export default onlineUserReducer;