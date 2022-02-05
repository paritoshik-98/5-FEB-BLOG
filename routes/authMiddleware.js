const jwt = require('jsonwebtoken')
// verify and get user middleware for protected route 
const authuser = async(req,res,next) => {
    at = req.headers['authtoken']
    
    if(at){
        try {
            const {userid,username} = jwt.verify(at,process.env.JWT_SECRET)
            console.log(userid,username)
            req.userid = userid
            req.username = username
            next()
        } catch (error) {
           res.send(401)
        }
        
    }
    else{
        res.send(401)
    }
}

module.exports = authuser