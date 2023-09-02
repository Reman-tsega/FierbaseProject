import React, { useRef, useState } from 'react'
import ItemList from './ItemList'
import classes from './Item.module.css'

function Item(props) {
    const [edit, setEdit] = useState(false)
    let newTitle = useRef('')

    const deleteHandler =(idx)=>{
        {props.idToDelete(idx)}
        console.log(idx,"in item")
    }
    const updateContact =(id)=>{
        const updateData = {id:id,newTitleAdded : newTitle}
        {props.idToUpdate(updateData)}
    }

  return (
    <li className={classes.itemContainer}>
        <h1 className={classes.itemTitle} >{props.name} { props.lastName}</h1>
            <button className={classes.itemButton} onClick={()=>setEdit(true)}>edit</button>
            {edit&&<input className={classes.itemInput} ref={newTitle} onChange={(e)=>(newTitle = e.target.value)} />}
            {edit&&<button className={classes.itemButton} onClick={()=>updateContact(props.id)}>update</button>} 
            {edit&&<button className={classes.itemButton} onClick={()=>setEdit(false)}>cancle</button>}
            <h2 className={classes.itemPhoneNumber}>phone number {props.phonNum}</h2>
            <button className={classes.itemDeleteButton} onClick={()=>deleteHandler(props.id)} >delete</button>
    </li>
  )
}

export default Item