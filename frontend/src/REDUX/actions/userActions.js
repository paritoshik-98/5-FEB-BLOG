import axios from "axios";
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8080"

axios.defaults.headers.common['authtoken'] = localStorage.getItem('at')
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
          window.location = '/login';
          return Promise.reject(error);
      }
    } 
  );

export const signup = (name,email,password) => async(dispatch) => {
  try {
    const input = {name:name,email:email,password:password}
    dispatch({ type: 'USER_REGISTER_REQUEST' });
    axios.post("/api/user/signup", input)
    .then(dispatch({ type: 'USER_REGISTER_SUCCESS'}))
    .catch(err=>dispatch({type: 'USER_REGISTER_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'USER_REGISTER_FAIL',payload:error.message});
    }
  }


export const login = (email, password) => async (dispatch) => {
  try {
    const input = {email:email,password:password}
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    axios.post("/api/user/login", input)
    .then(res =>{
      dispatch({ type: 'USER_LOGIN_SUCCESS',payload:res.data});
      localStorage.setItem('userInfo',JSON.stringify(res.data.user));
      localStorage.setItem('at',res.data.at);
    })
    .catch(err=>dispatch({type: 'USER_LOGIN_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'USER_LOGIN_FAIL',payload:error.message});
    }
  }
  
  // google login
  export const LoginWithGoogle = (user) => async (dispatch) => {
    try {
      dispatch({ type: 'USER_LOGIN_REQUEST' });
      axios.post('api/user/Googlelogin',user)
      .then(res =>{
        dispatch({ type: 'USER_LOGIN_SUCCESS',payload:res.data});
        localStorage.setItem('userInfo',JSON.stringify(res.data.user));
        localStorage.setItem('at',res.data.at);
      })
      .catch(err=>dispatch({type: 'USER_LOGIN_FAIL',payload:err.response.data}))
      
      }
    catch (error) {
            dispatch({type: 'USER_LOGIN_FAIL',payload:error.message});
      }
    }


    // logout

export const Logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("at");
  dispatch({ type: 'USER_LOGOUT' });
};

////////////// data  pic url --- {url}
export const updatePic = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });
    axios.post('api/user/updatePic',data)
    .then(res =>{
      dispatch({ type: 'USER_UPDATE_SUCCESS',payload:res.data});
      localStorage.setItem('userInfo',JSON.stringify(res.data));
    })
    .catch(err=>dispatch({type: 'USER_UPDATE_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'USER_UPDATE_FAIL',payload:error.message});
    }
  }

////////////// data  new password --- {Pswd}
export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });
    axios.post('api/user/updatePassword',data)
    .then(res =>{
      dispatch({ type: 'USER_UPDATE_SUCCESS',payload:res.data});
      localStorage.setItem('userInfo',JSON.stringify(res.data));
    })
    .catch(err=>dispatch({type: 'USER_UPDATE_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'USER_UPDATE_FAIL',payload:error.message});
    }
  }
