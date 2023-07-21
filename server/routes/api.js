const express = require("express");
const router = express.Router();

const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

const authController = require("../controllers/auth");
const stickyNotesController = require("../controllers/sticky-notes");

router.get("/notes", authController.ensureAuth, stickyNotesController.notes);
router.post("/add", authController.ensureAuth, stickyNotesController.add);
router.post("/delete", authController.ensureAuth, stickyNotesController.delete);

module.exports = router
