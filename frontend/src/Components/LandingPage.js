import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate ,Link} from "react-router-dom";
import store from '../REDUX/store';

function LandingPage() {

    return(<div>
        <button><Link to={'/login'}>LOGIN</Link></button>
        <button><Link to={'/signup'}>SIGNUP</Link></button>
    </div>)
}
export default LandingPage