const merchantsModel = require('../models/merchants');
const { matchedData } = require("express-validator");
const {createMerchantUser} = require('../controllers/users');
const {createWebpage, addMerchantId} = require('../controllers/webpages');
const { handleHttpError } = require('../utils/handleError');


const createMerchant = async (req,res)=>{
    try{
        const body = matchedData(req);
        const merchantJWT = await createMerchantUser(res, body.name, body.email); //se crea el user con role de merchant y regresa JWT
        const webpage_id = await createWebpage(); //se crea webpage y regresa id
        body.webpage_id = webpage_id; // se agrega la propiedad de webpage id al body
        const dataMerchant = await merchantsModel.create(body); //se crea finalmente el merchant
        const updatedWebpage = await addMerchantId(webpage_id, dataMerchant._id);

        const returnData = {
            merchantJWT: merchantJWT,
            webpage_id: webpage_id,
            merchant: dataMerchant,
            webpage: updatedWebpage
        }
        res.send(returnData);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATING_MERCHANT');
    }
}

const updateMerchant = async (req,res)=>{
    try{
        const {id, ...body} = matchedData(req) 
        const merchantJWT = await updateMerchant(res, body.name, body.email); //se crea el user con role de merchant y regresa JWT
        const webpage_id = await createWebpage(); //se crea webpage y regresa id
        body.webpage_id = webpage_id; // se agrega la propiedad de webpage id al body
        const dataMerchant = await merchantsModel.create(body); //se crea finalmente el merchant
    
        const returnData = {
            merchantJWT: merchantJWT,
            webpage_id: webpage_id,
            merchant: dataMerchant
        }
        res.send(returnData);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATING_MERCHANT');
    }}

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