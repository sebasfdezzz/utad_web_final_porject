const mongoose = require("mongoose");
// const { UUID } = require("bson");
// const mongooseDelete = require("mongoose-delete");
// const { randomUUID } = require('crypto');

const merchantsScheme = new mongoose.Schema(
    {
        // _id: {
        //     type: UUID,
        //     default: () => randomUUID()
        // },
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
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//merchantsScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("merchants", merchantsScheme);