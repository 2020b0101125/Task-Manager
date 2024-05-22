import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

const loginConnection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/loginDB"
);
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const login = loginConnection.model("login", loginSchema);

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
});

app.set("view engine", "ejs");
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log("the server is running at the port ", port);
});
