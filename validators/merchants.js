const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateUpdate = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("CIF").exists().notEmpty(),
    check("address").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("phone_num").exists().notEmpty(),
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

module.exports = {validatorCreateUpdate, validatorId}