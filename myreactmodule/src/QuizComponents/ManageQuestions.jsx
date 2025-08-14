import { Button,Icon, TextArea, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Toast } from '@ui5/webcomponents-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getDumpQuestions, removeDumpQuestion } from "../api/QuizApi";


function ManageQuestions() {
    const toast = useRef(null);
    const navigate = useNavigate();
    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.open = true;


    }
    const EditItem = async (oEvent)=>{
        let id = oEvent.currentTarget.dataset.link_id;
        console.log(id); 
      //  navigate("/displayquestion/"+ id);
        navigate(`/displayquestion/${id}`, { state: { questionId: id ,mode:"Edit"} });
    }
    const DeleteItem = async (oEvent) => {
        // let id = "23";//fetch selected item id
        let id = oEvent.currentTarget.dataset.link_id;
        console.log(oEvent);
        let result = await removeDumpQuestion(id);
        if (result.message === "Deleted Successfully") {
            showToast(result.message);
        }
        fetchData();
    };
    const fetchData = async () => {
        let response = await getDumpQuestions();
        if (response.dumpQuestions) {
            setQuestionSet(response.dumpQuestions);
        }
    };
    const [questionSet, setQuestionSet] = useState([]);
    useEffect(() => {

        fetchData();
    }, []);
    return (<>
        <Button icon='add' onClick={function(){
            navigate("/addquestion");
        }}>Add Question</Button>
        <Table
            style={{ margin: "10px", width: "80vw", border: "3px solid black" }}
            headerRow={<TableHeaderRow sticky>
                <TableHeaderCell width="40px"><span></span></TableHeaderCell>
                <TableHeaderCell width="150px"><span>Category</span></TableHeaderCell>
                <TableHeaderCell width="150px"><span>question Type</span></TableHeaderCell>
                <TableHeaderCell width="180px"><span>Created At</span></TableHeaderCell>
                <TableHeaderCell minWidth="400px"><span>Question Text</span></TableHeaderCell>
                <TableHeaderCell minWidth="200px" width='200px'><span>Action</span></TableHeaderCell>
            </TableHeaderRow>}
            onMove={function Xs() { }}
            onMoveOver={function Xs() { }}
            onRowActionClick={function Xs() { }}
            onRowClick={function Xs() { }}
        >

            {questionSet.map((questions, index) => {
                return <TableRow rowKey={questions._id}>
                    <TableCell> <span>{index + 1}</span></TableCell>
                    <TableCell> <span>{questions.category}</span></TableCell>
                    <TableCell> <span>{questions.questionType}</span></TableCell>
                    <TableCell> <span>{new Date(questions.createdAt).toLocaleString()}</span></TableCell>

                    <TableCell> <TextArea disabled value={questions.questionText} rows={2} /></TableCell>
                    <TableCell> <span>
                        <Button design="Transparent" icon='delete' style={{marginRight:"10px"}} data-link_id={questions._id} onClick={DeleteItem} tooltip='Delete'></Button></span>
                        <Button design="Transparent" icon='edit'  data-link_id={questions._id} onClick={EditItem} tooltip='Edit'></Button>
                        {/* <Icon
                            data-link_id={questions._id}
                            name="edit"
                            onClick={EditItem}
                            
                            interactive // Makes the icon clickable and shows pointer cursor
                        /> */}
                        </TableCell>
                </TableRow>
            })}


        </Table>
        <Toast ref={toast} duration={3000} >Toast</Toast>
    </>)
}
export default ManageQuestions;