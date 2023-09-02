import React, { useEffect } from 'react'
import { db } from '../../Config/fierbase'
import { deleteDoc, doc } from 'firebase/firestore'
import Read from './Read'
function Delete(props) {

    // const deleteData = async (id)=> {
    //     console.log(id,"in delete func")
    //     const contactDoc = doc( db,"Contact app",id)
    //  }
    // }
//     try{

    //         await deleteData(contactDoc)
    //     } catch(err){
    //         console.Error(err)
    //    }

    useEffect(()=>{
        const deleteData = async (id)=> {
            console.log(id,"in delete func")
            const contactDoc = doc( db,"Contact app",id)
        // try{
            await deleteDoc(contactDoc)
            props.deleteCurrent("detele this name")
            console.log("delete completed")
        // } catch(err){
            // console.log(err)
       
        // }   
    }
    {props.idd !== 0 && deleteData(props.idd)}
},[props.idd])
    
    // console.log(props.id,"in delete")
  return (
    <div>
        {/* {props.idd? deleteData(props.idd):console.log("undefined id")} */}
        {/* {props.idd !==0 && deleteData(props.idd)} */}
    </div>
  )
}

export default Delete