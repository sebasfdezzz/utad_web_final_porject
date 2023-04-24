const express = require("express");
const router = express.Router();
const {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview} = require('../controllers/webpages');
const {validatorGetByCity, validatorGetByCityAndActivity, validatorId, validatorCreate, validatorReview} = require('../validators/webpages');
const {authMiddleware, checkRol, checkWebpageOwnership , loginRequired} = require('../middleware/auth');
const {validatorLogin} = require('../validators/users');
//----------------admin--------------------------------------
//router.post('/', createWebpage); //para dar de alta su pagina (accesible por admins) porque al crear un merchant se crea la pagina y se le da el id al merchant

//-----------------merchants----------------------------------

//check ownership comparando el id sacado del token con el merchant id que tenga la pagina

router.put('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership ,updateWebpage); //para modificar su pagina (accesible por merchants)
router.post('/photos/',authMiddleware, checkRol(['merchant']), uploadImage); //para agregar fotos a una pagina (accesible por merchants)
router.post('/texts/',authMiddleware, checkRol(['merchant']), uploadText); //para agregar fotos a una pagina (accesible por merchants)
router.delete('/:id',authMiddleware, checkRol(['merchant']), validatorId , checkWebpageOwnership , deleteWebpage); //para borrar su pagina (accesible por merchants)

//-----------------users (public y registers)------------------
router.get('/',getWebpages); //ver todas las paginas que hay
router.get('/:id', validatorId, getWebpage); //ver una sola pagina
router.get('/search/:city',validatorGetByCity ,getByCity); //var las paginas de su ciudad
router.get('/search/:city/:activity',validatorGetByCityAndActivity ,getByCityAndActivity); //var las paginas de su ciudad y de esa actividad

//----------------registered users NO REQUIERE JWT solo email y password----------------------------- 
router.patch('/:id', validatorLogin, loginRequired, authMiddleware, validatorId, validatorReview, addReview); //para que los usuarios puedan reseñar una pagina

module.exports = router;