const { addUser, loginUser, genToken, loginUserGoogle, updatePic, updatePassword } = require("../controllers/userController");
const authuser = require('./authMiddleware')
const express = require('express');
const user = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
// signup route = /api/user/signup
router.post('/signup',addUser)

// login route =  /api/user/login
router.post('/login',loginUser,genToken)

// google login route = /api/user/Glogin
router.post('/Googlelogin',loginUserGoogle,genToken)

// edit profile_pic = /api/user/updatePic
router.post('/updatePic',authuser,updatePic)

// update password
router.post('/updatePassword',authuser,updatePassword)
    

// router.post('/set_password',authuser,async(req,res)=>{
//     const id = req.userid
//     bcrypt.hash(req.body.newPswd, saltRounds, async function(err, hash) {
//     user.findOneAndUpdate({_id:id},{password:hash},{new: true}, (err, doc) =>{
//         res.send('password updated')
//     })
//     })
// })

router.get('/home',authuser,(req,res)=>res.send('hello'))

module.exports = router
