import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";

const app=express();
const port=3000;

mongoose.connect("mongodb+srv://sainithin:sainithin2603@cluster0.xqha6w4.mongodb.net/todoDB"),{useNewUrlParser:true};

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

const itemSchema=new mongoose.Schema({
    name:String
});
const Item=mongoose.model("Item",itemSchema);

app.get('/',async(req,res)=>{
    var nItem=await Item.find({});

    res.render("index.ejs",{title:"Today",item:nItem});
})

app.post("/",async (req,res)=>{
    const arr=req.body["newItem"];
    const listName=req.body["list"];

    const itemlist=new Item({
        name:arr,
    });
    itemlist.save();
    res.redirect("/");
});

app.post("/delete",async (req,res)=>{
    const id=req.body["delete"];
    await Item.deleteOne({_id:id});

    res.redirect("/")
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});