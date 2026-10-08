const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")
const eventSchema = moongose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        time:{
            type: String,
            required: true
        },

        image: {
            url: String,
            filename: String
        },

        category: {
            type: String,
            enum: [
                "Puja",
                "Cultural",
                "Competition",
                "Social",
                "Other"
            ],
            default: "Other"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Event",eventSchema)