const router = require("express").Router()
const { User, Event, Comment } = require("../models")
const passwordAuth = require("../utils/passwordAuth")

//Get request to render homepage
router.get("/", (req, res) => {
    try {
        res.render("homepage", {
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render profile page of logged in user
router.get("/profile/:id", passwordAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            // include: [
            //     {
            //         model: User, 
            //         attributes: ["username", "email", "firstName", "lastName", "linkedinURL", "location", "industry", "jobTitle", "aboutMe"]
            //     }
            // ]
        })
        const user = userData.get({ plain: true })
        console.log(user)
        res.render("profile", {
            ...user,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render dashboard events page to render all events of logged in user 
router.get("/dashboard", passwordAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            include: [
                { model: Event }
            ]
        })

        const user = userData.get({ plain: true })

        res.render("dashboard", {
            ...user,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render event page to get all event data joined with user data 
router.get("/events", passwordAuth, async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username", "id"]
                },
            ],
        })

        const events = eventData.map((ev) => ev.get({ plain: true }))

        res.render("events", {
            events,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render single event joined with user data and comment data 
router.get("/events/:id", async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ["username"]
                    },
                },
            ],
        })
        const event = eventData.get({ plain: true })

        res.render("singleEvent", {
            ...event,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            postId: req.params.id
        })
    } catch (err) {
        res.status(500).json(err)
    } 
})

//Get request to render login page 
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard")
        return
    }

    res.render("login")
})

module.exports = router