const express = require('express');
const router = express.Router();
const blog = require('../models/blog');
const authuser = require('./authMiddleware');

// get all blogs = /api/blog/all
router.get('/all',authuser,async(req,res)=> {
    const doc = await blog.find({});
    res.send(doc);
    }
    );

                                                 // CRUD //
// --- add new article 'CREATE' 
router.post('/add',authuser,async(req,res)=>{
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
})                                                 

// get user blogs
router.get('/myBlogs',authuser,async(req,res)=>{
        const user = req.username
        const doc = await blog.find({author:user})
        res.send(doc)
    })

// update blog by id
router.put('/:id/edit',authuser,async(req,res)=>{
    const{content}=req.body
    if(!content){res.send('blog cannot be blank')}
    const id = req.params.id
    const filter = {_id:req.params.id};
    const update = {content:content,author:req.username,date:Date.now()};
    await blog.findOneAndUpdate(filter, update, {
        new: true
      }).then(res.send('blog edited'))  
    })

// delete blog by id
router.delete('/:id/delete',authuser,async(req,res)=>{
    await blog.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send('deleted');
        }
      });
})

module.exports = router