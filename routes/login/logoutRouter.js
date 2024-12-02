const express = require("express");
const router = express.Router();
const mysql = require("mysql")
const crypto = require("crypto")

router.get("/", async (req, res) => {
    res
    .cookie("session", -1, { maxAge: -1, httpOnly: true })
    .status(200)
    // .json({ message: "login successful", id: insert_result.insertedId })
    .redirect("/login");
});


module.exports = router;