const express = require("express");
const mysql = require("mysql");
const {sqlDateToString, fixDatesSql} = require("../../utils/date")
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

        con.query(`select klasa from user where id = ${req.cookies.session}`, (err, resultKlasa) => {

            const klasa = resultKlasa[0].klasa;

            con.query(`select przedmiot.nazwa as przedmiot, concat(user.imie, " ", user.nazwisko) as nauczyciel, praca.data, praca.nazwa, praca.rodzaj from praca inner join przedmiot on przedmiot.id = praca.przedmiot inner join user on user.id = praca.nauczyciel where praca.klasa = ${klasa}`, function (err, result, fields) {
                if (err) throw err;
    
                    if (err) throw err;
    
                    con.end();
    
    
    
                    result = fixDatesSql(result, "data");
    
                    result.forEach(element => {
                        if(element.rodzaj = "kart") element.rodzaj = "Kartkówka"
                        else if(element.rodzaj = "spr") element.rodzaj = "Sprawdzian"
                        else if(element.rodzaj = "zad") element.rodzaj = "Zadanie domowe"
                        else if(element.rodzaj = "prk") element.rodzaj = "Praca klasowa"
                    })
    
                    res.render("./dziennik/prace.ejs", {prace : result, totalPrace : result.length});
    
            });
        })
        


    })



});

module.exports = router;