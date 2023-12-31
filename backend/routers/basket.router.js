const express= require("express");
const router=express.Router();
const Product=require("../models/product");
const {v4:uuidv4}=require("uuid");
const fs=require("fs");
const upload = require("../services/file.service");
const response=require("../services/response.service");
const Basket = require("../models/basket");
const Product=require("../models/product");

router.post("/add",async(req,res)=>{
    response(res,async()=>{

        const{userId,productId,price,quantity}=req.body;

        let basket=new Basket();
        basket._id=uuidv4();
        basket.userId=userId;
        basket.productId=productId;
        basket.price=price;
        basket.quantity=quantity;
    
        await basket.save();
    
        let product=await Product.findById(productId);
        product.stock-=quantity;
    
        await Product.findByIdAndUpdate(productId,product);
    
        res.json({message:"ürün başarıyla sepete eklendi"});
    });

});

router.post("/removeById",async(req,res)=>{
    response(res,async()=>{
        const {_id}=req.body;
        let basket=await Basket.findById(_id);
        let product=await Product.findById(productId);
        product.stock+=basket.quantity;
        await Product.findByIdAndUpdate(productId,product);
        await Basket.findByIdAndDelete(_id);

    });
});

router.post("/getall",async(req,res)=>{
    const{userId}=req.body;
    const baskets=await Basket.aggregate([
        {
            $match:{userId:userId}
        },
        {
            $lookup:{
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"products"
            }
        }
    ]);
    res.json(baskets);
});

router.post("/getcount",async(req,res)=>{
    response(res,async()=>{
        const{userId}=req.body;
        const count=await Basket.find({userId:userId}).count();
        res.json(count);

    });
});
module.exports=router;