const { handleHttpError } = require("../utils/handleError");
const { verifyToken, tokenSign } = require("../utils/handleJWT");
const usersModel = require("../models/users");
const merchantsModel = require("../models/merchants");
const {compare, encrypt} = require('../utils/handlePassword');
const { matchedData } = require("express-validator");

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401);
            return;
        }
        const token = req.headers.authorization.split(' ').pop(); 
        const dataToken = await verifyToken(token);
        if(!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        const user = await usersModel.findById(dataToken._id);
        req.user = user // Inyecto al user en la petición
        next()
    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

const checkRol = (roles) => (req, res, next) => { //es necesario signear el rol en el JWT?
    try{
        const {user} = req;
        const userRol = user.role;
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403);
            return;
        }
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
}

const loginRequired = async (req, res, next) => { //necesita que la peticion se le pase en el cuerop el email y password
    try{
        const {email, password} = matchedData(req); //no  se si lo haga bien

        const user = await usersModel.find({email: email});

        const userPass = user.password; //checar si si la esta regresando por lo del select: false

        const check = await compare(password, userPass);

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        const token = tokenSign(user);
        req.headers.authorization = 'Bearer ' + token;
        console.log('login session validated');
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

const checkWebpageOwnership = async (req, res, next) => {
    try{
        // const {user, id} = matchedData(req);
        const {user} = req;
        const id = req.params.id;

        const merchantData = await merchantsModel.find({name: user.name, email: user.email});
        
        const check = merchantData.webpage_id == id;

        if(!check){
            handleHttpError(res, "NOT_OWNER_OF_WEBPAGE", 401);
            return;
        }
        next();
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = {authMiddleware, checkRol, loginRequired, checkWebpageOwnership} 