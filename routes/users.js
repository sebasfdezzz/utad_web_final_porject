const express = require("express");
const router = express.Router();
const {createUser, updateUser, deleteUser, getFromCity} = require('../controllers/users');


//---------------------public users-------------------------
router.post('/', createUser); //para que los public users se registren

//---------------------registered users---------------------
router.put('/:id', updateUser); //para modificar sus datos (accesible por registered users only)
router.delete('/:id', deleteUser); //para que el usuario se de de baja (accesible por registered users)

//-----------------merchants-------------------------------
router.get('/:city', getFromCity); //para que los merchants puedan ver los usuarios de alguna ciudad

module.exports = router;

