const express = require("express")
const router = express.Router()
const Event = require("../models/Event")
const isLoggedIn = require("../middleware/isLoggedIn")

router.get("/",async (req,res) => {
    const events = await Event.find().sort({date: 1})
    res.render("pages/events.ejs",{
        title : "Events | Kali Puja Community",
        events
    })
})

router.get("/new",isLoggedIn,(req,res) => {
    res.render("pages/new-event.ejs",{
        title: "Create Event | Kali Puja Community"
    })
})

router.post("/",isLoggedIn,async (req,res) => {
    const event = new Event(req.body)
    await event.save()
    res.redirect("/events")
})

router.get("/:id/edit",isLoggedIn,async (req,res) => {
    const {id} = req.params
    const event = await Event.findById(id)
    res.render("pages/edit-event.ejs",{
        title: "Edit Event | Kali Puja Community",
        event
    })
})

router.put("/:id",isLoggedIn, async (req, res) => {

    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.redirect("/events");
});

router.delete("/:id",isLoggedIn,async (req,res) => {
    const {id} = req.params
    await Event.findByIdAndDelete(id)
    res.redirect("/events")
})

module.exports = router