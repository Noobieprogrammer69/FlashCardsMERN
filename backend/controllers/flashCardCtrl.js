const Card = require("../models/cardModel")

const flashCardCtrl = {
    createCard: async (req, res) => {
        try {
            const { title, description, cards } = req.body; // Cards is an array of {term, definition} objects
            const userId = req.user._id;

            const newFlashCard = new Card({
                title, 
                description, 
                cards, // Saving the array directly
                createdBy: userId
            });

            await newFlashCard.save();

            res.status(201).json(newFlashCard);
        } catch (error) {
            console.log("createFlashcard Error:", error);
            res.status(500).json({ error: error.message });
        }
    },

    fetchCard: async (req, res) => {
        try {
            const cardId = req.params.id;
            if (!cardId) return res.status(400).json({ error: "Card ID is required" });
    
            const card = await Card.findById(cardId);
    
            if (!card) return res.status(404).json({ error: "Card not found" });
    
            res.status(200).json(card);
        } catch (error) {
            console.log("fetchCard Error:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllFlashCards: async (req, res) => {
        try {
          const cards = await Card.find().populate({
            path: 'createdBy',
            select: 'username' // Fetch only the username field
          });
    
          res.status(200).json({ allCards: cards });
        } catch (error) {
          console.error("Get All Cards Error:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateFlashCard: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
    
            // Find and update the flashcard
            const flashCard = await Card.findByIdAndUpdate(id, updatedData, { new: true });
            
            if (!flashCard) {
                return res.status(404).json({ message: 'Flashcard not found' });
            }
    
            res.status(200).json(flashCard);
        } catch (error) {
            console.error("Error updating flashcard:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = flashCardCtrl