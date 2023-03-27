import React from 'react'
import "../Styling/ToolBar.css";
import idCreate from '../utils/uuid';
function ToolBar(props) {
  const data = {id: idCreate(), height: 100,width:200,backgroundColor:"#6495ED"};
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  }
  return (
    <div className='tool_bar'>
        <h1>Tool Bar</h1>
        <button className='text_btn' onClick = {()=>{props.changeMode(true)}}>Text</button>
        <div className="dropable_div" draggable onDragStart={handleDragStart}> Draggable Div</div>
    </div>
  )
}

export default ToolBar