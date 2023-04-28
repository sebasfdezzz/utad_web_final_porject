const mongoose = require("mongoose");

const webpagesScheme = new mongoose.Schema(
    {
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

module.exports = mongoose.model("webpages", webpagesScheme);