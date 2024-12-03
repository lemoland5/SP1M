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
        con.query(`select nazwa as przedmiot, avg(wartosc) as procent from obecnosc inner join przedmiot on przedmiot.id = obecnosc.przedmiot where uczen = ${req.cookies.session} group by przedmiot`, function (err, result, fields) {
            if (err) throw err;

            con.end();

            result.forEach(element => {
                element.procent *= 100;
                element.procent += "%";
            });

            console.log(req.cookies.session);

            res.render("./dziennik/frekwencja.ejs", {frekwencja : result, totalFrekwencja : result.length});
        });


    })



});

module.exports = router;