import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, LoginWithGoogle } from "../REDUX/actions/userActions";
import { TailSpin } from  'react-loader-spinner'
import { GoogleLogin, GoogleLogout } from "react-google-login";

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

    const responseGoogleSuccess = (response) => {
        let userInfo = {
          name: response.profileObj.name,
          emailId: response.profileObj.email,
          profile_pic:response.profileObj.imageUrl
        };
        // check in backend and register if first google login 
        dispatch(LoginWithGoogle({email:userInfo.emailId,name:userInfo.name,profile_pic:userInfo.profile_pic}))
      };

    // Error Handler
    const responseGoogleError = (response) => {
    console.log(response);
     };

        return(
            // process running 
            (LoginStatus.loading)?
            <TailSpin color="#00BFFF" height={80} width={80} />
            :
            // before submitting or after process failed --- no loading atrr 
            <div>

            {(LoginStatus.error)?<div class="alert alert-danger">
            <strong>{LoginStatus.error}</strong> Indicates a dangerous or potentially negative action.
            </div>:null}

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

            <br/>

            <GoogleLogin
                clientId= {process.env.REACT_APP_CLIENTID_GOOGLE}
            //   clientId="149517402118-58t2a5ao3f8kqo9vn8bh5muf3ctbl5f3.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
            //   isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
            </div>
            
            
        )
}

export default Login