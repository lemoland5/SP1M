const express = require("express");
const mysql = require("mysql");
const router = express.Router();

router.get("/", async (req, res) => {



    if(req.cookies.session == 'undefined' || !req.cookies.session){
        res.redirect("login");
    }


    
    else{
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "dziennik"
          });
    
        con.connect(function (err) {
    
            if (err) throw err;
            console.log("Connected!");
            con.query(`select rola from user where id = ${req.cookies.session}`, function (err, result, fields) {
                if (err) throw err;
    
                con.end();
    
    
                console.log(result[0].rola);
                res.render("./dziennik/dziennik.ejs", {rola : result[0].rola});
            });
    
    
        })
    }
    

});

module.exports = router;