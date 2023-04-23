const express = require("express");
const router = express.Router();
const {createUser, updateUser, deleteUser, getFromCity} = require('../controllers/users');
const { validatorCreateUpdate, validatorLogin, validatorGetUserByCity, validatorDelete } = require('../validators/users');
const {authMiddleware, checkRol} = require('../middleware/auth');

//---------------------public users-------------------------
router.post('/', validatorCreateUpdate, createUser); //para que los public users se registren

//---------------------registered users--------------------- //
//agregar middleware que resive el req.user y checa que el pasword y email coincidan
router.put('/:id', authMiddleware, updateUser); //para modificar sus datos (accesible por registered users only)
router.delete('/:id',authMiddleware, deleteUser); //para que el usuario se de de baja (accesible por registered users)

//-----------------merchants-------------------------------
router.get('/:city',authMiddleware, checkRol(['merchant']), getFromCity); //para que los merchants puedan ver los usuarios de alguna ciudad

module.exports = router;

