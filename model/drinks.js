const { DataTypes } = require("sequelize");
const db = require("../db");

const DrinksModel = db.define("drinks", {
    cocktailName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainIngredient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cocktailURL: {
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

module.exports = DrinksModel