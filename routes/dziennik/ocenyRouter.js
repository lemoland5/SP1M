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
        con.query(`select nazwa, ocena, waga, data from ocena inner join przedmiot on przedmiot.id = ocena.przedmiot where uczen = ${req.cookies.session}`, function (err, result, fields) {
            if (err) throw err;

            result = fixDatesSql(result, "data");

            con.query(`select uczen, nazwa, (avg(ocena * waga) / avg(waga)) as srednia from ocena inner join przedmiot on ocena.przedmiot = przedmiot.id where uczen = ${req.cookies.session} group by uczen, nazwa`, (err, result2) => {
                if (err) throw err;

                con.end();

                let sredniaTotal = 0;
                let dlugosc = 0;

                result2.forEach(element => {
                    if(element.uczen == req.cookies.session){
                        sredniaTotal += element.srednia;
                        dlugosc++
                    }
                });

                sredniaTotal /= dlugosc

                res.render("./dziennik/oceny.ejs", {oceny : result, totalOceny : result.length, ocenySrednia : result2, totalOcenySrednia : result2.length, sredniaTotal : sredniaTotal});
            })

        });


    })



});

module.exports = router;