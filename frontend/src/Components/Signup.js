import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../REDUX/actions/userActions";
import { TailSpin } from  'react-loader-spinner'

function Signup(){

    const dispatch = useDispatch()
    const regStatus = useSelector(state=>state.userRegister)
    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(userInfo){
    //         navigate('/dashboard')
    //     }
    // },[userInfo])

    const [inputField , setInputField] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const inputsHandler = (e) =>{
        const { name, value } = e.target;
       setInputField((prevState) => ({
         ...prevState,
         [name]: value,
       }));
    }

    const submitButton =  (e) =>{
        e.preventDefault()  
        dispatch(signup(inputField.name,inputField.email,inputField.password))
    }

        return(
            // process running 
            (regStatus.loading)?
            <TailSpin color="#00BFFF" height={80} width={80} />
            :
            // before submitting or after process failed --- no loading atrr 
            <div>

            {(regStatus.error)?<div class="alert alert-danger">
            <strong>{regStatus.error}</strong> 
            </div>:null}

            <input 
            type="string" 
            name="name" 
            onChange={inputsHandler} 
            placeholder="name" 
            value={inputField.name}/>
    
            <br/>

            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="email" 
            value={inputField.email}/>
    
            <br/>
    
            <input 
            type="password" 
            name="password" 
            onChange={inputsHandler} 
            placeholder="password" 
            value={inputField.password}/>
    
            <br/>
    
            <button onClick={submitButton}>Register</button>
            </div>
            
            
            
        )
}

export default Signup