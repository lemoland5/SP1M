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
        con.query(`select id, nazwa from przedmiot`, function (err, result) {

            con.query(`select id, nazwa from klasa`, (err, result2) => {
                con.end();

                res.render("./dziennik/pracePanel.ejs", {przedmioty : result, totalPrzedmioty : result.length, klasy : result2, totalKlasy : result2.length});

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

        con.query(`insert into praca values(null, ${req.body.przedmiot}, ${req.cookies.session}, ${req.body.klasa}, "${req.body.data}", "${req.body.nazwa}", "${req.body.rodzaj}")`,()=>{
            con.query(`select id, nazwa from przedmiot`, function (err, result) {

                con.query(`select id, nazwa from klasa`, (err, result2) => {
                    con.end();
    
                    res.render("./dziennik/pracePanel.ejs", {przedmioty : result, totalPrzedmioty : result.length, klasy : result2, totalKlasy : result2.length});
    
                })
    
            });
        })

    })

});


module.exports = router;