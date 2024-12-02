const express = require("express");
const mysql = require("mysql");
const router = express.Router();

router.get("/", async (req, res) => {



    if(req.cookies.session == 'undefined' || !req.cookies.session){
        res.redirect("login");
    }


    
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dziennik"
      });

    con.connect(function (err) {

        if (err) throw err;
        console.log("Connected!");
        con.query(`select nazwa, ocena, waga, data from ocena inner join przedmiot on przedmiot.id = ocena.przedmiot where uczen = ${req.cookies.session}`, function (err, result, fields) {
            if (err) throw err;

            con.end();

            res.render("./dziennik/oceny.ejs", {oceny : result, totalOceny : result.length});
        });


    })



});

module.exports = router;