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
        con.query(`select user.id, imie, nazwisko, data_urodzenia, email from user where oczekujacy = 1`, function (err, result, fields) {
            con.query(`select id, nazwa from klasa`, (err, resultKlasa) => {


                if (err) throw err;

                con.end();

                result = fixDatesSql(result, "data_urodzenia");
                
    
                // console.log(req.cookies);
                res.render("./dziennik/confirmPanel.ejs", {uzytkownicy : result, totalUzytkownicy : result.length, klasy : resultKlasa, totalKlasy : resultKlasa.length});
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

        console.log(req.body.action);


        if(req.body.action == "delete" ){
            con.query(`delete from user where id = ${req.body.id}`, (err, result) => {
                console.log("deleting");
                console.log(req.body.id);
                con.end();
                res.redirect("/confirmPanel")
            })
        }
    
        else{
            con.query(`update user set oczekujacy = 0, rola = "${req.body.rola}", klasa = ${req.body.klasa} where id = ${req.body.id}`, function (err, result, fields) {
                if (err) throw err;


    
                con.end();
                res.redirect("/confirmPanel")
    
            });
        }




    })



});

module.exports = router;