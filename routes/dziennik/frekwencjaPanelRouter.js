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
            con.query(`select id, imie, nazwisko from user where klasa = ${klasa}`, (err1, result1) => {


                let uczniowie

                con.query(`select id, nazwa from przedmiot`, (err2, result2) => {
                    console.log(result1);
                    console.log(result2);

                    res.render("./dziennik/frekwencjaPanel.ejs", {users : result1, przedmioty : result2, totalUsers : result1.length, totalPrzedmioty : result2.length});
                })
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

        con.query(`insert into obecnosc values(null, ${req.body.user}, ${req.body.przedmiot}, ${Boolean(req.body.wartosc)}, "${req.body.data}")`, (err) => {

            con.query(`select klasa from user where id = ${req.cookies.session}`, function (err, result) {
                let klasa = result[0].klasa;
                con.query(`select id, imie, nazwisko from user where klasa = ${klasa}`, (err1, result1) => {
    
    
                    let uczniowie
    
                    con.query(`select id, nazwa from przedmiot`, (err2, result2) => {
                        console.log(result1);
                        console.log(result2);
    
                        res.render("./dziennik/frekwencjaPanel.ejs", {users : result1, przedmioty : result2, totalUsers : result1.length, totalPrzedmioty : result2.length});
                    })
                })
            });
        })



    })

});

module.exports = router;