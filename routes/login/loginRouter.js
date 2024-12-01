const express = require("express");
const router = express.Router();
const mysql = require("mysql")
const crypto = require("crypto")

router.get("/", async (req, res) => {

    res.render("./login/login.ejs");
});

router.get("/", async (req, res) => {
  res.render("./logowanie-rejestracja/login.ejs");
});

router.post('/', async (req, res) => {

    let redirectAddress = "/dziennik";

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dziennik"
      });

    con.connect(function (err) {

        let sessionId;
        let age;

        if (err) throw err;
        console.log("Connected!");
        con.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, function (err, result, fields) {
            if (err) throw err;
            if(result.length == 0 || result[0].oczekujacy == true){
                // res.redirect("/register?userExists=true");
                redirectAddress = "/login?failed=true";
                console.log(`REDIRECT ADDRESS IS: ${redirectAddress}`);

                console.log(result);
            }
            else{

                const email = req.body.email;
                const password = crypto.createHash('sha256').update(req.body.password).digest('hex');

                if(password == result[0].password){
                  
                    sessionId = result[0].id;
                    age = 1000 * 60 * 60 * 2;

                }
                else{
                    sessionId = -1;
                    age = -1;
                }
                // const newPassword = req.body.password;

            }


            con.end();


            res
              .cookie("session", sessionId, { maxAge: age, httpOnly: true })
              .status(200)
              // .json({ message: "login successful", id: insert_result.insertedId })
              .redirect(redirectAddress);

        });


    })

  // login successful

})

module.exports = router;