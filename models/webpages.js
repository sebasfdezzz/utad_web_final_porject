const mongoose = require("mongoose");
// const { UUID } = require("bson");
// const mongooseDelete = require("mongoose-delete");
// const { randomUUID } = require('crypto');

const webpagesScheme = new mongoose.Schema(
    {
        // _id: {
        //     type: UUID,
        //     default: () => randomUUID()
        // },
        merchant_id: {
            type: mongoose.Types.ObjectId
        },
        city: {
            type: String
        },
        activity: {
            type: String
        },
        title: {
            type: String
        },
        summary: {
            type: String
        },
        texts: {
            type: [String]
        },
        images: {
            type: [String]
        },
        scoring: {
            type: Number,
            default: 0
        },
        number_of_reviews: {
            type: Number,
            default: 0
        },
        reviews: {
            scores: {
                type: [Number]
            },
            opinions: {
                type: [String]
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//businessScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("webpages", webpagesScheme);