import { Form, FormItem, FormGroup, Button, Bar, Select, Option, TextArea, Label, CheckBox, Toast, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow } from '@ui5/webcomponents-react';
import { useState, useEffect, useRef } from 'react';
import { updateDumpQuestion, getDumpQuestions } from "../api/QuizApi";
import { useNavigate, useLocation } from "react-router-dom";
function EditViewQuestion(questionId, currentMode = "Display") {
    const { pathname, state } = useLocation();
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [mode, setMode] = useState(currentMode);
    
     const toast = useRef(null);
        const navigate = useNavigate();
        const showToast = (message) => {
            toast.current.innerHTML = message;
            toast.current.open = true;
    
    
        }
    const saveQuestion =async () => {
        let result = await updateDumpQuestion(currentQuestion);
        if(result.message === "Updated Successfully"){
            showToast(result.message);
        }
    }
    const valueChange = (oEvent)=>{
        let name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        setCurrentQuestion({...currentQuestion,[name]:value});
    }
    const valueChangeAnswers = (oEvent)=>{
        let name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        if(oEvent.currentTarget.tagName === "UI5-CHECKBOX"){
            value = oEvent.currentTarget.checked;
        }
     //   let index = oEvent.currentTarget.
     
        let index = oEvent.currentTarget.dataset.rowindex;
        var newObj = JSON.parse(JSON.stringify(currentQuestion));
        newObj.answerOptions[oEvent.currentTarget.dataset.rowindex][name] = value;
        setCurrentQuestion(newObj);
    }
    const fetchData = async (questionId) => {
        let response = await getDumpQuestions(questionId);
        if (response) {
            setCurrentQuestion(response);
        }
    };

    useEffect(() => {
        let questionId = "";
        console.log("pathname : ", pathname, " State : ", state);
        if (pathname) {
            questionId = pathname.replace("/displayquestion/", "");
        }
        if (state.questionId) {
            fetchData(state.questionId || questionId);
        }
        if (state.mode) {
            setMode(state.mode);
        }

    }, []);
    return (
        <div style={{ height: "600px" }}>
            <Form
                headerText="Question Detail"
                labelSpan="S12 M4 L2 XL2"
                emptySpan='S0 M0 L2 XL2'
                layout="S1 M1 L1 XL1"
            >
                <FormGroup headerText="Question">
                    <FormItem labelContent={<Label>Question Category</Label>}>
                        <Select value={currentQuestion.category} onChange={valueChange}   name="category">
                            <Option>Fiori</Option>
                            <Option>SAP CAP</Option>
                            <Option>Build</Option>

                        </Select>
                    </FormItem>
                    <FormItem labelContent={<Label>Question Type</Label>}>

                        <Select value={currentQuestion.questionType} onChange={valueChange}   name="questionType">
                            <Option>SingleSelect</Option>
                            <Option>MultiSelect</Option>

                        </Select>
                    </FormItem>

                    <FormItem labelContent={<Label>Correct Answers Count</Label>}>
                        <Select value={currentQuestion.correctAnswersCount}   name="correctAnswersCount" onChange={valueChange}>
                            <Option>1</Option>
                            <Option>2</Option>
                            <Option>3</Option>
                            <Option>4</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        className="formAlignLabelStart"
                        labelContent={<Label>Question</Label>}
                    >
                        <TextArea
                            name="questionText"
                            value={currentQuestion.questionText}
                            onChange={valueChange}
                            placeholder=" "
                            rows={3}
                        />
                    </FormItem>
                    {/* <FormItem labelContent={<Label>Home address</Label>}>
      <CheckBox checked />
    </FormItem> */}
                </FormGroup>




            </Form>
            <Table
                style={{ margin: "10px", width: "80vw", border: "3px solid black" }}
                headerRow={<TableHeaderRow sticky>
                    <TableHeaderCell width="30px"><span></span></TableHeaderCell>
                    <TableHeaderCell minWidth="400px"><span>Answer Option</span></TableHeaderCell>
                    <TableHeaderCell minWidth="200px" width='200px'><span>Is Correct Answer</span></TableHeaderCell>
                </TableHeaderRow>}
                onMove={function Xs() { }}
                onMoveOver={function Xs() { }}
                onRowActionClick={function Xs() { }}
                onRowClick={function Xs() { }}
            >

                {currentQuestion.answerOptions && currentQuestion.answerOptions.map((answerOption,index) => {
                    return <TableRow rowKey={answerOption.answerIndex}>
                        <TableCell> <span>{index+1}</span></TableCell>
                        <TableCell> <TextArea name="answerText" value={answerOption.answerText} data-rowindex={answerOption.answerIndex} rows={2} onChange={valueChangeAnswers}/></TableCell>
                        <TableCell> <CheckBox  name="isCorrect" checked={answerOption.isCorrect} data-rowindex={answerOption.answerIndex} onChange={valueChangeAnswers}/></TableCell>
                    </TableRow>
                })}


            </Table>
            <Toast ref={toast} duration={3000} >Toast</Toast>
            <Bar design="Footer" endContent={<> <Button design="Emphasized" icon="save" onClick={saveQuestion}>Save</Button></>}>
            </Bar>
        </div>
    );
}
export default EditViewQuestion;