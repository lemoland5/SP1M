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

                con.query(`select user.id, concat(user.imie, " ", user.nazwisko) as nauczyciel from user where rola = "n"`, (err, result3) => {



                    con.end();

                    res.render("./dziennik/zastepstwaPanel.ejs", {przedmioty : result, totalPrzedmioty : result.length, klasy : result2, totalKlasy : result2.length, nauczyciele : result3, totalNauczyciele : result3.length});
    

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

        let typ = "tem";
        if(!req.body.przedmiot == req.body.przedmiotZastepczy || !req.body.nauczyciel == req.body.zastepca){
            if(req.body.przedmiot == req.body.przedmiotZastepczy){
                typ = "prze";
            }
            if(req.body.nauczyciel == req.body.zastepca){
                typ = "nau"
            }
        }

        con.query(`insert into zastepstwo values(null, ${req.body.klasa}, ${req.body.przedmiot}, ${req.body.przedmiotZastepczy}, ${req.body.nauczyciel}, ${req.body.zastepca}, "${req.body.data}", "${typ}")`, (err, resultInsert) => {

            console.log(err)
            console.log(resultInsert)

            con.query(`select id, nazwa from przedmiot`, function (err, result) {

                con.query(`select id, nazwa from klasa`, (err, result2) => {
    
                    con.query(`select user.id, concat(user.imie, " ", user.nazwisko) as nauczyciel from user where rola = "n"`, (err, result3) => {
    
    
    
                        con.end();
    
                        res.render("./dziennik/zastepstwaPanel.ejs", {przedmioty : result, totalPrzedmioty : result.length, klasy : result2, totalKlasy : result2.length, nauczyciele : result3, totalNauczyciele : result3.length});
        
    
                    })
    
    
                })
    
            });
    
    
        })
    
        })

        
});

module.exports = router;