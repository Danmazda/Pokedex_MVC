import express from "express";
import methodOverride from "method-override";
import { Sequelize, DataTypes, Op } from "sequelize";
import dotenv from "dotenv";
import { allTypes, typeBorderDict } from "./objects.js";
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
    allowNull: false,
    unique: true
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
    allowNull: false,
    unique: true
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

//express routes

app.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll({
      attributes: ["id", "number", "name", "image", "type"],
      order: [["number", "ASC"]],
      limit: 50
    });
    res.render("index", { pokemons, typeBorderDict });
  } catch (error) {
    const response = {
      status: false,
      message: `Critical error: Failed to fetch pokemons`
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
      message: `${pokeAttributes.name} was created succesfully`
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `Failed to create ${pokeAttributes.name} please try again later`
    };
    res.render("response", { response });
  }
});

app.put("/update:id", async (req, res) => {
  const pokeAttributes = validateAttr(req.body);
  const id = req.params.id;
  try {
    await Pokemon.update(pokeAttributes, {
      where: { id }
    });
    const response = {
      status: true,
      message: `${pokeAttributes.name} was updated succesfully`
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `${pokeAttributes.name} update has failed! please try again later`
    };
    res.render("response", { response });
  }
});

app.delete("/delete:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Pokemon.destroy({ where: { id } });
    const response = {
      status: true,
      message: `${id} was deleted succesfully`
    };
    res.render("response", { response });
  } catch (error) {
    const response = {
      status: false,
      message: `Failed to delete ${pokeAttributes.name} please try again later`
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
      id: req.params.id
    }
  });
  res.render("details", { pokemon, allTypes });
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
  secondType = secondType.toLowerCase();
  if (height === "") {
    height = null;
  }
  if (weight === "") {
    weight = null;
  }
  if (secondType === "none") {
    secondType = null;
  }
  return {
    number: Number(number),
    name: name.toLowerCase(),
    type: type.toLowerCase(),
    secondType,
    image,
    description,
    height,
    weight,
    category,
    ability
  };
}
