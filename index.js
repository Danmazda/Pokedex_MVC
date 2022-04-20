import express from "express";
import ejs from "ejs";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { allTypes } from "./objects.js";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
dotenv.config();
//Sequelize
const sequelize = new Sequelize(`${process.env.POSTGRES}`);

try {
  await sequelize.authenticate();
  console.log("Successfully connected to db.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export const Pokemon = sequelize.define("Pokemon", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  height: {
    type: DataTypes.FLOAT,
  },
  weight: {
    type: DataTypes.FLOAT,
  },
  category: {
    type: DataTypes.STRING,
  },
  ability: {
    type: DataTypes.STRING,
  },
});

// const bulbasaur = await Pokemon.create({
//   id: 1,
//   name: "Bulbasaur",
//   type: "grass",
//   image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
//   description:
//     "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
//   height: 0.7,
//   weight: 6.9,
//   category: "seed",
//   ability: "overgrow",
// });

//express routes
app.get("/", async (req, res) => {
  const pokemons = await Pokemon.findAll({});
  res.render("index", { pokemons });
});

app.post("/", async (req, res) => {
  const {
    id,
    name,
    type,
    image,
    description,
    height,
    weight,
    category,
    ability,
  } = req.body;
  const pokemon = await Pokemon.create({
    id,
    name,
    type,
    image,
    description,
    height,
    weight,
    category,
    ability,
  });
  await Pokemon.sync();
  console.log("Pokemons were synchronized successfully.");
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register", { allTypes });
});

app.get("/details/:id", async (req, res) => {
  const pokemon = await Pokemon.findOne({
    where: {
      id: Number(req.params.id),
    },
  });
  res.render("details", { pokemon: pokemon });
});
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${port}
  http://localhost:3000/`);
});
