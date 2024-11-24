const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    res.render("./history/history.ejs");
});

module.exports = router;