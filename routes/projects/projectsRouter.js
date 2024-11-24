const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    res.render("./projects/projects.ejs");
});

module.exports = router;