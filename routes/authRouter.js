const express = require("express")
const passpot = require("passport")
const { title } = require("process")

const router = express.Router()

// ======================
// LOGIN PAGE
// ======================
router.get("/login",(req,res) => {
    res.render("pages/login",{
        title: "Admin Login | Kali Puja Community"
    })
})

// ======================
// LOGIN
// ======================
router.post("/login",

    passpot.authenticate("local",{
        failureRedirect: "/login"
    }),
    (req,res) => {
        res.redirect("/events")
    }
)

router.get("/logout",(req,res,next) => {
    req.logOut((err) => {
        if(err)  {
            return next(err)
        }
        res.redirect("/")
    })
})

module.exports = router