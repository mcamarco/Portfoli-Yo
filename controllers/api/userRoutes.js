const router = require("express").Router()
const { User } = require("../../models")
const passwordAuth = require("../../utils/passwordAuth")

//Post request to create a new user
router.post("/", async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        req.session.save(() => {
            req.session.loggedIn = true,
                req.session.userId = userData.id,
                req.session.username = req.body.username

            res.status(200).json(userData)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Post request to login a user
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        })

        if (!userData) {
            res.status(400).json({ message: "Incorrect username or password. Please try again!" })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect username or password. Please try again!" })
            return
        }

        req.session.save(() => {
            req.session.loggedIn = true
            req.session.userId = userData.id
            req.session.username = req.body.username

            res.status(200).json({ user: userData, message: "You are now logged in!" })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Post request to log out a user
router.post("/logout", passwordAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

//Put request to update user profile
router.put("/:id", passwordAuth, async (req, res) => {
    try {
        const updatedProfile = await User.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                linkedinURL: req.body.linkedinURL,
                location: req.body.location,
                industry: req.body.industry,
                jobTitle: req.body.jobTitle,
                aboutMe: req.body.aboutMe,
                //headshot??
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updatedProfile)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Delete request to delete a user profile 
router.delete("/:id", passwordAuth, async (req, res) => {
    try {
        const profileData = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!profileData) {
            res.status(404).json({ message: "No profile found with this id" })
            return
        }
        res.status(200).json(profileData)
    } catch (err) {
        res.status(500).json(err)
    }
})


// TODO: REMOVE AFTER TESTING
router.get("/", async (req, res) => {
    try {
        const profileData = await User.findAll({
        })
        if (!profileData) {
            res.status(404).json({ message: "No profile found with this id" })
            return
        }
        res.status(200).json(profileData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router