const validator = require("validator");

const signUpValidation = (data) => {
    const {firstName , lastname , mail , password} = data;

    if(!firstName || !lastname || !mail || !password){
        throw new Error("All fields are required");
    }
    else if(!validator.isEmail(mail)){
        throw new Error("Invalid email format");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
    else{
        return true;
    }   
}

module.exports = {
    signUpValidation,
}