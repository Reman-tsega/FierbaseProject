import React,{useState,useEffect,useMemo} from 'react'
import { db } from '../../Config/fierbase'
import {getDocs , collection} from "firebase/firestore"

import ItemList from './ItemList'
import Delete from './Delete'
import Update from './Update'
function Read() {
    const [contactList , setContactList] = useState([])
    const [idToBeDeleted , setIdToBeDeleted] = useState(0)
    const [idToBeUpdeted , setIdToBeUpdated] = useState({id:0,newName:""})
    
    const ContactCollectionRef  = collection(db, "Contact app") // create reference for firestore collection contact app
    
      // ************************* REad **********************
      const getData = useMemo(()=>  async ()=>{
          try{
              const data = await getDocs(ContactCollectionRef) // get the query snapshot of the collection
              const filtereData = data.docs.map((doc)=>(
                  {
                      ...doc.data(),id:doc.id
                    }// filter the data and id of the collection out of filterdata
                    ))
                    console.log(filtereData)
                    setContactList(filtereData)
                }
                catch (err){
                    console.error(err)
                }
            }    
            
      , [contactList] )

            useEffect(()=>{
                getData()
            },[])
            
            // console.log(contactList,"in read")
            const deleteHandler = (id)=>{
                setIdToBeDeleted(id)
                console.log(id,"in read")
            }
            const updateHandler =(updateData)=>{
                setIdToBeUpdated({id:updateData.id, newName:updateData.newTitleAdded})
                console.log(updateData,"in read update")
                console.log(idToBeUpdeted,"in read update current")
            }
            // console.log(idOfDeletedItem)
            
            return (
                <div>
        <h1>Contacts</h1>
        <ItemList data={contactList} idOfDeletedItem = {deleteHandler} dataOfUpdatedItem ={updateHandler}  />
        <Delete idd ={idToBeDeleted} deleteCurrent ={getData} />
        <Update data ={idToBeUpdeted} update ={getData} />

    </div>
  )
}

export default Read