const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "admin",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  const result = await db.query("select task from tasks");
  result.rows.forEach((element) => {
    countries.push(element.country_code);
  });
  console.log(countries);
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log("the server is running at the port ", port);
});
