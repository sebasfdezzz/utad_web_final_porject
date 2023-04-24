const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreate = [
    check("merchant_id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


const validatorId = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetByCity = [
    check("city").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetByCityAndActivity = [
    check("city").exists().notEmpty(),
    check("activity").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorReview = [
    check("score").exists().notEmpty().isNumeric(),
    check("opinion").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorGetByCity, validatorGetByCityAndActivity, validatorId, validatorCreate, validatorReview}