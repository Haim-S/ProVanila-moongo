require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

// ****************
// const ShopRoute = require("./routes/DrinksRoutes")
// app.use("/shop", ShopRoute);

// *****************

const Drinks = require("./schemas/Drinks");







app.get("/all", async(req, res) =>{
    const drinks = await Drinks.find()
    // console.log(drinks);
    res.json(drinks);
})

app.get("/CheapDrinks", async (req, res) => {
    const drinks = await Drinks.find({price: {$lt:50}});
    res.json(drinks);
})


// app.get("/bestDrinks", async (req, res) => {
//     const drinks = await Drinks.find({rating: {$gt:6}});
//     console.log(drinks);
//     res.json(drinks);
// })


app.delete("/del/:id", async(req, res) =>{
   await Drinks.deleteOne({_id: req.params.id});
     const drinks = await Drinks.find()
     res.json(drinks);
})

app.post("/create", async(req, res) =>{
    await Drinks.create({
        name: req.body.name,
        price: req.body.price,
        Stock: req.body.Stock,
        rating: req.body.rating
    });
     const drinks = await Drinks.find()
    res.json(drinks);

})

app.put("/updata/:id", async(req, res) =>{
    await Drinks.updateOne({_id: req.params.id},{$set:{name: req.body.name}});
     const drinks = await Drinks.find()
     res.json(drinks);
})











// *************************
const DB = process.env.DB_LOCAL

async function connectToDatebase() {
    try {
        await mongoose.connect(DB);
        console.log("Connect to mongo DB");
    } catch (error) {
        console.log("Failed to connect with mongo");
    }
}



connectToDatebase()

const PORT = process.env.PORT || 3070;
app.listen(PORT, console.log(`Rock & Roll on ${PORT}`));