import React, { useState } from 'react'
import { collection,addDoc, } from 'firebase/firestore'
import { auth, db } from '../../Config/fierbase'

import classes  from "./Create.module.css"

function Create() {
    const [contactData, setContactData] = useState({name:'', lastName:'', phonNum:0})
    // ************************* Add data *************************************
    const ContactCollectionRef = collection(db,"Contact app")
    const contactSubmitHandler = async ()=>{
        try{
            await addDoc(ContactCollectionRef, {
                name:contactData.name,
                lastName:contactData.lastName,
                phonNum:contactData.phonNum,
                category: ["family"],
                userId: auth?.currentUser?.uid, 
            })// addDoc take 2 arguments collectionref and the added data object
            // getData()
            
            setContactData((cdata)=>({...cdata,name:"",lastName:"",phonNum:""}))
            // contactList.append(contactData)
        } catch(err){
            console.error(err)
        }
    }

  return (
    <div className={classes.createContiner}>
                    <h2>New cotact data </h2> <br/>

        <label className={classes.createLabel}>name</label>
        <input type='text' placeholder='enter name' 
            onChange={(e)=>setContactData((n)=>({...n,name:e.target.value}))}
            value={contactData.name}
            className={classes.createInput}
             /><br/>
             <label> last name</label>
        <input type='text' placeholder='enter last name'
            onChange={(e)=>setContactData((l)=>({...l,lastName:e.target.value}))}
            value={contactData.lastName}
            className={classes.createInput}

        /> <br/>
        <label>phone number</label>
        <input  placeholder='phone num' type='number'
            onChange={(e)=>setContactData((pn)=>({...pn,phonNum:e.target.value}))}
            value={contactData.phonNum}
            className={classes.createInput}

        />
        <button onClick={contactSubmitHandler} className={classes.createButton}> Add</button>
    </div>
  )
}

export default Create