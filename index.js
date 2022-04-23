import express from "express";
import methodOverride from "method-override";
import { Sequelize, DataTypes, Op } from "sequelize";
import dotenv from "dotenv";
import { allTypes } from "./objects.js";
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//Use put and delete methods with html forms and express
app.use(methodOverride("_method"));
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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoincrement: true
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  secondType: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  height: {
    type: DataTypes.FLOAT
  },
  weight: {
    type: DataTypes.FLOAT
  },
  category: {
    type: DataTypes.STRING
  },
  ability: {
    type: DataTypes.STRING
  }
});

await Pokemon.sync();
console.log("Pokemon table syncronized");
//express routes

app.get("/", async (req, res) => {
  const pokemons = await Pokemon.findAll({
    attributes: ["id", "number", "name", "image", "type"],
    order: [["number", "ASC"]],
    limit: 50
  });
  res.render("index", { pokemons });
});

app.put("/update:id", async (req, res) => {
  const pokeAttributes = validateAttr(req.body);
  const id = req.params.id;
  try {
    const pokemon = await Pokemon.update(pokeAttributes, {
      returning: true,
      where: { id }
    });
    const response = {
      status: true,
      message: "Pokemon was updated successfully!"
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: "Pokemon update failed!"
    };
    res.render("response", { response });
  }
});

app.delete("/delete:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Pokemon.destroy({ where: { id } });
    res.send(`${id} has been deleted`);
  } catch (error) {
    console.error("ERROR DELETING pokemon", error);
  }
});

app.post("/", async (req, res) => {
  const pokeAttributes = validateAttr(req.body);
  try {
    await Pokemon.create(pokeAttributes);
    await Pokemon.sync();
    console.log("Pokemons were synchronized successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("ERROR CREATING POKE   ", error);
  }
});

app.get("/register", (req, res) => {
  res.render("register", { allTypes });
});

app.get("/details/:id", async (req, res) => {
  const pokemon = await Pokemon.findOne({
    where: {
      id: req.params.id
    }
  });
  res.render("details", { pokemon, allTypes });
});
app.get("/update", async (req, res) => {
  res.write("this is the update path");
  res.send();
});

app.get("/search/:searchQuery", async (req, res) => {
  const pokemons = await Pokemon.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } },
        { type: { [Op.like]: `%${req.params.searchQuery.toLowerCase()}%` } }
      ]
    },
    order: [["number", "ASC"]],
    limit: 50
  });
  res.render("index", { pokemons });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}
  http://localhost:3000/`);
});

function validateAttr(obj) {
  let {
    number,
    name,
    type,
    secondType,
    image,
    description,
    height,
    weight,
    category,
    ability
  } = obj;
  if (height === "") {
    height = null;
  }
  if (weight === "") {
    weight = null;
  }
  if (secondType === "") {
    secondType = null;
  }
  return {
    number: Number(number),
    name: name.toLowerCase(),
    type: type.toLowerCase(),
    secondType: secondType.toLowerCase(),
    image,
    description,
    height,
    weight,
    category,
    ability
  };
}
