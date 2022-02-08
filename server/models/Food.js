const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    daysSinceAte:{
        type:Number,
        required:true
    }
}, { collection: 'FoodData'})

const Food = mongoose.model("Food",FoodSchema)
module.exports = Food