
const {Schema, model} = require("mongoose");

const ListDrinks = new Schema({
    name: String,
    type: String,
    price: Number,
    Stock: Number,
    rating: Number,
});

const Drinks = model("Drinks", ListDrinks);

module.exports = Drinks;

