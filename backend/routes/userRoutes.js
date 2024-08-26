const userCtrl = require("../controllers/userCtrl")

const router = require("express").Router()

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.login)
router.post("/logout", userCtrl.logoutUser)

module.exports = router