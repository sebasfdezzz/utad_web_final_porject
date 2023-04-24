const merchantsModel = require('../models/merchants');
const { matchedData } = require("express-validator");
const {createMerchantUser, deleteMerchantUser} = require('../controllers/users');
const {createWebpage, addMerchantId} = require('../controllers/webpages');
const { handleHttpError } = require('../utils/handleError');


const createMerchant = async (req,res)=>{
    try{
        const body = matchedData(req);
        const merchantJWT = await createMerchantUser(res, body.name, body.email); //se crea el user con role de merchant y regresa JWT
        const webpage_id = await createWebpage(); //se crea webpage y regresa id
        body.webpage_id = webpage_id; // se agrega la propiedad de webpage id al body
        const dataMerchant = await merchantsModel.create(body); //se crea finalmente el merchant
        await addMerchantId(webpage_id, dataMerchant._id); //agrega merchant_id a la webpage creada

        const returnData = {
            merchantJWT: merchantJWT,
            webpage_id: webpage_id,
            merchant: dataMerchant
        }
        res.send(returnData);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATING_MERCHANT');
    }
}

const updateMerchant = async (req,res)=>{
    try{
        const {id, ...body} = matchedData(req);
        const {webpage_id} = await merchantsModel.findById(id);
        body.webpage_id = webpage_id;        //agregar webpage_id que no se le pasan en el request
        
        await merchantsModel.findByIdAndUpdate(id, body); //no regresa la info updateada
        const newData = merchantsModel.findById(id); //la nueva info

        res.send(newData);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_UPDATING_MERCHANT');
    }
}

const getMerchants = async (req,res)=>{
    try{
        const data = await merchantsModel.find({});
        console.log(data);
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_GETTING_MERCHANTS');
    }
}

const getMerchant = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const data = await merchantsModel.findById(id);
        res.send(data);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_GETING_MERCHANT' + req.params.id);
    }
}

const deleteMerchant = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const data = await merchantsModel.findById(id);
        const responseMerchantDelete = await merchantsModel.deleteOne({_id:id});
        const responseUserDelete = await deleteMerchantUser(res, data.name, data.email); // borrar el user creado
        const responseWebpageDelete = await sendRequest('http://localhost:3000/webpages/'+data.webpage_id)//borrar la webpage correspondiente
        
        const response = {
            merchantDelete: responseMerchantDelete,
            userDelete: responseUserDelete,
            webpageDelete: responseWebpageDelete
        }
        res.send(response);
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_DELETING_MERCHANT' + req.params.id);
    }
}

async function sendRequest(url){
    let response = await fetch(url);
    return await response.json();
}
module.exports = {createMerchant, updateMerchant, getMerchant,getMerchants, deleteMerchant};