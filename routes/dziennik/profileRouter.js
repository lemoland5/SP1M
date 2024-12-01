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
        con.query(`select imie, nazwisko, data_urodzenia, email, rola, nazwa from user inner join klasa on user.klasa = klasa.id where user.id = ${req.cookies.session}`, function (err, result, fields) {
            if (err) throw err;

            con.end();


            let finalRola = ""
            
            if(result[0].rola == "u"){
                finalRola = "Uczeń"
            }
            else if(result[0].rola == "n"){
                finalRola = "Nauczyciel"
            }
            else if(result[0].rola == "r"){
                finalRola = "Rodzic"
            }
            else if(result[0].rola == "a"){
                finalRola = "Administrator"
            }

            console.log(req.cookies);
            res.render("./dziennik/profile.ejs", {imie : result[0].imie, nazwisko: result[0].nazwisko, klasa: result[0].nazwa, data: result[0].data_urodzenia.toISOString().substring(0,10), email: result[0].email, rola: finalRola});
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

        con.query(`insert into zgloszenia values(null, "${data}", ${req.cookies.session}, "${req.body.tresc}")`, function (err, result, fields) {
            if (err) throw err;

            con.end();

            res.redirect("/profile")
        });


    })



});

module.exports = router;