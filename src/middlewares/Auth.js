const authVerified = (req,res,next)=>{
    const token = "abc";
    const isAuthendicated = token==="abc"
    if(isAuthendicated){
     next();
    }
    else{
        res.status(404).send("404 unauthorized")
    }
    
}

module.exports = {
    authVerified,
}