import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const userInfo = useSelector(state=>state.userLogin.userInfo)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userInfo){
      navigate('/')
    }
  },[userInfo])

    return(
        <>DASHBOARD</>
    )
}

export default Dashboard