const express= require("express");
const router=express.Router();
const Product=require("../models/product");
const {v4:uuidv4}=require("uuid");
const fs=require("fs");
const upload = require("../services/file.service");
const response=require("../services/response.service");
//ürün ekleme

router.post("/add",upload.array("images"),async(req,res)=>{
    response(res,async ()=>{
        const productId=uuidv4();
        const{name,stock,price,categories}=req.body;
        let product=new Product({
            _id:productId,
            name:name.toUpperCase(),
            stock:stock,
            price:price,
            categories:categories,
            isActive:true,
            imageUrl:req.files,
            createdDate:new Date()
        });
        await product.save();

        res.json({message:"Ürün kaydı tamamlandı"});
    });

});

router.post("/removebyid",async(req,res)=>{
    response(res,async ()=>{
        const{_id}=req.body;
        const product=await Product.findById(_id);
        for(const image of product.imageUrl){
            fs.unlink(image.path,()=>{});
        }
        await Product.findByIdAndDelete(_id);
        res.json({message:"Ürün başarılıyla silindi"});
    });
});

router.post("/",async(req,res)=>{
    response(res,async()=>{
        const{pageNumber,pageSize,search}=req.body;
        let productCount=await Product.find({
            $or:[
                {
                    name:{$regex:search,$options:'i'}
                }
            ]
        }).count();
        let products=await Product.find({
            $or:[
                {
                    name:{$regex:search,$options:'i'}
                }
            ]
        })
        .populate("categories")
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize);

        let totaPageCount=Math.ceil(productCount/pageSize);
        let model={
            datas:products,
            pageNumber:pageNumber,
            pageSize:pageSize,
            totaPageCount:totaPageCount,
            isFirsPage:pageNumber==1?true:false,
            isLastPage:totaPageCount==pageNumber?true:false,

        };
        res.json(model);
        
    });
});

router.post("/getById",async(req,res)=>{
    response(res,async()=>{
        const{_id}=req.body;
        let product=await Product.findById(_id);
        res.json(product);
    });
});

router.post("/update",upload.array("images"),async(req,res)=>{
    const{_id,name,stock,price,categories}=req.body;
    let product = await Product.findById(_id);
    for(const image of product.imageUrl)
    {
        fs.unlink(image.path,()=>{});
    }
    let imageUrl;
    imageUrl=[...product.imageUrl,...req.files]
    product={
        name:name.toUpperCase(),
        stock:stock,
        price:price,
        imageUrl:imageUrl,
        categories:categories
    };
    await Product.findByIdAndUpdate(_id,prodct);
    res.json({message:"ürün kaydı güncellendi"});
});

router.post("/removeImageByProductIdAndIndex",async(req,res)=>{
    response(res,async()=>{
        const{_id,index}=req.body;
        let product=await Product.findById(_id);
        if(product.imageUrl.length==1)
        {
            res.status(500).json({message:"Son kalan resmi silemezsiniz"});
        }
        else
        {
            let image=product.imageUrl[index];
            await Product.findByIdAndUpdate(_id,product);
            fs.unlink(image.path,()=>{});
            res.json({message:"resim silme başarılı"});
        }
    });
});

router.post("/getAllForHomePage",async(req,res)=>{
    const{pageNumber,pageSize,search,categoryId,priceFilter}=req.body;
    let products;
    if(priceFilter=="0")
    {
        let products=await Product.find({
            categories:{$regex:categoryId,$options:'i'},
            $or:[{
                name:{$regex:search,$options:'i'}
            }]
        })
        .populate("categories");
    }
    res.json(products);

});

module.exports=router;