const mongoose = require('mongoose');

const User = require("./User")

const stickyNoteSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: { type: String, maxLength: 50, default: "New Title", required: true },
    text: { type: String, maxLength: 1000, default: "", required: true },
})

const StickyNote = mongoose.model('StickyNote', stickyNoteSchema);
module.exports = StickyNote;