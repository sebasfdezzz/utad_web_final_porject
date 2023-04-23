const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreate = [
    check("merchant_id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorImage = [
    check("images").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorTexts = [
    check("texts").exists().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorId = [
    check("_id").exists().notEmpty().isMongoId(),
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

module.exports = {validatorGetByCity, validatorGetByCityAndActivity, validatorId, validatorImage, validatorTexts, validatorCreate}