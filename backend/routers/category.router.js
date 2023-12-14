const express= require("express");
const router=express.Router();
const Category=require("../models/category");
const {v4:uuidv4}=require("uuid");
const response=require("../services/response.service");

router.post("/add",async(req,res)=>{
   response(res,async ()=>{
      const {name}=req.body;
      const category=new Category({
          _id:uuidv4(),
          name:name
      });
      await category.save();
      res.json({message:"Kategori Kaydı başarılı"});

   });
});

router.post("/removebyid",async(req,res)=>{
    try {
     const {_id}=req.body;
    await Category.findByIdAndDelete(_id);
     res.json({message:"Kategori Kaydı silindi"});
     
    } catch (error) {
     res.status(500).json({message:error.message});
    }
 
 });

 router.post("/update",async(req,res)=>{
    try {
     const {_id,name}=req.body;
     const category=await Category.findOne({_id:_id});
     category.name=name;
     await Category.findByIdAndUpdate(_id,category);
     res.json({message:"Kategori Kaydı güncellendi"});
     
    } catch (error) {
     res.status(500).json({message:error.message});
    }
 
 });

 router.get("/all-category",async(req,res)=>{
    try {
    
     const categories=await Category.find();
     res.json(categories);
     
    } catch (error) {
     res.status(500).json({message:error.message});
    }
 
 });

 module.exports=router;