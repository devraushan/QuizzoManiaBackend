const jwt = require("jsonwebtoken");
const Signature = "Ross";

const fetchuser= async (req, res, next)=>{
    try {
        const token = req.header("auth-token");
        if(!token){
            res.status(401).json({error:"unauthorised access"});
        }else{
            let str = jwt.verify(token,Signature);
            req.body.user=str.user;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorised access")
    }
}

module.exports = fetchuser;