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
            (regStatus.loading)?<TailSpin color="#00BFFF" height={80} width={80} />
            :(regStatus.error)?<h1>{regStatus.error}</h1>:(regStatus.success)?<h1>user registered successfully</h1>:
            <div>
               <input 
            type="text" 
            name="name" 
            onChange={inputsHandler} 
            placeholder="Name" 
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
    
            <button onClick={submitButton}>Submit Now</button>
            </div>
            
            
        )
}

export default Signup