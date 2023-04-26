const express = require("express");
const router = express.Router();
const {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview, MerchantcreateWebpage} = require('../controllers/webpages');
const {validatorGetByCity, validatorGetByCityAndActivity, validatorId,validatorAddText,validatorAddImages, validatorCreate, validatorReview, validatorCreateUpdate} = require('../validators/webpages');
const {authMiddleware, checkRol, checkWebpageOwnership , loginRequired} = require('../middleware/auth');
const {validatorLogin} = require('../validators/users');

//-----------------merchants----------------------------------
router.post('/',authMiddleware, checkRol(['merchant']), validatorCreateUpdate, MerchantcreateWebpage); //para dar de alta su pagina en caso de que la hayan borrado, solo pueden tener uno
router.put('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership , validatorCreateUpdate,updateWebpage); //para modificar su pagina (accesible por merchants)
router.patch('/photos/:id',authMiddleware, checkRol(['merchant']),validatorId , checkWebpageOwnership, validatorAddImages, uploadImage); //para agregar fotos a una pagina (accesible por merchants)
router.patch('/texts/:id',authMiddleware, checkRol(['merchant']),validatorId , checkWebpageOwnership,validatorAddText, uploadText); //para agregar fotos a una pagina (accesible por merchants)
router.delete('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership , deleteWebpage); //para borrar su pagina (accesible por merchants)

//-----------------users (public y registers)------------------
router.get('/',getWebpages); //ver todas las paginas que hay
router.get('/:id', validatorId, getWebpage); //ver una sola pagina
router.get('/search/:city',validatorGetByCity ,getByCity); //var las paginas de su ciudad
router.get('/search/:city/:activity',validatorGetByCityAndActivity ,getByCityAndActivity); //var las paginas de su ciudad y de esa actividad

//----------------registered users NO REQUIERE JWT solo email y password----------------------------- 
router.patch('/:id', validatorLogin, loginRequired, authMiddleware, validatorId, validatorReview, addReview); //para que los usuarios puedan reseñar una pagina

module.exports = router;