const mongoose=require("mongoose");

const uri="y";

const connection=()=>{
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("MongoDb bağlantısı başarılı"))
    .catch((err)=>console.log("Bağlantı Hatas! : "+ err.message));
}

module.exports=connection;
