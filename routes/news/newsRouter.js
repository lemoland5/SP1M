const express = require("express");
const router = express.Router();
const mysql = require('mysql');


  

router.get("/", async (req, res) => {

    

    res.render("./news/news.ejs");
});

module.exports = router;