const express = require("express");
const router = express.Router();
const {createWebpage, updateWebpage,uploadImage,uploadText,deleteWebpage,getWebpages,getWebpage, getByCity, getByCityAndActivity, addReview} = require('../controllers/webpages');

//-----------------merchants----------------------------------
router.post('/', createWebpage); //para dar de alta su pagina (accesible por merchants)
router.put('/:id', updateWebpage); //para modificar su pagina (accesible por merchants)
router.post('/photos/', uploadImage); //para agregar fotos a una pagina (accesible por merchants)
router.post('/texts/', uploadText); //para agregar fotos a una pagina (accesible por merchants)
router.delete('/:id', deleteWebpage); //para borrar su pagina (accesible por merchants)

//-----------------users (public y registers)------------------
router.get('/',getWebpages); //ver todas las paginas que hay
router.get('/:id',getWebpage); //ver una sola pagina
router.get('/search/:city',getByCity); //var las paginas de su ciudad
router.get('/search/:city/:activity',getByCityAndActivity); //var las paginas de su ciudad y de esa actividad

//----------------registered users-----------------------------
router.patch('/:id', addReview); //para que los usuarios puedan reseñar una pagina

module.exports = router;