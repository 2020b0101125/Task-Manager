const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "admin",
  port: "5432",
});

db.connect();

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/submit", async (req, res) => {
  var user = req.body["username"];
  var passw = req.body["password"];
  const result = await db.query("select * from logins where username = $1", [
    user,
  ]);
  if (result.rows.length < 1) {
    console.log("not registered with the username");
    res.redirect("/");
  } else {
    if (result.rows[0]["password"] === passw) {
      res.redirect("http://localhost:3000");
    } else {
      console.log("wrong password");
    }
  }
  console.log(req.body);
});

app.listen(port, () => {
  console.log("running at 5000", port);
});
