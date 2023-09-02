import React from 'react'
import Item from './Item'

function ItemList(props) {

    const deletedIdForwarder =(id)=>{
        props.idOfDeletedItem(id)
        console.log(id,"in list")
    }
    const UpdatedDataForwarder =(updateData)=>{
        props.dataOfUpdatedItem(updateData)
    }
  return (
    <div>
        <ul>

        {props.data.map((d)=>(
            <Item
            key={d.id}    
            name ={d.name}
            lastName ={d.lastName}
            phonNum = {d.phonNum}
            category ={d.category}  
            id={d.id}
            idToDelete ={deletedIdForwarder}
            idToUpdate ={UpdatedDataForwarder}   
                   
            />
            
            
            ))}
        </ul>
        
    </div>
  )
}

export default ItemList