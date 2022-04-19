import express from "express";
import * as ejs from "ejs";
import { pokedex } from "./objects.js";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { pokedex: pokedex });
});

app.post("/", (req, res) => {
  pokedex.push(req.body.poke);
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.listen(port, () => {
  console.log("server running on port 3000");
});
