import React from 'react'
import "../Styling/Canva.css"
import { useState,useRef} from 'react';
import { divObj } from '../utils/helper';
import idCreate from '../utils/uuid';
function Canva(props) {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [dragDiv,setDragdiv] = useState(null);
  const parentdivRef = useRef(null);

  function handleMouseDown(e) {
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  }
  const handleDivDrag = (event) => {
    event.preventDefault();
  }
   
  const handleDivDrop = (event) => {
    if(!event.dataTransfer.getData("text/plain")){
      return;
    }
    const dataObj = JSON.parse(event.dataTransfer.getData("text/plain"));
    dataObj.left = event.nativeEvent.offsetX;
    dataObj.top = event.nativeEvent.offsetY;
    props.canvaContent.push(dataObj);
    props.handleContent(props.canvaContent);
    props.handleItem(dataObj.id);
  }

  function handleMouseUp(e){
    if(props.drawMode){
      let id = idCreate();
      let height = e.nativeEvent.offsetY -  startY;
      let width = e.nativeEvent.offsetX - startX;
      let newDiv = new divObj(startX,startY,height,width,'#ffffff',id);
      props.canvaContent.push(newDiv);
      props.handleContent(props.canvaContent);
      props.handleItem(id);
    }
    props.changeMode(false);
  }

  function handleDragStart(e) {
    setDragdiv(e.target.id);
    props.handleItem(null);
  }

  function handleDragOver(event){
    event.preventDefault();
  }
  
  function handleDragEnd(e) {
    let index = props.canvaContent.findIndex(function(obj){
      return obj.id === dragDiv;
    });
    const parentdiv = parentdivRef.current;
    const parentdivRect = parentdiv.getBoundingClientRect();
    props.canvaContent[index].top = e.clientY - parentdivRect.top;
    props.canvaContent[index].left = e.clientX - parentdivRect.left;
    props.handleContent(props.canvaContent);
    props.handleItem(dragDiv)
    setDragdiv(null);
  }
  return (
    <div className='drawArea' ref={parentdivRef} onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp} onDragOver={handleDivDrag} onDrop={handleDivDrop}>
            <>
            {props.canvaContent.map(function(obj){
                return (
                  <div key = {obj.id} className = "item" id = {obj.id} onClick={function(){
                    props.handleItem(obj.id);
                  }} contentEditable ={true} draggable={true} onDragStart={handleDragStart}        
                  onDragOver ={handleDragOver} onDragEnd={handleDragEnd}  style={{
                    position : 'absolute',
                    left : obj.left+"px",
                    top : obj.top+"px",
                    width : obj.width+"px",
                    height : obj.height+"px",
                    backgroundColor : obj.backgroundColor
                  }}></div>
                )
            })}
            </>
    </div>
  )
}

export default Canva