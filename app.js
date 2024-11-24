// "use strict";
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/mainRouter");
// const dbRouter = require("./routes/db");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

//set up view engine -> ejs
app.set("view engine", "ejs");
//set up views folder
app.set("views", path.join(__dirname, "views"));

//log requests to the console
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

//parse incoming requests data to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enable cors
app.use(cors());

//parse cookies
app.use(cookieParser());
//serve static files WITH JOINING GLOBAL PATH WITH PUBLIC FOLDER
app.use(
  express.static(path.join(__dirname, "public")),
);

app.use("/",express.static("./node_modules/bootstrap/dist/"));
//define routes:
app.use("/", mainRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
