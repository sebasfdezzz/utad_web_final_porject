const webpagesModel = require('../models/webpages');

async function createWebpage(){
    const dataWebpage = await webpagesModel.create({});
    const webpage_id = dataWebpage._id;
    return webpage_id;
}

const updateWebpage = async (req,res)=>{
    res.send('se ha modificado una pagina');
}

const uploadImage = async (req,res)=>{
    res.send('se ha subido una foto');
}

const uploadText = async (req,res)=>{
    res.send('se ha subido un texto');
}

const deleteWebpage = async (req,res)=>{
    res.send('se ha borrado una pagina');
}

//sin validator
const getWebpages = async (req,res)=>{
    res.send('se han obtenido todas las paginas');
}

const getWebpage = async (req,res)=>{
    res.send('se ha obtenido una pagina');
}

const getByCity = async (req,res)=>{
    res.send('se ha buscado paginas por ciudad');
}

const getByCityAndActivity = async (req,res)=>{
    res.send('se ha buscado paginas por ciudad y actividad');
}



const addReview = async (req,res)=>{
    res.send('se ha agregado una reseña');
}
module.exports = {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview};