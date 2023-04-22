const merchantsModel = require('../models/merchants');
const { matchedData } = require("express-validator");
const {createMerchantUser} = require('../controllers/users');
const {createWebpage} = require('../controllers/webpages');

const createMerchant = async (req,res)=>{
    const body = matchedData(req);
    const merchantJWT = await createMerchantUser(res, body.name, body.email); //se crea el user con role de merchant y regresa JWT
    const webpage_id = await createWebpage(); //se crea webpage y regresa id
    body.webpage_id = webpage_id;
    const dataMerchant = await merchantsModel.create(body);

    const returnData = {
        merchantJWT: merchantJWT,
        webpage_id: webpage_id,
        merchant: dataMerchant
    }
    //falta crear el merchant
    res.send(returnData);
}

const updateMerchant = async (req,res)=>{
    res.send('se ha modificado un comercio');
}

const getMerchants = async (req,res)=>{
    res.send('se ha obtenido todos los comercios');
}

const getMerchant = async (req,res)=>{
    res.send('se ha obtenido un comercio');
}

const deleteMerchant = async (req,res)=>{
    res.send('se ha borrado un comercio');
}

module.exports = {createMerchant, updateMerchant, getMerchant,getMerchants, deleteMerchant};