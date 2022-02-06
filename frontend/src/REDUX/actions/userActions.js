import axios from "axios";
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8080"

// axios.defaults.headers.common['authtoken'] = localStorage.getItem('at')
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   if (401 === error.response.status) {
//           window.location = '/login';
//           return Promise.reject(error);
//       }
//     } 
//   );

export const signup = (name,email,password) => async(dispatch) => {
  try {
    const input = {name:name,email:email,password:password}
    dispatch({ type: 'USER_REGISTER_REQUEST' , payload: input});
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
    dispatch({ type: 'USER_LOGIN_REQUEST' , payload: input});
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("at");
  dispatch({ type: 'USER_LOGOUT' });
};

// export const register = (username, email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: 'USER_REGISTER_REQUEST' });

    

//     const { data } = await axios.post(
//       "/api/user/signup",
//       { username, email, password }
//     );

//     dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });

   
//   } catch (error) {
//     dispatch({
//       type: 'USER_REGISTER_FAIL',
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//     });
//   }
// };

// export const updateProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: 'USER_UPDATE_REQUEST' });

    

//     const { data } = await axios.post("/api/users/profile", user);

//     dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });

//     dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: 'USER_UPDATE_FAIL',
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//     });
//   }
// }