const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/env.config');

const roleMiddleware=(allowedRoles=[])=>{
    return(req, res, next)=>{
        const authHeader=req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    const token=req.header.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    try{
        const decoded=jwt.verify(token, JWT_SECRET);
        req.user=decoded.user;
       if(allowedRoles.length && !allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: 'Access denied insuffient role'})
       }
        next();
    }catch(error){
        res.status(401).json({message: 'Token not valid'});
    }
    }
    
};

module.exports=roleMiddleware;