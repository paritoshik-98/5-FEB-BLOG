const jwt = require('jsonwebtoken')
// verify and get user middleware for protected route 
const authuser = async(req,res,next) => {
    at = req.headers['authtoken']
    
    if(at){
        try {
            const {userid,name} = jwt.verify(at,process.env.JWT_SECRET)
            console.log(userid,name)
            req.userid = userid
            req.name = name
            next()
        } catch (error) {
            console.log(error)
           res.status(401).send('unauthorized')
        }
        
    }
    else{
        res.status(401).send('unauthorized no token')
    }
}

module.exports = authuser