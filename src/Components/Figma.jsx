import React from 'react'
import DetailMenu from './DetailMenu'
import Navbar from './Navbar'
import ToolBar from './ToolBar'
import Canva from './Canva'
import "../Styling/Figma.css";
function Figma() {
  const [drawMode,setdrawMode] = React.useState(false);
  const [canvaContent,setContent] = React.useState([]);
  const [itemSelected,setItem] = React.useState(null);
  function handleContent(arr){
    let newArr = [...arr];
    setContent(newArr);
  }
  function handleItem(val){
    setItem(val);
  }
  function changeMode(val){
   setdrawMode(val);
  }
  return (
    <div className='figma-cont'>
        <Navbar canvaContent = {canvaContent} handleContent={handleContent} itemSelected = {itemSelected} handleItem = {handleItem} ></Navbar>
        <div className='body_comp'>
            <ToolBar changeMode={changeMode}></ToolBar>
            <Canva canvaContent = {canvaContent} handleItem = {handleItem} handleContent={handleContent} drawMode={drawMode} changeMode={changeMode}></Canva>
            <DetailMenu itemSelected = {itemSelected} canvaContent= {canvaContent} handleContent={handleContent}></DetailMenu>
        </div>
    </div>
  )
}

export default Figma