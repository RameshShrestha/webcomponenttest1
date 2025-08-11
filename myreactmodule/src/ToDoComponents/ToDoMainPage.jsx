import {  Button, DatePicker, Form, FormItem, Input, TextArea } from "@ui5/webcomponents-react";
import TodoActivity from "./TodoActivity";
import { useState } from "react";
import { useToDoContext } from "../Data/ContextHandler/ToDoListContext";

function ToDoMainPage({ user }) {
    const { todoList, addToDo, removeToDo, updateToDo } = useToDoContext();
    const [newTodoItem, setNewTodoItem] = useState({
        id: "",
        username: user,
        title: "",
        content: "",
        status: "New",
        complitionPercent : 0,
        targetCompletionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    });
    return <>
        <div style={{ background: "#b1c0b1", color: "white", minHeight: "91vh" }}>
            <h1 style={{ margin: "0px", marginLeft: "20px" }}>To Do Activity List</h1>

            <div style={{ width: "700px", borderRadius: "10px", padding: "5px", margin: "20px", background: "#2f313d" }}>
                <Form
                    backgroundDesign="Transparent"
                    columnsL={1}
                    columnsM={1}
                    columnsS={1}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={3}
                    labelSpanS={6}
                    labelSpanXL={4}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <FormItem label="Title">
                        <Input placeholder="Title" name="title" value={newTodoItem.title} onChange={(e) => {
                            setNewTodoItem({ ...newTodoItem, title: e.target.value });
                        }} />
                    </FormItem>
                    <FormItem label="Content">
                        <TextArea value={newTodoItem.content} maxlength="300" placeholder="Add your  To do Activity" rows="3" name="content"
                            onChange={(e) => {
                                setNewTodoItem({ ...newTodoItem, content: e.target.value });
                            }} />
                    </FormItem>
                    <FormItem label="Target Completion Date">
                        <DatePicker name="targetCompletionDate" value={newTodoItem.targetCompletionDate} onChange={(e) => {
                            setNewTodoItem({ ...newTodoItem, targetCompletionDate: e.target.value });
                        }} />
                    </FormItem>

                    <FormItem>
                        <Button icon="add" onClick={async () => {
                            console.log("Trigger Add");
                            await addToDo(newTodoItem);
                            console.log(" Add Finished");
                            setNewTodoItem({ ...newTodoItem, title: "", content: "", targetCompletionDate: "" });
                        }}>Add</Button>
                        {/* <BusyIndicator active={isBusy}/> */}

                    </FormItem>
                </Form>
            </div>
            {todoList.map((todoItem) => {
                return <TodoActivity key={todoItem._id} todoData={todoItem} removeToDo={removeToDo} updateToDo={updateToDo} />
            })
            }
            {todoList.length === 0 && (<div>No Activity yet</div>)}
        </div>
    </>
}
export default ToDoMainPage;