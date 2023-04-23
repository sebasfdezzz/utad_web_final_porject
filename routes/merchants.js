const express = require("express");
const router = express.Router();
const {createMerchant, updateMerchant, getMerchant,getMerchants, deleteMerchant} = require('../controllers/merchants');
const {authMiddleware, checkRol} = require('../middleware/auth');
const {validatorCreateUpdate, validatorId} = require('../validators/merchants');

//---------------------admins---------------------
router.post('/', authMiddleware, checkRol(['admin']),validatorCreateUpdate, createMerchant); //para dar de alta un negocio
router.put('/:id', authMiddleware, checkRol(['admin']),validatorId ,validatorCreateUpdate, updateMerchant); //para modificar un negocio
router.get('/', authMiddleware, checkRol(['admin']), getMerchants); //ver todos los negocios
router.get('/:id', authMiddleware, checkRol(['admin']),validatorId, getMerchant); //consultar un negocio
router.delete('/:id', authMiddleware, checkRol(['admin']),validatorId, deleteMerchant); //borrar un negocio

module.exports = router;