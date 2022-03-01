const db = require('../db');
const UserModel = require("./user")
const DrinksModel = require("./drinks")
const FoodModel = require("./food")

UserModel.hasMany(DrinksModel);
UserModel.hasMany(FoodModel);

DrinksModel.belongsTo(UserModel);
FoodModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    DrinksModel,
    FoodModel,
}
