const express = require("express");
const dbConnect = require("./config/database");
const User = require("./Models/user");

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
  const doc = new User(req.body);

  try {
    await doc.save();
    res.send("User created succesfully");
  } catch (err) {
    res.status(400).send("Failed to create user" + err);
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
    await User.findOneAndUpdate({ mail: emailID }, req.body);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Failed to update user");
  }
});
