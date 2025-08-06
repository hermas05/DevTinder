const express = require("express");

const app = express();

// app.use((req,res)=>{
//     res.send("Hello World")
// })
app.use("/name",(req,res)=>{
    res.send("Im Batman")
})
app.use("/test",(req,res)=>{
    res.send("Hello Folks")
})

app.listen(3000,()=>{
    console.log("server is running...")
})