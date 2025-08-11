import { Table, TableRow, TableCell, Label, TableColumn, Button, TableGrowing, Panel, Toolbar, Title, ToolbarSpacer, Icon, Toast, FilterBar, FilterItem, FilterGroupItem, Input } from '@ui5/webcomponents-react';
import { useEffect, useRef, useState } from 'react';
import { RatingIndicator } from '@ui5/webcomponents-react';
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow";
import ProductDetailDialog from './ProductDetailDialog';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from "./Data/LocalStorage";
const _myLocalStorageUtility = LocalStorage();
const baseURL = process.env.REACT_APP_SERVER_URI;
function Products({ setEditRows }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [openState, setOpenState] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [maxRecord, setMaxRecord] = useState(100);
    const [filterQuery,setFilterQuery] = useState("");
    const [filters, setFilters] = useState({"Id":"",Title:"",Description:"",Rating:""});
    //  var maxRecord = 100;
    const navigate = useNavigate();
    const toast = useRef(null);
    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.open =true;
    };
    const onChangeFilter = (oEvent)=>{
        console.log(oEvent);
       };
    const fetchData = async(filterString, goClicked)=>{
       
        let url = `${baseURL}/products?skip=${skip}&limit=${limit}`;
        if(goClicked){
            url = `${baseURL}/products?skip=${0}&limit=${10}`;
           }
        if(filterString){
            url = url + filterString;
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.total) {
                setMaxRecord(data.total);
            }
            setProducts(data.products);
            setSkip(data.limit)
            setLimit(data.limit + 10);
        });
    };
    useEffect(() => {
        fetchData("",false);//Will be true when clicked Go
    }, []);
    const onLoadMore = async () => {
        //     const url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
        let url = `${baseURL}/products?skip=${skip}&limit=${limit}`;
        if(filterQuery){
            console.log("Filter will be found here", filterQuery);
            url = url + filterQuery;
        }

       
        if (skip >= maxRecord) {
            console.log("No more records");
            return;
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            const productList = data.products.map((product) => {
                const imagelist = product.images.map((image) => { return { url: image } });
                product.images = imagelist;
                // product.isSelected = false;
                return product;
            });
            setProducts([...products, ...productList]);
            setSkip(limit)
            setLimit(limit + 10);
        });

    }

    //setProducts(aaa);
    return (<div>
        <FilterBar
        id="FilterbarProducts"
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
        //   const signal = controller.signal;
        //   document.getElementById("scrollableDiv").scrollTop = 0;
  
        //   console.log(e);
           let filterString = "";
           Object.keys(filters).map((filterName) => {
            console.log(filterName, filters[filterName]);
            if(filters[filterName]){
                filterString += "&" + filterName + "=" + filters[filterName];
            }
           });
        
        //    e.detail.filters.map((filter) => {
        //      let filterName = filter.name.replace("Filter", "");
  
        //      if (filter.value) {
        //        filterString += "&" + filterName + "=" + filter.value;
        //      }
        //    });
           console.log(filterString);
           setFilterQuery(filterString);
           setSkip(0)
           setLimit(10);
           fetchData(filterString, true);
        
        //   filterQuery = filterString;
        //   loadInitialData(signal, true, filterString);
        }}
        onRestore={function _a() { }}
        onToggleFilters={function _a() { }}
  
      >
        <FilterGroupItem
          label="Id"
        >
  
          <Input name="idFilter" placeholder="Id" value="{filters.Id}" onChange="onChangeFilter"/>
        </FilterGroupItem>
        <FilterGroupItem label="Title">
  
          <Input name="titleFilter" placeholder="Title" value="{filters.Title}" onChange="onChangeFilter"/>
        </FilterGroupItem>
        <FilterGroupItem
          active
          label="Description"
        >
          <Input name="descriptionFilter" placeholder="Description"  value="{filters.Description}" onChange="onChangeFilter"/>
        </FilterGroupItem>
        <FilterGroupItem label="Rating">
  
          <Input name="ratingFilter" placeholder="Rating" value="{filters.Rating}" onChange="onChangeFilter"/>
        </FilterGroupItem>
      </FilterBar>

        <Panel
            style={{ maxWidth: "100%" }}

            header={<Toolbar><Title>Products</Title><ToolbarSpacer /><Button
                onClick={
                    function _EditClicked(e) {
                        if (selectedRows.length == 0) {
                            showToast("No Rows Selected to Edit");
                            return;
                        }
                        const editData = products.filter((product) => {
                            return selectedRows.includes(product.id.toString());
                        });
                        setEditRows(editData);


                        navigate("/editproducts");
                    }}>Edit</Button>

                <Button design="Negative"
                    onClick={
                        async function _RemoveClicked(e) {
                            if (selectedRows.length == 0) {
                                showToast("No Rows Selected to Delete");
                                return;
                            }
                            const removeData = products.filter((product) => {
                                return selectedRows.includes(product.id.toString());
                            });
                            const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
                            const _token = loggedInUser?.token || "";
                            const url = `${baseURL}/products/${removeData[0].id}`;
                            const response = await fetch(url, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                }
                            });
                            const result = await response.json();
                            console.log(result);
                            if (result.message === "Removed Successfully") {
                                const newData = products.filter((product) => {
                                    return product.id !== removeData[0].id
                                });
                                setProducts(newData);
                                setMaxRecord(maxRecord - 1);
                                showToast(result.message);

                            }

                            // setEditRows(editData);


                            // navigate("/editproducts");
                        }}

                >Remove</Button>
                <Button design="Emphasized"
                    onClick={
                        function _AddClicked(e) {
                            navigate("/addproduct");
                        }}>Add</Button>

                <Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}></Toast></Toolbar>}
            headerText="Panel"
            onToggle={function _a() { }}
        >
            <div className="sapScrollBar VerticalScrollbar-scrollbar-0-2-55" style={{ overflow: "scroll", height: "300px", overflowX: "hidden" }} >
                <Table
                    id="productTable"
                    mode="MultiSelect"
                    stickyColumnHeader="true"
                    onLoadMore={onLoadMore}
                    growing={TableGrowing.Scroll}
                    //  growing={TableGrowing.Button}
                    growingButtonText='More'

                    no-data-text="No Data"
                    columns={
                        <>
                            <TableColumn style={{ width: '2rem' }}><Label>Id</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Title"><Label>Title</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Description"><Label>Description</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Price"><Label>Price</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} ><Label>Rating</Label></TableColumn>
                            <TableColumn style={{ width: '2rem' }} ><Label></Label></TableColumn>
                        </>
                    }
                    onPopinChange={function _a() { }}
                    onRowClick={function _a() { }}
                    onSelectionChange={
                        function _a(e, detail) {
                            const selectedRows = e.detail.selectedRows
                            const selectedRowData = e.detail.selectedRows.map((row) => {
                                return row.id;
                            });
                            setSelectedRows(selectedRowData);
                            //  let selectedData = products.filter((product) => {
                            //      return product.isSelected
                            //  }
                            //  );
                        }
                    }
                >
                    {products.length > 0 && products.map((product) => {
                        return (
                            <TableRow key={product.id} id={product.id} >
                                <TableCell>
                                    <Label style={{ width: '2rem' }}>
                                        {product.id}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '8rem' }}>
                                        {product.title}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '15rem' }}>
                                        {product.description}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '8rem' }}>
                                        {product.price}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <RatingIndicator style={{ width: '10rem' }} value={product.rating} readonly="true" />
                                    {/* <Label style={{ width: '8rem' }}>
                            {product.rating}
                        </Label> */}
                                </TableCell>
                                <TableCell>

                                    <Icon interactive
                                        onClick={function _navigate(e) {
                                            setOpenState(true);
                                            setDialogData(product);
                                        }}
                                        name={navigationRightArrow}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </Table>
                <ProductDetailDialog openState={openState} data={dialogData} setOpenState={setOpenState}></ProductDetailDialog>
            </div>
        </Panel>
        </div>
    )
}
export default Products;