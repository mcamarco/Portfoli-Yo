const router = require("express").Router()
const { User, Event, Comment } = require("../../models")
const passwordAuth = require("../../utils/passwordAuth")

//Get request to render homepage
router.get("/", (req, res) => {
    try {
        res.render("homepage", {
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render profile page of logged in user
router.get("/profile/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ["username", "email", "firstName", "lastName", "linkedinURL", "location", "industry", "jobTitle", "aboutMe"]
                }
            ]
        })
        const user = userData.get({ plain: true })

        res.render("profile", {
            ...user,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render dashboard page to render all events of logged in user 

//Get request to render event page to get all event data joined with user data 

//Get request to render single event joined with user data and comment data 

//Get request to render login page 