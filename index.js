import express from "express";
import methodOverride from "method-override";
import { Op } from "sequelize";
import { allTypes, typeBorderDict } from "./common/objects.js";
import { validateAttr } from "./common/functions.js";
import { Pokemon, sequelize } from "./models/pokemon.model.js";
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//Use put and delete methods with html forms and express
app.use(methodOverride("_method"));

try {
  await sequelize.authenticate();
  console.log("Successfully connected to db.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
//express routes

app.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      attributes: ["id", "number", "name", "image", "type"],
      order: [["number", "ASC"]],
      limit: 50,
    });
    res.render("index", { pokemons, typeBorderDict });
  } catch (error) {
    const response = {
      status: false,
      message: `Critical error: Failed to fetch pokemons`,
    };
    res.render("response", { response });
  }
});

app.post("/", async (req, res) => {
  const pokeAttributes = validateAttr(req.body);
  try {
    await Pokemon.create(pokeAttributes);
    await Pokemon.sync();
    const response = {
      status: true,
      message: `${pokeAttributes.name} was created succesfully`,
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `Failed to create ${pokeAttributes.name} please try again later`,
    };
    res.render("response", { response });
  }
});

app.put("/update:id", async (req, res) => {
  const pokeAttributes = validateAttr(req.body);
  const id = req.params.id;
  try {
    await Pokemon.update(pokeAttributes, {
      where: { id },
    });
    const response = {
      status: true,
      message: `${pokeAttributes.name} was updated succesfully`,
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `${pokeAttributes.name} update has failed! please try again later`,
    };
    res.render("response", { response });
  }
});

app.delete("/delete:id", async (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = await Pokemon.findOne({
      where: { id },
      attributes: ["name", "number"],
    });
    await Pokemon.destroy({ where: { id } });
    const response = {
      status: true,
      message: `${pokemon.name} of number ${pokemon.number} was deleted succesfully`,
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `Failed to delete ${pokeAttributes.name} please try again later`,
    };
    res.render("response", { response });
  }
});

app.get("/register", (req, res) => {
  res.render("register", { allTypes });
});

app.get("/details/:id", async (req, res) => {
  const pokemon = await Pokemon.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render("details", { pokemon, allTypes });
});

app.get("/search/:searchQuery", async (req, res) => {
  const pokemons = await Pokemon.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } },
        { type: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } },
      ],
    },
    order: [["number", "ASC"]],
    limit: 50,
  });
  res.render("index", { pokemons, typeBorderDict });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}
  http://localhost:3000/`);
});
