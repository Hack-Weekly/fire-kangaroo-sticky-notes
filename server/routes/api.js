const express = require("express");
const router = express.Router();
const cors = require("cors");

const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

const authController = require("../controllers/auth");
const stickyNotesController = require("../controllers/sticky-notes");

router.get("/note/:id", authController.ensureAuth, stickyNotesController.note);
router.get("/notes", authController.ensureAuth, stickyNotesController.notes);
router.post("/add", authController.ensureAuth, stickyNotesController.add);
router.put("/edit/:id", authController.ensureAuth, stickyNotesController.edit);
router.post("/delete", authController.ensureAuth, stickyNotesController.delete);

module.exports = router