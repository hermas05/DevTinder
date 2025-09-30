const mongoose = require('mongoose');

const dbConnect = async()=>{
   await mongoose.connect("mongodb+srv://HermasDB:Hermas%40105@hermasdb.fds1l1f.mongodb.net/devTinder");

}

module.exports=dbConnect;