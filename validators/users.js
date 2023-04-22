const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorMerchanteRegister = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("email").exists().notEmpty().isEmail(),
    check("role").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateUpdate = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    check("age").exists().notEmpty().isNumeric({min: 13, max: 150}), //Puedes aplicarle un min y max también al número
    check("city").exists().notEmpty(),
    check("interests").exists().isArray(),
    check("acceptRecievingOffers").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUserByCity = [
    check("city").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDelete = [
    check("_id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
module.exports = { validatorCreateUpdate, validatorLogin, validatorGetUserByCity, validatorMerchanteRegister, validatorDelete }