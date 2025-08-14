import { Form, FormItem, FormGroup, Button, Bar, Select, Option, TextArea, Label, CheckBox, RadioButton, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Toast } from '@ui5/webcomponents-react';
import { useRef, useState } from 'react';
import { addDumpQuestion } from "../api/QuizApi";
import { useNavigate } from "react-router-dom";
function AddQuestions() {

    const newQuestionTemplate = {
        "category": "Fiori",
        "questionId": "",
        "questionType": "SingleSelect",
        "questionText": '',
        "correctAnswersCount": "1",
        "answerOptions": [
            { "answerIndex": "0", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "1", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "2", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "3", "answerText": '', "isCorrect": false, "selected": false },
        ],
        selectedAnswer: ""
    };
    const [newQuestion, setNewQuestion] = useState(newQuestionTemplate);
        const toast = useRef(null);
          const showToast = (message) => {
            toast.current.innerHTML = message;
            toast.current.open = true;
        }
        const saveQuestion =async () => {
             let result = addDumpQuestion(newQuestion);
        setNewQuestion(newQuestionTemplate);
     
        if(result.message === "Added Successfully"){
            showToast(result.message);
        }
    }
    const valueChange = (oEvent)=>{
        let name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        setNewQuestion({...newQuestion,[name]:value});
    }

    const valueChangeAnswers = (oEvent)=>{
        let name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        if(oEvent.currentTarget.tagName === "UI5-CHECKBOX"){
            value = oEvent.currentTarget.checked;
        }
     //   let index = oEvent.currentTarget.
     
        let index = oEvent.currentTarget.dataset.rowindex;
        var newObj = JSON.parse(JSON.stringify(newQuestion));
        newObj.answerOptions[oEvent.currentTarget.dataset.rowindex][name] = value;
        setNewQuestion(newObj);
    }
    // const saveQuestion = () => {
    //     let result = addDumpQuestion(newQuestion);
    //     setNewQuestion(newQuestionTemplate);


    // }
    return (
        <div style={{ height: "600px" }}>
            <Form
                headerText="Add Question"
                labelSpan="S12 M4 L2 XL2"
                emptySpan='S0 M0 L2 XL2'
                layout="S1 M1 L1 XL1"
            >
                <FormGroup headerText="Question">
                    <FormItem labelContent={<Label>Question Category</Label>}>
                        <Select name="category" value={newQuestion.category} onChange={valueChange}>
                            <Option>Fiori</Option>
                            <Option>SAP CAP</Option>
                            <Option>Build</Option>

                        </Select>
                    </FormItem>
                    <FormItem labelContent={<Label>Question Type</Label>}>

                        <Select  name="questionType" onChange={valueChange} value={newQuestion.questionType}>
                            <Option>SingleSelect</Option>
                            <Option>MultiSelect</Option>

                        </Select>
                    </FormItem>

                    <FormItem labelContent={<Label>Correct Answers Count</Label>}>
                        <Select name="correctAnswersCount" onChange={valueChange} value={newQuestion.correctAnswersCount}>
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
                            value={newQuestion.questionText}
                            name="questionText"
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

                {newQuestion.answerOptions.map((answerOption, index) => {
                    return <TableRow rowKey={answerOption.answerIndex}>
                        <TableCell> <span>{index+1}</span></TableCell>
                        <TableCell> <TextArea name="answerText" value={answerOption.answerText} data-rowindex={answerOption.answerIndex} rows={2} onChange={valueChangeAnswers} /></TableCell>
                        <TableCell> <CheckBox name="isCorrect" checked={answerOption.isCorrect} data-rowindex={answerOption.answerIndex} onChange={valueChangeAnswers} /></TableCell>
                    </TableRow>
                })}


            </Table>
            <Bar design="Footer" endContent={<> <Button design="Emphasized" icon="save" onClick={saveQuestion}>Save</Button></>}>
            </Bar>
             <Toast ref={toast} duration={3000} >Toast</Toast>
        </div>
    );
}
export default AddQuestions;