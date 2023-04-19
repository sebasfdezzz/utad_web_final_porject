const merchantsModel = require('../models/merchants');

const createMerchant = async (req,res)=>{
    res.send('se ha creado un comercio');
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