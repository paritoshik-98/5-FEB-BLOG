const express = require('express');
const router = express.Router();
const blog = require('../models/blog');
const authuser = require('./authMiddleware');

// get all blogs = /api/blog/all
router.get('/all',authuser,async(req,res)=> {
  try {
    const doc = await blog.find({});
    res.send(doc);
  } catch (error) {
    res.status(403).send('Something went wrong !')
  }
  });

                                                 // CRUD //
// --- add new article 'CREATE' 
router.post('/add',authuser,async(req,res)=>{
  try {
    const {content}=req.body
    if(!content){res.send('blog cannot be blank')}
    const author = req.username
    console.log(author)
    const doc = new blog({
        content:content,
        author:author
    })
    await doc.save()
    res.send('submitted')
  } catch (error) {
    res.status(403).send('Something went wrong !')
  }
    
})                                                 

// get user blogs
router.get('/myBlogs',authuser,async(req,res)=>{
  try {
    const user = req.username
        const doc = await blog.find({author:user})
        res.send(doc)
  } catch (error) {
    res.status(403).send('Something went wrong !')
  }
        
    })

// update blog by id
router.put('/:id/edit',authuser,async(req,res)=>{
  try {
    const{content}=req.body
    if(!content){res.send('blog cannot be blank')}
    const id = req.params.id
    const filter = {_id:req.params.id};
    const update = {content:content,author:req.username,date:Date.now()};
    await blog.findOneAndUpdate(filter, update, {
        new: true
      }).then(res.send('blog edited'))  
  } catch (error) {
    res.status(403).send('Something went wrong !')
  }
    
    })

// delete blog by id
router.delete('/:id/delete',authuser,async(req,res)=>{
  try {
    await blog.deleteOne({ _id: req.params.id }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send('deleted');
      }
    });
  } catch (error) {
    res.status(403).send('Something went wrong !')
  }
    
})

///////////////////////// cloudinary multer
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "BLOG",
  },
});
///////////////////////////////////////////multer image handling////////////////
var multer = require('multer');

var upload = multer({ storage: storage });

/// rouute /api/blog/image_upload
router.post('/image_upload', authuser,upload.single('upload'),(req,res)=>{
  try{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log(req.file.path)
    res.json({url:req.file.path})
  }
  catch{
    res.status(403).send('Something went wrong !')
  }
    })


module.exports = router