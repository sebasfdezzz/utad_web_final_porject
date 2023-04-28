const mongoose = require("mongoose");

const usersScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String
        },
        age: {
            type: Number
        },
        city: {
            type: String
        },
        interests: {
            type: [String]
        },
        acceptRecievingOffers: {
            type: Boolean
        },
        role:{
            type: String,
            enum: ["user", "admin", "merchant"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("users", usersScheme);