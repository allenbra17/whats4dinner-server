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
    userID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

module.exports = DrinksModel