const mongoose=require("mongoose");

const uri="mongodb+srv://umutatras:123456aa@eticaretdb.rqjrtjb.mongodb.net/?retryWrites=true&w=majority";

const connection=()=>{
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("MongoDb bağlantısı başarılı"))
    .catch((err)=>console.log("Bağlantı Hatas! : "+ err.message));
}

module.exports=connection;