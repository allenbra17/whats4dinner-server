const { DataTypes } = require("sequelize");
const db = require("../db");

const FoodModel = db.define("food", {
    recipeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
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
    rating:  {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = FoodModel