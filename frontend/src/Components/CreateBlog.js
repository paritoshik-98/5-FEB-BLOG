import React, { Component, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import  ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import { createBlogAction } from '../REDUX/actions/blogActions';


function CreateBlog() {

const userInfo = useSelector(state=>state.userLogin.userInfo)
const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo){
      navigate('/')
    }
  },[userInfo])

  const dispatch = useDispatch()

  const [content,setContent] = useState()
    
  const submit = () => {
      dispatch(createBlogAction(content))
  }

  const blogCreateStatus = useSelector(state=>state.blogCreate)

//   useEffect(()=>{
//     if(blogCreateStatus.success){
//       navigate('/dashboard')
//     }
//   },[blogCreateStatus])

    return(
        // process running 
        (blogCreateStatus.loading)?
        <TailSpin color="#00BFFF" height={80} width={80} />
        :(blogCreateStatus.success)?<h1>BLOG submitted</h1>:
        // before submitting or after process failed --- no loading atrr 
        <div>
            {(blogCreateStatus.error)?<div class="alert alert-danger">
            <strong>{blogCreateStatus.error}</strong>
            </div>:null}

            <br/>

            <CKEditor
                    editor={ClassicEditor}
                    data=''
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setContent(data)
                    } }
                />
                <button onClick={submit}>submit</button>
        </div>
    )
}

export default CreateBlog