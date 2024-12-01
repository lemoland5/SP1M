const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {



    if(req.cookies.session == 'undefined' || !req.cookies.session){
        res.redirect("login");
    }

    console.log(req.cookies);
    res.render("./dziennik/dziennik.ejs");
});

module.exports = router;