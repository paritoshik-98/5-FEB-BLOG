import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link , useNavigate} from "react-router-dom";
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CreateBlog from './Components/CreateBlog';

function App() {


  return (
    <Routes>
<Route exact path = '/' element = {<LandingPage/>}></Route>
<Route exact path = '/login' element = {<Login/>}></Route>
<Route exact path = '/signup' element = {<Signup/>}></Route>
<Route exact path = '/dashboard' element = {<Dashboard/>}></Route>
<Route exact path = '/add' element = {<CreateBlog/>}></Route>
{/* read 1 blog */}
{/* <Route exact path = '/blog/:id' element = {<ReadBlog/>}></Route> */}
{/* edit blog */}
{/* <Route exact path = '/blog/:id/edit' element = {<EditBlog/>}></Route> */}
{/* add new blog */}
{/* <Route exact path = '/blog/add' element = {<NewBlog/>}></Route> */}

{/* <Route exact path = '/myarticles' element = {<MyArticles/>}></Route>
<Route exact path = '/logout' element = {<Logout/>}></Route>
<Route exact path = '/dashboard' element = {<Dashboard/>}></Route>
<Route exact path = '/login' element = {<Login/>}></Route>
<Route exact path = '/signup' element = {<Signup/>}></Route>
<Route exact path = '/articles/:id' element = {<Getarticlepath/>}></Route>
<Route exact path = '/articles/add' element = {<NewArticle/>}></Route>
<Route exact path = '/articles/:id/edit' element = {<UpdateArticle/>}></Route>
<Route exact path = '/image' element = {<Image/>}></Route>
<Route exact path = '/blog' element = {<Article/>}></Route> */}
  
</Routes>
  );
}

export default App;
