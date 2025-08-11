import { Button, FilterBar, FilterGroupItem, Input, Title, Bar, Toast } from "@ui5/webcomponents-react";
import Usercard from "./Usercard";
//import UsersData from './usersData.json';
import { useContext, useEffect, useRef, useState } from "react";
import { UsersContext } from './Data/ContextHandler/UsersContext';
import { useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { render, createPortal } from 'react-dom';
import { LocalStorage } from "./Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
//const baseURL = process.env.REACT_APP_SERVER_URI;
const baseURL = "MyDataprovider";
function UserContainer() {
  const { usersData, addInitialUsers } = useContext(UsersContext);
  const [fetching, setFetching] = useState(true);
  const [userSkip, setUserSkip] = useState(0);
  const [userLimit, setUserLimit] = useState(10);
  const [userTotal, setUserTotal] = useState(50);
  const [allDataLoaded, setAllDataLoaded] = useState(true);
  const [filters, setFilters] = useState({"firstName":"",lastName:"",UserId:"",Age:""});
 
  let filterQuery = "";
 // console.log(usersData);
  const controller = new AbortController();

  const navigate = useNavigate();
  const toast = useRef(null);
  const showToast = (message) => {
    const modalRoot = document.getElementById('root');
   // const root = createRoot(document.getElementById("root"));
    render(createPortal(<Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}>{message}</Toast>, modalRoot), document.createElement("div"));
    toast.current.open = true;
  };
  const loadInitialData = (signal, bFromGo, filterString) => {
    //    const url = `https://dummyjson.com/users?skip=${userSkip}&limit=${userLimit}`;
    let url = `${baseURL}/realusers?skip=${bFromGo ? 0 : userSkip}&limit=${userLimit}`;
    if (filterString) {
      url = url + filterString;
    }
   // console.log(signal);
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    setFetching(true);
    //  credentials: 'include',
    fetch(url, { signal, 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      },
      credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
       // console.log(data);
        addInitialUsers(data.users);
        setUserTotal(data.total);
        setFetching(false);
        if (data.total > data.limit) {
          if (bFromGo) {
            setUserSkip(10);
          } else {
            setUserSkip(userSkip + 10);
          }

          setAllDataLoaded(false);
        } else {
          setAllDataLoaded(true);
        }
      })

  };
 const onChangeFilter = (oEvent)=>{
  //console.log(oEvent);
  let filterName = oEvent.currentTarget.name;
  let newFilter = {"firstName":"",lastName:"",UserId:"",Age:""};
 
  if(filterName.indexOf("firstName") > -1){
      newFilter.firstName = oEvent.currentTarget.value;
  }
  if(filterName.indexOf("lastName") > -1){
      newFilter.lastName = oEvent.currentTarget.value;
  }
  if(filterName.indexOf("UserId") > -1){
      newFilter.UserId = oEvent.currentTarget.value;
  }
  if(filterName.indexOf("Age") > -1){
    newFilter.Age = oEvent.currentTarget.value;
}
setFilters(newFilter);
 };
  const loadMoreData = (signal) => {
  //  console.log("load more data");
    if (userSkip <= userTotal) {
      // const url = `https://dummyjson.com/users?skip=${userSkip}&limit=${userLimit}`;
      let url = `${baseURL}/realusers?skip=${userSkip}&limit=${userLimit}`;

      if (filterQuery) {
        url = url + filterQuery;
      }
      setFetching(true);
      const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
      const _token = loggedInUser?.token || "";
      fetch(url, { signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      },
         credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          if (data.total >= (data.skip + 10)) {
            setAllDataLoaded(false);
            setUserSkip(userSkip + 10);
            // setFetching(false);
            setUserTotal(data.total);
            //  setUserLimit(userLimit + 10);
           // console.log("All data not loaded");
          } else {
            setAllDataLoaded(true);
           // console.log("All data  loaded");
          }
          setFetching(false);
          addInitialUsers([...usersData.users, ...data.users]);
        })
    }
  };
  const deleteUser = async (userId) => {
    const signal = controller.signal;
    const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
    const _token = loggedInUser?.token || "";
    const url = `${baseURL}/realusers/${userId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      },
      credentials: 'include'
    });
    const result = await response.json();
    if (result.message === 'Removed Successfully') {
        showToast(result.message);
      // navigate("/products");
      const usersCopy = [...usersData.users];
      // usersCopy.findIndex()
      const userIndex = usersCopy.findIndex(user => user.id === userId);
      if (userIndex > -1) {
        usersCopy.splice(userIndex, 1);
      }
      addInitialUsers([...usersCopy]);
      showToast("User " + userId + " : " + result.message);
      _myLocalStorageUtility.removeServerStatus();
      loadInitialData(signal, true, filterQuery);
    }
  }

  useEffect(() => {
    const signal = controller.signal;
    loadInitialData(signal, false, "");
    return () => {
     // console.log("Cleaning Use Effect after destruction");
      controller.abort();
    }

  }, [])
  return <>
    <FilterBar
      id="Filterbar"
      showGoOnFB="true"
      filterContainerWidth="12.125rem"

      onAfterFiltersDialogOpen={function _a() { }}
      onClear={function _a() { }}
      onFiltersDialogCancel={function _a() { }}
      onFiltersDialogClose={function _a() { }}
      onFiltersDialogOpen={function _a() { }}
      onFiltersDialogSave={function _a() { }}
      onFiltersDialogSearch={function _a() { }}
      onFiltersDialogSelectionChange={function _a() { }}
      onGo={function _a(e) {
        const signal = controller.signal;
        document.getElementById("scrollableDiv").scrollTop = 0;

       // console.log(e);
        let filterString = "";
        // e.detail.filters.map((filter) => {
        //   let filterName = filter.name.replace("Filter", "");

        //   if (filter.value) {
        //     filterString += "&" + filterName + "=" + filter.value;
        //   }
        // });
        Object.keys(filters).map((filterName) => {
          // console.log(filterName, filters[filterName]);
           if(filters[filterName]){
               filterString += "&" + filterName + "=" + filters[filterName];
           }
          });
       // console.log(filterString);
        filterQuery = filterString;
        loadInitialData(signal, true, filterString);
      }}
      onRestore={function _a() { }}
      onToggleFilters={function _a() { }}

    >
      <FilterGroupItem
        label="First Name"
      >

        <Input name="firstNameFilter" placeholder="First Name" value={filters.firstName} onChange={onChangeFilter}/>
      </FilterGroupItem>
      <FilterGroupItem label="Last Name">

        <Input name="lastNameFilter" placeholder="Last Name" value={filters.lastName} onChange={onChangeFilter}/>
      </FilterGroupItem>
      <FilterGroupItem
        active
        label="User Id"
      >
        <Input name="userIdFilter" placeholder="User Id" value={filters.UserId} onChange={onChangeFilter}/>
      </FilterGroupItem>
      <FilterGroupItem label="Age">

        <Input name="ageFilter" placeholder="Age" value={filters.Age} onChange={onChangeFilter}/>
      </FilterGroupItem>

      {/* <FilterGroupItem
    label="Sex"
  >
    {}
    <ComboBox
  
  onChange={function _a(){}}
  onInput={function _a(){}}
  onSelectionChange={function _a(){}}
>
  <ComboBoxItem text="Male" />
  <ComboBoxItem text="Female" />
</ComboBox>
  </FilterGroupItem> */}



      {/* <FilterGroupItem
    groupName="Group 2"
    label="Date of Birth"
  >
    <DateRangePicker
      style={{
        minWidth: 'auto'
      }}
     />
  </FilterGroupItem> */}
    </FilterBar>

    <Bar
      endContent={<><Button design="Transparent" icon="add" onClick={() => {
        navigate(`/users/new`, { state: { id: "new" } });
      }} /></>}
      startContent={<> <Title>Users</Title></>}
    >
    </Bar>
    {/* <div style={{ display: "flex", flexWrap: "wrap", background: 'var(--sapShellColor)' }}>

      {!fetching && usersData.users.map((user) => { return <Usercard key={"card " + user.id} user={user} />; })
      }

    </div> */}
    <div id="scrollableDiv" style={{ overflow: "auto" ,height:"58vh"}}>


      <InfiniteScroll style={{ display: "flex", flexWrap: "wrap", background: 'var(--sapShellColor)' }}
        dataLength={userTotal} //This is important field to render the next data
        next={loadMoreData}
        hasMore={!allDataLoaded}

        loader={<h4 style={{ width: "100%", textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p className="userloadedMsg" style={{ textAlign: 'center', width: "100%" }}>
            <b>All {usersData.users.length} Users Loaded</b>
          </p>
        }
        scrollableTarget="scrollableDiv"

      >
        {usersData?.users.map((user) => { return <Usercard key={user._id} user={user} deleteUser={deleteUser} />; })
        }
      </InfiniteScroll>
    </div>

  </>
}
export default UserContainer;