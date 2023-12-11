const async = require('hbs/lib/async');
const jwt = require('jsonwebtoken');

const Student_Register = require('../models/Indivisual');

const dauth = async (req,res,next) =>{
    try {

        const token = req.cookies.jwtd;

        const verifyUser = jwt.verify(token, process.env.SECRET_WAY);

        const curruser = await Student_Register.findOne({email:verifyUser._id});

        req.dtoken = token;
        req.currStudent = curruser;
        
        next();
        
        
    } catch (error) {
        res.status (401).send(error);
       //res.render('/loginP');
    }


}

module.exports = dauth;