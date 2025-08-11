import { Icon, Select, Option, Button, TextArea, Slider } from "@ui5/webcomponents-react";
import { useState } from "react";

function TodoActivity({ todoData, removeToDo, updateToDo }) {
    const [editMode, setEditMode] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(todoData);
    return <div style={{ display: "flex", flexDirection: "column", width: "50rem", color: "white", borderRadius: "10px", overflow: "hidden", margin: "20px" }}>

        <div style={{ background: "green", fontWeight: "bold", padding: "5px", display: "flex", justifyContent: "space-between" }}>
            <div>{todoData.title}</div>
            <div style={{ display: "flex", gap: "1rem", marginRight: "10px" }}>
                <Icon interactive name="edit" showTooltip="true" accessibleName="Edit"
                    onClick={(e) => {
                        setEditMode(true);
                    }} />
                <Icon interactive name="decline" showTooltip="true" accessibleName="Delete" onClick={(e) => {
                    removeToDo(todoData._id);
                }} />
            </div>
        </div>
        <div style={{ display: "flex" }}>
            <div style={{ background: "#24245f", height: "6rem", padding: "5px", width: "60%" }}>
                {editMode ?
                    (<TextArea rows={2} value={updatedContent.content}
                        onChange={function _a(e) {
                            setUpdatedContent({ ...updatedContent, "content": e.target.value });
                        }} />) :
                    (<p style={{ margin: "0px" }}>{todoData.content}  </p>)}
                <div>
                    {/* <input style={{ width: "80%" }} type="range" min={0} max={100} /> */}
                    <Slider style={{ width: "80%" }} min={0} max={100} showTooltip value={todoData.complitionPercent} showTickmarks={false}
                        onChange={
                            function _a(e) { 
                                setUpdatedContent({ ...updatedContent, "complitionPercent": e.target.value });
                            }
                        }
                        disabled = {!editMode}
                        onInput={function _a() { }}
                    />
                    <span>{todoData.complitionPercent}</span></div>

            </div>
            <div style={{ background: "var(--sapBlockLayer_Background)", width: "40%", padding: "5px" }}>
                <div > <span>Created On : {new Date(todoData.createdAt).toLocaleString()}</span></div>
                <div>
                    {editMode ? (<>
                        <Select
                            value={updatedContent.status}
                            style={{ width: "130px" }}
                            onChange={function _a(e) {
                                setUpdatedContent({ ...updatedContent, "status": e.target.value });
                            }}
                            onClose={function _a() { }}
                            onLiveChange={function _a() { }}
                            onOpen={function _a() { }}
                        >
                            <Option key="New">New</Option>
                            <Option key="In Progress">In Progress</Option>
                            <Option key="Done">Done</Option>
                        </Select><Button icon="save" onClick={(e) => {
                            console.log(updatedContent);
                            updateToDo(updatedContent);
                            setEditMode(false);
                        }}>Save</Button>
                        <Button icon="decline" onClick={(e) => {
                            setUpdatedContent(todoData);
                            setEditMode(false);
                        }}>Cancel</Button> </>) :
                        (<span>Status : {todoData.status} </span>)
                    }
                </div>


                <div ><span>To be Completed By : {new Date(todoData.targetCompletionDate).toLocaleDateString()} </span></div>
            </div>
        </div>
    </div>
}
export default TodoActivity;