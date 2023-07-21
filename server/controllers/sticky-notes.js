const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

module.exports = {
    notes: async(req, res) => {
        let notes = await StickyNote
            .find({ user: req.session.passport.user })
            .select(["title", "text"])
        console.log(notes)
        res.json(notes)
    },

    add: async(req, res) => {
        // let user_id = req.body.user_id;
        // let user_id = "64b9e5beb138b8c7c9b8079e"
        let user_id = req.session.passport;
        try {
            let user = await User.findById(user_id);
            let note = await StickyNote.create({
                user: user,
                title: req.body.title,
                text: req.body.text,
            })
            res.json({ "success": true })
        } catch (err) {
            res.json({
                "success": false,
                "error": err
            })
        }
    },

    edit: async(req, res) => {
        try {
            await StickyNote.findOneAndUpdate({ _id: req.body.note_id }, {
                title: req.body.title,
                text: req.body.text
            }, { new: true })
            res.json({ "success": true })

        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    },

    delete: async(req, res) => {
        try {
            await StickyNote.findOneAndDelete({ _id: req.body._id })
            res.json({ "success": true })
        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    }
}