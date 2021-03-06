import axios from "axios";
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8080"

// axios.defaults.headers.common['authtoken'] = localStorage.getItem('at')
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

export const createBlogAction = (content) => async (dispatch,getState) => {
  try {
    const {
      userLogin: { userInfo, at },
    } = getState();

    dispatch({ type: 'BLOG_CREATE_REQUEST' });
    axios.post("/api/blog/add", {content:content}
    ,{
      headers:{
        authtoken: at
      }
    }
    )
    .then(dispatch({ type: 'BLOG_CREATE_SUCCESS'}))
    .catch(err=>dispatch({type: 'BLOG_CREATE_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'BLOG_CREATE_FAIL',payload:error.message});
    }
  }

  // send blog id in dispatch request
export const updateBlogAction = (content,id) => async (dispatch,getState) => {
  try {
    const {
      userLogin: { userInfo, at },
    } = getState();

    dispatch({ type: 'BLOG_UPDATE_REQUEST' });
    const path = "/api/blog/"+id+"/edit"
    axios.put(path, content
      ,{
        headers:{
          authtoken: at
        }
      }
      )
    .then(dispatch({ type: 'BLOG_UPDATE_SUCCESS'}))
    .catch(err=>dispatch({type: 'BLOG_UPDATE_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'BLOG_UPDATE_FAIL',payload:error.message});
    }
  }


// delete
export const deleteBlogAction = (id) => async (dispatch,getState) => {
  try {
    const {
      userLogin: { userInfo, at },
    } = getState();
    
    dispatch({ type: 'BLOG_DELETE_REQUEST' });
    const path = "/api/blog/"+id+"/delete"
    axios.delete(path
      ,{
        headers:{
          authtoken: at
        }
      }
      )
    .then(dispatch({ type: 'BLOG_DELETE_SUCCESS'}))
    .catch(err=>dispatch({type: 'BLOG_DELETE_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'BLOG_DELETE_FAIL',payload:error.message});
    }
  }



 // get all blogs 
  export const allBlogAction = () => async (dispatch,getState) => {
    try {
      const {
        userLogin: { userInfo, at },
      } = getState();
      
      dispatch({ type: 'ALL_BLOG_REQUEST' });
      axios.get("/api/blog/all"
      ,{
        headers:{
          authtoken: at
        }
      }
      )
      .then(res=>dispatch({ type: 'ALL_BLOG_SUCCESS', payload:res.data}))
      .catch(err=>dispatch({type: 'ALL_BLOG_FAIL',payload:err.response.data}))
      
      }
    catch (error) {
            dispatch({type: 'ALL_BLOG_FAIL',payload:error.message});
      }
    }
  
// get 1 blog by id
export const blogReadAction = (id) => async (dispatch,getState) => {
  try {
    const {
      userLogin: { userInfo, at },
    } = getState();
    
    dispatch({ type: 'BLOG_READ_REQUEST' });
    const path = '/api/blog/'+id
    axios.get(path
      ,{
        headers:{
          authtoken: at
        }
      }
      )
    .then(res=>dispatch({ type: 'BLOG_READ_SUCCESS', payload:res.data}))
    .catch(err=>dispatch({type: 'BLOG_READ_FAIL',payload:err.response.data}))
    
    }
  catch (error) {
          dispatch({type: 'BLOG_READ_FAIL',payload:error.message});
    }
  }
















// export const listNotes = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: NOTES_LIST_REQUEST
//     });


//     const { data } = await axios.get(`/api/notes`);

//     dispatch({
//       type: NOTES_LIST_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     dispatch({
//       type: NOTES_LIST_FAIL,
//       payload: message
//     });
//   }
// };

// export const createBlogAction = (content) => async (dispatch) => {
//   try {
//     dispatch({
//       type: BLOG_CREATE_REQUEST,
//     });


//     const { data } = await axios.post(
//       `/api/blog/add`,
//       {content}
//     );

//     dispatch({
//       type: BLOG_CREATE_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     dispatch({
//       type: BLOG_CREATE_FAIL,
//       payload: message
//     });
//   }
// };

//   try {
//     dispatch({
//       type: NOTES_DELETE_REQUEST
//     });


//     const { data } = await axios.delete(`/api/blog/${id}/delete`);

//     dispatch({
//       type: BLOG_DELETE_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     dispatch({
//       type: BLOG_DELETE_FAIL,
//       payload: message
//     });
//   }
// };

// export const updateBlogAction = (content) => async (
//   dispatch
// ) => {
//   try {
//     dispatch({
//       type: BLOG_UPDATE_REQUEST
//     });


//     const { data } = await axios.put(
//       `/api/blog/${id}/edit`,
//       {content}
//     );

//     dispatch({
//       type: BLOG_UPDATE_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     dispatch({
//       type: BLOG_UPDATE_FAIL,
//       payload: message
//     });
//   }
// };