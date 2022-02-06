const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
var generator = require('generate-password');


// register = post /api/user/signup
const addUser = async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await User.findOne({email:email})
    if(user){
        res.status(403).send('User already exists')
        // throw new Error("User already exists")
    }
    else{
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        var reset = generator.generate({
            length: 5,
            numbers: true
        });
        const doc = new User({
            name:name,
            email:email,
            password:hash,
            pswd_reset_token:reset
        })
        await doc.save()
        res.send('User registered successfully')
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
        req.name = user.name;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        console.log('inside match')
        next()
    }
    else{
        res.status(403).send('incorrect password')
    }
    }
    else{
        res.status(404).send('register to continue')
    }
}

// Googlelogin 
const loginUserGoogle = async(req,res,next)=>{
    const{email}=req.body
    const user = await User.findOne({email:email})
    if(user)
    {
        req.name = user.name;
        req.email = user.email;
        req.userid = user._id;
        req.profile_pic = user.profile_pic;
        next()
    }
    // register if first login
    else{
        const {name,email,profile_pic} = req.body;
    const password = 'default'
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const doc = new User({
            name:name,
            email:email,
            password:hash,
            profile_pic:profile_pic
        })
        await doc.save()  
        const user = await User.findOne({email:email})
    if(user)
    {
        req.name = user.name;
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
    const at = jwt.sign({name:req.name,userid:req.userid},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.send({at:at,user:{name:req.name,email:req.email,id:req.userid,profile_pic:req.profile_pic}})
}


// update profile_pic
const updatePic = (req,res)=>{
    const id = req.userid // from auth user middleware
const {url} = req.body
console.log(id,url)
User.findOneAndUpdate({_id:id}, {profile_pic:url}, {new: true}, (err, doc) => {
    if (err) {
        res.status(500).send('something went wrong when updating profile_pic!')
    }

    res.send(doc)
});
}


//update password
const updatePassword = async(req,res)=>{
        const id = req.userid
        bcrypt.hash(req.body.newPswd, saltRounds, async function(err, hash) {
        User.findOneAndUpdate({_id:id},{password:hash},{new: true}, (err, doc) =>{
            if (err) {
                res.status(500).send('something went wrong when updating password!')
            }
            res.send(doc)
        })
        })
    }

module.exports = {addUser,loginUser,genToken,loginUserGoogle,updatePic,updatePassword}