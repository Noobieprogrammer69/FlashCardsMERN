const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        maxLength: 25,
        required: true
    },

    name: {
        type: String,
        trim: true,
        maxLength: 25,
        required: true
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userModel)