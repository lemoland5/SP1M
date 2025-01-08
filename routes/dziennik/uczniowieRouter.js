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
        con.query(`select klasa from user where id = ${req.cookies.session}`, function (err, result) {
            let klasa = result[0].klasa;
            con.query(`select id, imie, nazwisko from user where klasa = ${klasa} and rola = 'u'`, (err1, result1) => {

                res.render("./dziennik/uczniowie.ejs", {users : result1, totalUsers : result1.length});
            })
        });


    })

});

module.exports = router;