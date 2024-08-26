const mongoose = require("mongoose");

const flashcardSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    cards: [{
        term: {
            type: String,
            trim: true,
            required: true,
        },
        definition: {
            type: String,
            trim: true,
            required: true,
        },
    }],

    numberOfCards: {
        type: Number,
        default: 0, 
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Card", flashcardSchema);
