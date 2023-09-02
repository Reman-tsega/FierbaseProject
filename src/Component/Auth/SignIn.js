import React, { useRef } from 'react'
import { auth, googleProvider } from '../../Config/fierbase'
import { createUserWithEmailAndPassword , signInWithPopup, signOut, validatePassword } from 'firebase/auth'

function SignIn() {
    let passwordRef = useRef()
    let emailRef  = useRef()

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
  return (
    <div>
        <input id='email' placeholder='Email..' type='email' ref= {emailRef}  onChange={(e)=>(emailRef =e.target.value)} /> <br/>
        <input id='password' placeholder='password...' type='password' ref = {passwordRef} onChange={(e)=>(passwordRef=e.target.value)} />
        <button onClick={signinHandler}> sign in</button> <br/>
        <button onClick={signInWithGoogle}> sign in with google</button>
    </div>
  )
}

export default SignIn