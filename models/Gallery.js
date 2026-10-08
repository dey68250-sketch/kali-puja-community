const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        image: {
            url: {
                type: String,
                required: true
            },

            filename: {
                type: String
            }
        },

        category: {
            type: String,
            enum: [
                "Puja",
                "Cultural",
                "Decoration",
                "Community",
                "Other"
            ],
            default: "Other"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Gallery", gallerySchema);