const router = require('express').Router()
const userRoutes = require("./userRoutes")
const commentRoutes = require("./commentRoutes")
const eventRoutes = require("./eventRoutes")

router.use("/user", userRoutes)
router.use("/comments", commentRoutes)
router.use("/event", eventRoutes)

module.exports = router