// import axios from "axios";

// axios.defaults.headers.common['authtoken'] = localStorage.getItem('at')
// axios.defaults.headers.post['Content-Type'] = 'application/json';


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

// export const deleteBlogAction = (id) => async (dispatch) => {
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