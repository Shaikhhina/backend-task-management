const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/userController");

// for posting contact us data
router.post("/", signUp);
router.post("/sign-in", signIn);



module.exports = router;
