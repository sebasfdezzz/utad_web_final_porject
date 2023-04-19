const express = require("express");
const router = express.Router();
const {createMerchant, updateMerchant, getMerchant,getMerchants, deleteMerchant} = require('../controllers/merchants');

//---------------------admins---------------------
router.post('/', createMerchant); //para dar de alta un negocio
router.put('/:id', updateMerchant); //para modificar un negocio
router.get('/', getMerchants); //ver todos los negocios
router.get('/:id', getMerchant); //consultar un negocio
router.delete('/:id', deleteMerchant); //borrar un negocio

module.exports = router;