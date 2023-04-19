const mongoose = require("mongoose");
// const { UUID } = require("bson");
// const mongooseDelete = require("mongoose-delete");
// const { randomUUID } = require('crypto');

const usersScheme = new mongoose.Schema(
    {
        // _id: {
        //     type: UUID,
        //     default: () => randomUUID()
        // },
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String,
            select: false
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
        }
        // role:{
        //     type: String,
        //     enum: ["user", "admin", "merchant"],
        //     default: "user"
        // }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//usersScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("users", usersScheme);