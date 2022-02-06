import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../REDUX/actions/userActions";
import { TailSpin } from  'react-loader-spinner'

function Login(){

    const dispatch = useDispatch()
    const LoginStatus = useSelector(state=>state.userLogin)
    const navigate = useNavigate()

    useEffect(()=>{
        if(LoginStatus.userInfo){
            navigate('/dashboard')
        }
    },[LoginStatus.userInfo])

    const [inputField , setInputField] = useState({
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
        dispatch(login(inputField.email,inputField.password))
    }

        return(
            (LoginStatus.loading)?<TailSpin color="#00BFFF" height={80} width={80} />
            :(LoginStatus.error)?<h1>{LoginStatus.error}</h1>:(LoginStatus.success)?<h1>Login successfull</h1>:
            <div>
    
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
    
            <button onClick={submitButton}>LOGIN</button>
            </div>
            
            
        )
}

export default Login