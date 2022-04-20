import express from "express";
import ejs from "ejs";
import { Sequelize, DataTypes, Op } from "sequelize";
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
    allowNull: false,
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

//express routes
app.get("/", async (req, res) => {
  const pokemons = await Pokemon.findAll({
    attributes: ["id", "name", "image", "type"],
    order: [["id", "ASC"]],
    limit: 50,
  });
  res.render("index", { pokemons });
});

app.post("/", async (req, res) => {
  let {
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

  if (height === "") {
    height = null;
  }
  if (weight === "") {
    weight = null;
  }

  const pokemon = await Pokemon.create({
    id,
    name: name.toLowerCase(),
    type: type.toLowerCase(),
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
app.get("/update/:id", async (req, res) => {
  res.write("this is the update path");
  res.send();
});

app.get("/search/:searchQuery", async (req, res) => {
  const pokemons = await Pokemon.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } },
        { type: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } },
      ],
    },
    order: [["id", "ASC"]],
    limit: 50,
  });
  res.render("index", { pokemons });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${port}
  http://localhost:3000/`);
});
