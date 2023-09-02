import React,{useEffect, useState} from 'react'
import { db } from '../../Config/fierbase'
import { doc, updateDoc } from 'firebase/firestore'

function Update(props) {
    console.log("in update")
    useEffect(()=>{

    const updateData = async ()=>{
        console.log("in update in",props.data.newName, props.data.id)
        
        const newdata = doc(db, "Contact app", props.data.id)
        await updateDoc(newdata,{name:props.data.newName})
        props.update("update value")
    }
        console.log(props.data)
        {props.data.id !== 0 && updateData()}

},[props.data])


  return (
    <div>
        {/* {} */}
    </div>

  )
}

export default Update