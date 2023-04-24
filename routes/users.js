const express = require("express");
const router = express.Router();
const {createUser, updateUser, deleteUser, getFromCity} = require('../controllers/users');
const { validatorCreateUpdate, validatorLogin, validatorGetUserByCity, validatorId } = require('../validators/users');
const {authMiddleware, checkRol, loginRequired} = require('../middleware/auth');

//---------------------public users-------------------------
router.post('/', validatorCreateUpdate, createUser); //para que los public users se registren

//---------------------registered users NO REQUIEREN JWT---------------------
router.put('/', validatorLogin, loginRequired, authMiddleware, validatorCreateUpdate, updateUser); //para modificar sus datos (accesible por registered users only)
router.delete('/', validatorLogin, loginRequired, authMiddleware, deleteUser); //para que el usuario se de de baja (accesible por registered users)
//quite el :id de PUT y DELETE para que solo sea necesaria la info de login

//-----------------merchants-------------------------------
router.get('/:city', authMiddleware, checkRol(['merchant']),validatorGetUserByCity, getFromCity); //para que los merchants puedan ver los usuarios de alguna ciudad

module.exports = router;

