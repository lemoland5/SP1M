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
            con.query(`select id, imie, nazwisko from user where klasa = ${klasa} and rola = "u"`, (err1, result1) => {

                res.render("./dziennik/uwagiPanel.ejs", {users : result1, totalUsers : result1.length});
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

        let data = new Date().toISOString().substring(0,10);

        con.query(`insert into uwaga values(null, ${req.body.user}, ${req.body.punkty}, "${req.body.tresc}", ${req.cookies.session}, "${req.body.typ}", "${data}")`, (err) => {
            
            con.query(`update user set punkty = punkty + ${req.body.punkty} where id = ${req.body.user}`, (err) => {
                res.redirect('/uwagiPanel');
            })
            

        })

    })

});
module.exports = router;