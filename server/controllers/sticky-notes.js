const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

module.exports = {
    note: async(req, res) => {
        let note = {}
        try {
            note = await StickyNote.findOne({ user: req.session.passport.user, _id: req.params.id }) || {}
        } catch (err) {
            console.log(err)
        } finally {
            res.json(note)
        }
    },

    notes: async(req, res) => {
        let notes = await StickyNote
            .find({ user: req.session.passport.user })
        res.json(notes)
    },

    add: async(req, res) => {
        let user_id = req.session.passport.user;
        try {
            let user = await User.findById(user_id);
            let note = await StickyNote.create({
                user: user,
                ...req.body
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
            await StickyNote.findOneAndUpdate({ _id: req.params.id }, {
                title: req.body.title,
                text: req.body.text,
                color: req.body.color,
            }, { new: true })
            res.json({ "success": true })

        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    },

    delete: async(req, res) => {
        console.log("DELETING NOTE: ", req.body)
        try {
            let note = await StickyNote.findOneAndDelete({ _id: req.body._id })
            if (note) {
                res.json({ success: true, deleted: true })
            } else {
                res.json({ success: true, deleted: false, msg: `Note not found for ${req.body._id}` })
            }
        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    }
}