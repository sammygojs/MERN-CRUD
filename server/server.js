const express = require('express')
const app = express()
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const cors = require('cors');
const Food = require('./models/Food');
app.use(cors())
app.use(express.json())

mongoose.connect(
"mongodb://Sumit:secret1234@localhost:27017/food?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
{
    useNewUrlParser:true
}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/api/read',(req,res)=>{
    FoodModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})

app.get('/', async (req,res)=>{
    const Food = new FoodModel({foodName:"Apple",daysSinceAte:2})
    try{
        await Food.save()
        res.send("data inserted")
    }
    catch (err){
        console.log("error: ",err)
    }
})

app.post('/api/insert', async (req,res)=>{
    // const name = req.body.foodName;
    // const day = req.body.days;
    const Food = new FoodModel({foodName:req.body.foodName,daysSinceAte:req.body.days})
    // console.log("day: ",day)
    // console.log("name: ",name)
    try{
        console.log(Food)
        // res.send(`hi`)
        await Food.save()
        res.send("data inserted")
    }
    catch (err){
        console.log("error: ",err)
    }
})

app.delete(`/api/delete/:id`, async (req,res)=>{
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec()
    res.send(`deleted`)
    // FoodModel.findById(id)
    // console.log("foodname: ",foodName)
    
})

app.put(`/api/update`, async (req,res)=>{
    const id = req.body.id
    const newFoodName = req.body.newFoodName
    console.log("newFoodname: ",newFoodName)
    console.log("id: ",id)
    try{
        await FoodModel.findById(id, (err,updatedFood)=>{
            updatedFood.foodName=newFoodName
            updatedFood.save()
        })
        res.send("newFoodName")
    }catch(err){
        console.log(err)
    }
    
    
})

const PORT = 3001
app.listen(PORT,()=> console.log(`port running on ${PORT}`))

