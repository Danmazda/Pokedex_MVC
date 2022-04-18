import express from "express";
import * as ejs from "ejs";
import { pokedex } from "./objects.js";
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { pokedex: pokedex });
});

app.listen("3000", () => {
  console.log("server running on port 3000");
});
