const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
const router = express.Router();

router.get("/", async (req, res) => {

    res.render("./login/register.ejs");
});


router.post("/", async (req, res) => {

    let redirectAddress = "/";

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dziennik"
      });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, function (err, result, fields) {
            if (err) throw err;
            if(result.length != 0){
                // res.redirect("/register?userExists=true");
                redirectAddress = "/register?userExists=true";
                console.log(`SELECT * FROM user WHERE email = "${req.body.email}"`);
                console.log(`REDIRECT ADDRESS IS: ${redirectAddress}`);

                console.log(result);
            }
            else{
                const imie = req.body.imie;
                const nazwisko = req.body.nazwisko;
                const data_urodzenia = req.body.data;
                const email = req.body.email;
                const newPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
                // const newPassword = req.body.password;


                con.query(`INSERT INTO user VALUES(null, "${imie}", "${nazwisko}", null, "${data_urodzenia}", "${email}", 0, null, true, "${newPassword}")`, (err, result) => {
                    if (err) throw err;

                    con.end();

                    res.redirect(redirectAddress);

                });
            }



        });





    });





    // const insert_result = await users_collection.insertOne(user);
    // await client.close();
    // res.redirect("/login?created=true");

  })
  

module.exports = router;