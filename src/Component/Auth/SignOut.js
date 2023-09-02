import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../Config/fierbase'
function SignOut() {

  const logout = async ()=>{
    try{
        signOut(auth)
    }catch(err){

    }
}

  return (
    <div>
      
        <button onClick={logout}> log out</button>
    </div>
  )
}

export default SignOut