const mongoose = require("mongoose");

const merchantsScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        CIF: {
            type: String,
            unique: true
        },
        address:{
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        phone_num: {
            type: String
        },
        webpage_id: {
            type: mongoose.Types.ObjectId,
            unique: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("merchants", merchantsScheme);