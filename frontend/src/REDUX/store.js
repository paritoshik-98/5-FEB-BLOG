import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogUpdateReducer,
  allBlogReducer,
  blogReadReducer
} from "./reducers/blogReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  allBlog:allBlogReducer,
  blogRead:blogReadReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  blogCreate: blogCreateReducer,
  blogDelete: blogDeleteReducer,
  blogUpdate: blogUpdateReducer,
  userUpdate: userUpdateReducer,
});

const jwtFromStorage = localStorage.getItem("at")

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"))
 

const initialState = {
  userLogin: { userInfo: userInfoFromStorage, at: jwtFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;