const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJWT")
const usersModel = require("../models/users")

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        const token = req.headers.authorization.split(' ').pop() 
        const dataToken = await verifyToken(token)
        if(!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        const user = await usersModel.findById(dataToken._id);
        req.user = user // Inyecto al user en la petición
        next()
    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const checkRol = (roles) => (req, res, next) => {
    try{
        const {user} = req
        const userRol = user.role
        const checkValueRol = roles.includes(userRol)
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = {authMiddleware, checkRol} 