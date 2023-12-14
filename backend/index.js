const express=require("express");//expres module dahil ediliyor
const app=express(); 
const path=require("path");
const cors=require("cors");
const connection = require("./database/db");

app.use(express.json()); //yapılacak isteklerin json formatında olmasını sağlıyor
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const authRouter=require("./routers/auth.router");
const categoryRouter=require("./routers/category.router");
const productRouter=require("./routers/product.router");
const basketRouter=require("./routers/basket.router");

app.use("/api/auth",authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/products",productRouter);
app.use("/api/baskets",basketRouter);
connection();

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("uygulama http://localhost:5000 portunda ayağa kalktı!"));