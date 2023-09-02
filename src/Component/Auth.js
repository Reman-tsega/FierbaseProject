
import React, { useEffect, useRef, useState } from 'react'
import {auth , googleProvider } from "../Config/fierbase"
import { createUserWithEmailAndPassword , signInWithPopup, signOut, validatePassword } from 'firebase/auth'

import { db } from '../Config/fierbase'
import {getDocs , collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"


function Auth() {
    const ContactCollectionRef = collection(db, "Contact app") // create reference for firestore collection contact app
    
    const [contactList , setContactList] = useState([])
    const [contactData, serContactData] = useState({name:'', lastName:'', phonNum:0})
    const [edit, setEdit] = useState(false)
    let newTitle = useRef()

    let emailRef  = useRef()
    let passwordRef = useRef()

// **************************** sign in option **********************
const signinHandler= async()=>{
    try{

        await createUserWithEmailAndPassword(auth,  emailRef ,passwordRef);
    } catch(err) {
        console.error(err)
    }
    
}

const signInWithGoogle = async ()=>{
    try{
        signInWithPopup(auth, googleProvider)
    }catch(err){
        
    }
}

const logout = async ()=>{
    try{
        signOut(auth)
    }catch(err){

    }
}
//  ***************************** sign in option ends ******************************


   // ************************* REad **********************
   const getData = async ()=>{
    try{
        const data = await getDocs(ContactCollectionRef) // get the query snapshot of the collection
        const filtereData = data.docs.map((doc)=>(
            {
                ...doc.data(),
                id:doc.id
            }// filter the data and id of the collection out of filterdata
        ))
        console.log(filtereData)
        setContactList(filtereData)
    }
    catch (err){
        console.error(err)
    }
}    


useEffect(()=>{
    getData()
},[contactData])

// ************************* Add data *************************************

    const contactSubmitHandler = async ()=>{
        try{
            await addDoc(ContactCollectionRef, {
                name:contactData.name,
                lastName:contactData.lastName,
                phonNum:contactData.phonNum,
                category: ["family"]
            })// addDoc take 2 arguments collectionref and the added data object
            // getData()
            
            serContactData((cdata)=>({...cdata,name:"",lastName:"",phonNum:""}))
            // contactList.append(contactData)
        } catch(err){
            console.error(err)
        }
    }
    // ******************************  delete data ******************************
    const deleteContact = async(id)=>{
        const contactDoc = doc(db, "Contact app", id); // delete take the firestore, collection neme and specific id to be deleted
        await deleteDoc(contactDoc)
        getData()
        console.log(id,"cliked")
    }

//  ********************************** update data ********************
const updateContact = async (id)=>{
    const contactData = doc(db, "Contact app", id)
    await updateDoc(contactData, {name:newTitle})
    setEdit(false)
    getData()
}






    // console.log(auth?.currentUser?.photoURL)
  
  
  
    return (
    <>
    <div>
        <input id='email' placeholder='Email..' type='email' ref= {emailRef}  onChange={(e)=>(emailRef =e.target.value)} /> <br/>
        <input id='password' placeholder='password...' type='password' ref = {passwordRef} onChange={(e)=>(passwordRef=e.target.value)} />
        <button onClick={signinHandler}> sign in</button> <br/>
        <button onClick={signInWithGoogle}> sign in with google</button>
        <button onClick={logout}> log out</button>
    </div>
                    <h2>New cotact data </h2> <br/>
    <div>
        <label>name</label>
        <input type='text' placeholder='enter name' 
            onChange={(e)=>serContactData((n)=>({...n,name:e.target.value}))}
            value={contactData.name}
             /><br/>
             <label> last name</label>
        <input type='text' placeholder='enter last name'
            onChange={(e)=>serContactData((l)=>({...l,lastName:e.target.value}))}
            value={contactData.lastName}
        /> <br/>
        <label>phone number</label>
        <input  placeholder='phone num' type='number'
            onChange={(e)=>serContactData((pn)=>({...pn,phonNum:e.target.value}))}
            value={contactData.phonNum}
        />
        <button onClick={contactSubmitHandler}> Add</button>
    </div>
    <div>
        {contactList.map((contact)=>(
                <div key={contact.id}>
            <h1>{contact.name} { contact.lastName}</h1>
            <button onClick={()=>setEdit(true)}>edit</button>
            {edit&&<input ref={newTitle} onChange={(e)=>(newTitle = e.target.value)} />}
            {edit&&<button onClick={()=>updateContact(contact.id)}>update</button>}
            {edit&&<button onClick={()=>setEdit(false)}>cancle</button>}
            <h2>phone number {contact.phonNum}</h2>
            <button onClick={()=>deleteContact(contact.id)} >delete</button>
                </div>
            
))}
    </div>
    </>
  )
}

export default Auth