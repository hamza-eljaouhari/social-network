
const jwt = require('jsonwebtoken')
module.exports.checkJWT = async (req,res,next) => {

    const token = req.header('authorization')
    if(!token) return res.status(401).send({message : 'Token not found'})

    try{
        let decoded = jwt.verify(token,process.env.JWT_ENCRYPTION);
        req.auth = decoded
        return next();

    }catch(error){
        return res.status(401).send({message : 'Invalid token'})
    }
}