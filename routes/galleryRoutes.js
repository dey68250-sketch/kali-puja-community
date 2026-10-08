const express = require("express");
const router = express.Router();

const Gallery = require("../models/Gallery");
const upload = require("../utils/multer");
const isLoggedIn = require("../middleware/isLoggedIn");


// ======================
// VIEW GALLERY
// PUBLIC
// ======================

router.get("/", async (req, res) => {

    try {

        const gallery = await Gallery.find()
            .sort({ createdAt: -1 });

        res.render("pages/gallery", {
            title: "Gallery | Kali Puja Community",
            gallery
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Failed to load gallery");

    }

});


// ======================
// NEW IMAGE PAGE
// ADMIN ONLY
// ======================

router.get("/new", isLoggedIn, (req, res) => {

    res.render("pages/new-gallery", {
        title: "Upload Image | Kali Puja Community"
    });

});


// ======================
// UPLOAD IMAGE
// ADMIN ONLY
// ======================

router.post(
    "/",
    isLoggedIn,
    upload.single("image"),
    async (req, res) => {

        try {

            const gallery = new Gallery({
                title: req.body.title,
                description: req.body.description,

                image: {
                    url: req.file.path,
                    filename: req.file.filename
                },

                category: req.body.category
            });

            await gallery.save();

            res.redirect("/gallery");

        } catch (err) {

            console.log(err);
            res.status(500).send("Failed to upload image");

        }

    }
);


// ======================
// DELETE IMAGE
// ADMIN ONLY
// ======================

router.delete(
    "/:id",
    isLoggedIn,
    async (req, res) => {

        try {

            const { id } = req.params;

            await Gallery.findByIdAndDelete(id);

            res.redirect("/gallery");

        } catch (err) {

            console.log(err);
            res.status(500).send("Failed to delete image");

        }

    }
);


module.exports = router;