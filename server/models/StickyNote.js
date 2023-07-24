const mongoose = require('mongoose');

const User = require("./User")

const stickyNoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: { type: String, maxLength: 50, default: "" },
    text: { type: String, maxLength: 1000, default: "" },
    color: { type: String, match: /(#[a-fA-F\d]{6})/, default: "#c3af2e" },
})

const StickyNote = mongoose.model('StickyNote', stickyNoteSchema);
module.exports = StickyNote;