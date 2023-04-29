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
    check("score").exists().notEmpty().isNumeric({min: 0, max: 5}),
    check("opinion").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateUpdate = [
    check("city").optional(),
    check("activity").optional(),
    check("title").optional(),
    check("summary").optional(),
    check("texts").optional(),
    check("images").optional(),
    check("scoring").isEmpty(),
    check("number_of_reviews").isEmpty(),
    check("reviews").isEmpty(),
    check("merchant_id").isEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddText = [
    check("texts").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddImages = [
    check("images").exists().notEmpty().isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorGetByCity, validatorGetByCityAndActivity, validatorId, validatorCreate,validatorAddText, validatorReview, validatorCreateUpdate, validatorAddImages}