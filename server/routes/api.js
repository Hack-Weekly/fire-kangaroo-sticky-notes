const express = require("express");
const router = express.Router();

const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

router.get("/note/:id", (req, res) => {
    return res.send(req.params.id)
})

router.post("/add", async(req, res) => {
    let user_id = req.body.user_id;

    try {
        let user = await User.findById(user_id);
        let note = await StickyNote.create({
            user: user,
            title: req.body?.title,
            text: req.body?.text,
        })
        res.json({ "success": true })
    } catch (err) {
        console.log(`User: ${user_id} does not exist`, err)
        res.json({ "success": false })
    }
})

router.post("/delete", async (req, res) => {
    try {
        await StickyNote.findOneAndDelete( {_id: req.body._id} )
        res.json({ "success": true })
    } catch (err) {
        console.log(err)
        res.json({ "success": false })
    }
})

module.exports = router
