const express = require("express");
const mysql = require("mysql");
const { fixDatesSql } = require("../../utils/date");
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
        con.query(`select id, concat(imie, " ", nazwisko) as uzytkownik from user where id != ${req.cookies.session}`, function (err, result, fields) {

            con.query(`select temat, tresc, concat(user.imie, " ", user.nazwisko) as nadawca, data_wyslania from wiadomosc inner join user on user.id = wiadomosc.nadawca where odbiorca = ${req.cookies.session}`, (err, result2) => {

                if (err) throw err;

                con.end();
                
                result2 = fixDatesSql(result2, "data_wyslania");
    
                console.log(req.cookies);
                res.render("./dziennik/wiadomosci.ejs", {uzytkownicy : result, totalUzytkownicy : result.length, wiadomosci: result2 , totalWiadomosci : result2.length});

            })

        });


    })



});


router.post("/", async (req, res) => {



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

        data = new Date().toISOString().substring(0,10)

        con.query(`insert into wiadomosc values(null, "${data}", "${req.body.temat}", "${req.body.tresc}", ${req.cookies.session}, ${req.body.odbiorca})`, function (err, result, fields) {
            if (err) throw err;

            con.end();

            res.redirect("/wiadomosci")
        });


    })



});

module.exports = router;