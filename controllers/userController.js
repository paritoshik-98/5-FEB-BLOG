const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
var generator = require('generate-password');


// register = post /api/user/signup
const addUser = async(req,res)=>{
    const {username,email,password} = req.body;
    const user = await User.findOne({email:email})
    if(user){
        res.json({msg:'User already exists',id:'Semail'})
    }
    const uname = await User.findOne({username:username})
    if(uname){
        res.json({msg:'Username is already taken',id:'Susername'})
    }
    else{
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        var reset = generator.generate({
            length: 5,
            numbers: true
        });
        const doc = new User({
            username:username,
            email:email,
            password:hash,
            pswd_reset_token:reset
        })
        await doc.save()
        res.json({msg:'User registered successfully',id:'success'})
    });
    }}

// login 
const loginUser = async(req,res,next)=>{
    const{email,password}=req.body
    const user = await User.findOne({email:email})
    if(user)
    {
        const match = await bcrypt.compare(password, user.password);
    if(match) {
        req.username = user.username;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        next()
    }
    else{res.json({msg:'password incorrect',id:'pi'})}
    }
    else{res.json({msg:'register to continue',id:'nu'})}
}

// Googlelogin 
const loginUserGoogle = async(req,res,next)=>{
    const{email,username}=req.body
    const user = await User.findOne({email:email})
    if(user)
    {
        req.username = user.username;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        next()
    }
    // register since first login
    else{
        const {username,email,profile_pic} = req.body;
    const password = 'default'
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const doc = new User({
            username:username,
            email:email,
            password:hash,
            profile_pic:profile_pic
        })
        await doc.save()  
        const user = await User.findOne({email:email})
    if(user)
    {
        req.username = user.username;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        next()
    }
    });
   }
}


// generate accesstoken for loggedin user
const genToken = async(req,res) => {
    const at = jwt.sign({username:req.username,userid:req.userid},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.json({at:at,msg:'login successfull',id:'ls',user:{username:req.username,email:req.email,id:req.userid,profile_pic:req.profile_pic}})
}


// update profile_pic
const updatePic = (req,res)=>{
const {id,url} = req.body
console.log(id,url)
User.findOneAndUpdate({_id:id}, {profile_pic:url}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    res.json({id:'u'})
});
}


// update password
// const updatePassword = (req,res)=>{
//     const userid = req.userid
//     const token = jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'10m'})
//     // send password from nodemailer to useremail
// }
module.exports = {addUser,loginUser,genToken,loginUserGoogle,updatePic}