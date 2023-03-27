import React from 'react'
import "../Styling/NavBar.css";
function Navbar(props) {
  function deleteDiv(){
    let updatedArr = props.canvaContent.filter((obj,idx)=>{
      if(obj.id !== props.itemSelected){
        return true;
      }
      else{
       return false;
      }
   })
   props.handleItem(null);
   props.handleContent(updatedArr);
  }
  return (<div className='nav_bar'>
    <div className = "title">
      React Assignment
    </div>
    <button className='delete_btn' onClick={deleteDiv}>Delete</button>
    </div>
  )
}

export default Navbar