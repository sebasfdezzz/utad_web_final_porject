const usersModel = require('../models/users');
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");
const { handleHttpError } = require("../utils/handleError");
const users = require('../models/users');

const createMerchantUser = async (req, res) => {
    try{
        const body = matchedData(req);
        const dataUser = await usersModel.create(body);
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data);  
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}
//sin validator
const createUser = async (req,res)=>{
    res.send('se ha creado un usuario');
}

const updateUser = async (req,res)=>{
    res.send('se ha modificado un usuario');
}

const deleteUser = async (req,res)=>{
    res.send('se ha borrado un usuario');
}

const getFromCity = async (req,res)=>{
    res.send('se ha regresado usuarios de una ciudad');
}

module.exports = {createUser, updateUser, deleteUser, getFromCity};