import React from 'react'
import "../Styling/DetailMenu.css";
import { divObj } from '../utils/helper';
import {useState,useEffect} from 'react';
function DetailMenu(props) {
  let [idx,setIdx] = useState(null);
  let [bgColor,setbgColor] = useState("#000000");
  let [xcord,setXcord] = useState("");
  let [ycord,setYcord] = useState("");
  let [height,setHeight] = useState("");
  let [width,setWidth] = useState("");

  useEffect(function(){
    if(props.itemSelected==null){
      setStates("#000000","","","","");
      return;
    }
    let resProp = props.canvaContent.length===0?[{}]:props.canvaContent.find((obj,idx)=>{
       if(obj.id === props.itemSelected){
         setIdx(idx);
         return true;
       }
       else{
        return false;
       }
    })
    setStates(resProp.backgroundColor,resProp.height,resProp.width,resProp.left,resProp.top);
  },[props.itemSelected]);

  function setStates(color,height,width,left,top){
    setbgColor(color);
    setHeight(height);
    setWidth(width);
    setXcord(left);
    setYcord(top);
  }

  useEffect(function(){
    if(idx==null || props.itemSelected==null){
      return;
    }
    let id = props.canvaContent[idx].id
    let newObj = new divObj(xcord,ycord,height,width,bgColor,id);
    props.canvaContent[idx] = newObj;
    props.handleContent(props.canvaContent);
  },[bgColor,height,width,xcord,ycord]);
  
  return (
    <div className='detail_menu'>
      <div className='bg_menu'>
        <h4>Background Color</h4>
        <input className='bg_color' type ="color" value={bgColor} onChange={(e)=>{
          if(props.itemSelected!=null) setbgColor(e.target.value)
        }} />
      </div>
      <div className='position_menu'>
        <div className="x_cord">
         <h4>X cord</h4>
         <input className='x_value' type = "number" min = "1" value={xcord} onChange={(e)=>{
         if(props.itemSelected!=null) setXcord(e.target.value)
        }} />
        </div> 
        <div className="y_cord">
         <h4>Y cord</h4>
         <input className='y_value' type = "number" min = "1" value={ycord} onChange={(e)=>{
          if(props.itemSelected!=null) setYcord(e.target.value)
        }}/>
        </div> 
      </div>
      <div className='size_menu'>
        <div className="height">
         <h4>Height</h4>
         <input className='h_value' type ="number" min ="1" value={height} onChange={(e)=>{
           if(props.itemSelected!=null) setHeight(e.target.value)
        }}/>
        </div> 
        <div className="width">
         <h4>Width</h4>
         <input className='w_value' type="number" min = "1" value={width} onChange={(e)=>{
          if(props.itemSelected!=null) setWidth(e.target.value)
        }}/>
        </div> 
      </div>
    </div>
  )
}

export default DetailMenu