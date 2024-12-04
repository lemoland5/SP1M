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


            // pokazuje tylko przyszłe
            // usunac now() z koncowki zeby pokazac wszystkie
            con.query(
                `select 
                subquery2.przedmiot,
                subquery2.nazwa as zastepczy,
                subquery2.nauczyciel,
                concat(user.imie, " ", user.nazwisko) as zastepca,
                subquery2.data,
                subquery2.typ
            from
                (select 
                    subquery.przedmiot, 
                    nazwa, 
                    concat(user.imie, " ", user.nazwisko) as nauczyciel, 
                    subquery.zastepca, 
                    subquery.data, 
                    subquery.typ 
                from 
                    (select 
                        przedmiot.nazwa as przedmiot, 
                        przedmiotZastepczy, 
                        nauczyciel, 
                        zastepca, 
                        data, 
                        typ 
                    from 
                        zastepstwo 
                    inner join 
                        klasa on klasa.id = zastepstwo.klasa 
                    inner join 
                        user on user.klasa = zastepstwo.klasa
                    inner join 
                        przedmiot on przedmiot.id = zastepstwo.przedmiot 
                    where user.id = ${req.cookies.session}) 
                as subquery 
                inner join przedmiot on subquery.przedmiotZastepczy = przedmiot.id
                inner join user on user.id = subquery.nauczyciel)
            as subquery2
            inner join user on user.id = subquery2.zastepca
            where subquery2.data > now()`, 
            function (err, result, fields) {
                if (err) throw err;
    
                    if (err) throw err;
    
                    con.end();
    
    
    
                    result = fixDatesSql(result, "data");
    
                    result.forEach(element => {
                        if(element.typ == "prze") element.typ = "Zmiana przedmiotu"
                        else if(element.typ == "nau") element.typ = "Zmiana nauczyciela"
                        else if(element.typ == "tem") element.typ = "Zmiana tematu"
                    })
    
                    res.render("./dziennik/zastepstwa.ejs", {zastepstwa : result, totalZastepstwa : result.length});
    
            });
        


    })



});

module.exports = router;