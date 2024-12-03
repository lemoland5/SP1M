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
        con.query(`select data, typ, uwaga.punkty, tresc, concat(user.imie," ", user.nazwisko) as nauczyciel from uwaga inner join user on user.id = uwaga.nauczyciel where uczen = ${req.cookies.session}`, function (err, result, fields) {
            if (err) throw err;

            con.query(`select punkty from user where id = ${req.cookies.session}`, (err, result2) => {
                if (err) throw err;

                con.end();


                console.log(result);

                result = fixDatesSql(result, "data");

                result.forEach(element => {
                    if(element.typ = "poz") element.typ = "Pozytywna"
                    else if(element.typ = "neg") element.typ = "Negatywna"
                    else if(element.typ = "neu") element.typ = "Neutralna"
                })

                res.render("./dziennik/uwagi.ejs", {uwagi : result, totalUwagi : result.length, punkty : result2[0].punkty});
            })

        });


    })



});

module.exports = router;