const usersModel = require('../models/users');
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");
const { handleHttpError } = require("../utils/handleError");

async function createMerchantUser(res, name, email){
    try{
        const body = {
            'name': name,
            'email': email,
            'role': 'merchant'
        }
        const dataUser = await usersModel.create(body);
        const token = await tokenSign(dataUser);
        const data = {
            merchantJWT: token,
            user_id: dataUser._id
        }
        return data;
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

async function deleteMerchantUser(res, user_id){
    try{
        const data = await usersModel.deleteOne({_id: user_id});
        return data;
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_DELETING_MERCHANT_USER");
    }
}

async function updateMerchantUser(res,id, name, email){
    try{
        const newBody= {
            'name': name,
            'email': email,
            'role': 'merchant'
        }
        const data = await usersModel.findByIdAndUpdate(id, newBody);
        return data;
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_MERCHANT_USER");
    }
}

const createUser = async (req,res)=>{
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strict: false }); //probar comenat para ver como regresa la contraseña 

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

const updateUser = async (req,res)=>{
    try{
        const user = req.user;
        const body = matchedData(req);
        const {_id} = user;

        const password = await encrypt(body.password);
        const newBody = {...body, password}; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        await usersModel.findByIdAndUpdate(_id, newBody);

        const newData = await usersModel.findById(_id); //la nueva info
        newData.set('password', undefined, { strict: false });

        res.send(newData);

    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_USER");
    }
}

const deleteUser = async (req,res)=>{
    try{
        const {_id} = req.user;
        const data = await usersModel.deleteOne({_id: _id});
        res.send(data);
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_DELETING_USER");
    }
}

const getFromCity = async (req,res)=>{
    try{
        const {city} = matchedData(req);
        let data = await usersModel.find({city: city, acceptRecievingOffers: true});
        data = data.map(user => user.email);
        res.send(data);
    }catch(err) {
        console.log(err);
        handleHttpError(res, "ERROR_RETRIEVING_USERS_BY_CITY");
    }
}

module.exports = {createUser, updateUser, deleteUser, getFromCity, createMerchantUser, deleteMerchantUser,updateMerchantUser};