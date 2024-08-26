const router = require("express").Router()
const flashCardCtrl = require("../controllers/flashCardCtrl")
const protect = require("../middlewares/protectRoute")

router.post("/flashCards", protect.protectRoute, flashCardCtrl.createCard)
router.get("/all", protect.protectRoute, flashCardCtrl.getAllFlashCards)
router.get("/:id", protect.protectRoute, flashCardCtrl.fetchCard)
router.put("/:id", protect.protectRoute, flashCardCtrl.updateFlashCard)

module.exports = router