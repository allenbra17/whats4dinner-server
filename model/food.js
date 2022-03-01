const { DataTypes } = require("sequelize");
const db = require("../db");

const FoodModel = db.define("food", {
    recipeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainIngredient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipeURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgURL: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
})

module.exports = FoodModel