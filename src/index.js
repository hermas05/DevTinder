const express = require("express");
const dbConnect = require("./config/database");
const User = require("./Models/user");
const validator = require("validator");
const { signUpValidation } = require("./helper/signUpValidation");
const bcrypt = require("bcrypt");

const app = express();

dbConnect()
  .then(() => {
    console.log("DB connection estabhished");
    app.listen(3000, () => {
      console.log("server is running...");
    });
  })
  .catch((err) => {
    console.log("DB connection failed");
  });

app.use(express.json());

app.post("/signup", async (req, res) => {
  
  try {
    const {firstName , lastname , mail , password} = req.body;
    signUpValidation(req.body);
    const hash = await bcrypt.hash(password, 10);
    const doc = new User({
      firstName: firstName,
      lastName: lastname,
      mail: mail,
      password: hash,
    })
    await doc.save();
    res.send("User created succesfully");
  } catch (err) {
    res.status(400).send("Failed to create user" + err);
  }
});

app.post("/login", async (req, res) => {
  const { mail, password } = req.body;  

  try {
    const user = await User.findOne({ mail: mail });
    if (!mail || !password) {
    return res.status(400).send("Email and password are required");
  }
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    res.send("Login successful");
  }
  catch (err) {
    res.status(400).send(err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("failed to fetch data");
  }
});

app.get("/user", async (req, res) => {
  const emailID = req.body.mail;

  try {
    const user = await User.find({ mail: emailID });
    res.send(user);
  } catch (err) {
    res.status(400).send("failed to fetch data");
  }
});

app.post("/userById", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      console.log("User found:", user);
      res.send(user);
    } else {
      console.log("No user found with that ID");
      res.status(404).send("No user found with that ID");
    }
  } catch (err) {
    res.status(400).send("Failed to fetch data");
  }
});

app.delete("/user", async (req, res) => {
  const emailID = req.body.mail;
  try {
    await User.findOneAndDelete({ mail: emailID });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Failed to delete user");
  }
});

app.patch("/user", async (req, res) => {
  const emailID = req.body.mail;
  try {

    if(req.body.firstName && req.body.firstName.length > 30){
        return res.status(400).send("First name should be less than 30 characters");
    }
    await User.findOneAndUpdate({ mail: emailID }, req.body , { runValidators : true });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Failed to update user");
  }
});
