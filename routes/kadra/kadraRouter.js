const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    res.render("./kadra/kadra.ejs");
});

module.exports = router;