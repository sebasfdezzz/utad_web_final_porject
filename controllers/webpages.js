const { matchedData } = require('express-validator');
const webpagesModel = require('../models/webpages');
const merchantsModel = require('../models/merchants');
const { handleHttpError } = require('../utils/handleError');

async function createWebpage(){
    const dataWebpage = await webpagesModel.create({});
    const webpage_id = dataWebpage._id;
    return webpage_id;
}

async function addMerchantId(id, merchant_id){
    const body = await webpagesModel.findById(id);
    body.merchant_id = merchant_id;
    await webpagesModel.findByIdAndUpdate(id, body); //no regresa la info updateada
    const newDataWebpage = await webpagesModel.findById(id);
    return newDataWebpage;
}

const updateWebpage = async (req,res)=>{
    try{
        const {id, ...body} = matchedData(req); //ver que regrese axactamente mathcedData y como cambia con distintos validators
        await webpagesModel.findByIdAndUpdate(id, body); //no regresa la info updateada
        const newData = await webpagesModel.findById(id); //la nueva info
        res.send(newData);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_UPDATING_WEBPAGE');
    }
}

const MerchantcreateWebpage = async (req,res)=>{
    try{
        const user = req.user;
        const merchant = (await merchantsModel.find({user_id: user._id}))[0];
        const webpageExists = (merchant.webpage_id != null);
        if(webpageExists){
            res.send({
                message: 'Este comercio ya cuenta con una pagina web', 
                webpage_id: merchant.webpage_id
            });
            return;
        }
        const body = matchedData(req);
        body.merchant_id = merchant._id;
        const data = await webpagesModel.create(body); 
        await merchantsModel.findByIdAndUpdate(merchant._id, {webpage_id: data._id});        //pasar nuevo id a merchant
        const updateMerchant = await merchantsModel.findById(merchant._id);
        res.send({createdWebPage: data, updatedMerchant: updateMerchant});
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_CREATING_WEBPAGE');
    }
}

const uploadImage = async (req,res)=>{
    try{
        const {id, images} = matchedData(req);

        const current = await webpagesModel.findById(id);
        current.images.push(...images);
        await webpagesModel.findByIdAndUpdate(id, current);
        const newData = await webpagesModel.findById(id);
        res.send(newData);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_UPLOADING_IMAGES');
    }
}

const uploadText = async (req,res)=>{
    try{
        const {id, texts} = matchedData(req);

        const current = await webpagesModel.findById(id);
        current.texts.push(...texts);
        await webpagesModel.findByIdAndUpdate(id, current);
        const newData = await webpagesModel.findById(id);
        res.send(newData);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_UPLOADING_TEXT');
    }
}

const deleteWebpage = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const merchant = (await merchantsModel.find({webpage_id: id}))[0];
        await merchantsModel.findByIdAndUpdate(merchant._id, {webpage_id: null});
        const updatedMerchant = await merchantsModel.findById(merchant._id);
        const response = await webpagesModel.deleteOne({_id:id});
        
        res.send({deleteWebpage: response, updatedMerchant: updatedMerchant});
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_DELETING_WEBPAGE');
    }
}

const cascadeDeleteWebpage = async (res, id)=>{
    try{
        const response = await webpagesModel.deleteOne({_id:id});
        return response;
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_DELETING_WEBPAGE');
    }
}

//sin validator
const getWebpages = async (req,res)=>{
    try{
        const scoring = req.query.scoring;
        if(scoring){
            const data = await webpagesModel.find({}).sort({scoring: -1});
            res.send(data);
            return;
        }
        const data = await webpagesModel.find({});
        res.send(data);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_GETTING_ALL_WEBPAGE');
    }
}

const getWebpage = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const data = await webpagesModel.findById(id);
        res.send(data);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_GETTING_WEBPAGE');
    }
}

const getByCity = async (req,res)=>{
    try{
        const {city} = matchedData(req);
        const data = await webpagesModel.find({city: city});
        res.send(data);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_GETTING_WEBPAGES_BY_CITY');
    }
}

const getByCityAndActivity = async (req,res)=>{
    try{
        const {city, activity} = matchedData(req);
        const data = await webpagesModel.find({city: city, activity: activity});
        res.send(data);
    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_GETTING_WEBPAGES_BY_CITY_AND_ACTIVITY');
    }
}


//para registered users
const addReview = async (req,res)=>{
    try{
        const {id, score, opinion} = matchedData(req);
        const {reviews, scoring, number_of_reviews} = await webpagesModel.findById(id);

        const newOpinion = req.user.name + ": " + opinion;
        reviews.scores.push(score);
        reviews.opinions.push(newOpinion);
        const newScoring = reviews.scores.reduce((a, b) => a + b, 0) / reviews.scores.length;
        const newNumber_of_reviews = number_of_reviews + 1;
        const newData = {
            reviews: reviews,
            scoring: newScoring,
            number_of_reviews: newNumber_of_reviews
        }
        await webpagesModel.findByIdAndUpdate(id, {$set: newData});
        const response = await webpagesModel.findById(id);
        res.send(response);

    }catch(err){
        console.log(res);
        handleHttpError(res, 'ERROR_ADDING_REVIEW');
    }
}
module.exports = {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview,addMerchantId,cascadeDeleteWebpage, MerchantcreateWebpage };