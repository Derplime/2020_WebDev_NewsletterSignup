//@ts-check

const express = require("express");
const request = require("request");

const app = express();

// Name a folder to serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    const { fName, lName, email } = req.body;
    
});

app.listen(3000, () => {
    console.log("Server on port 3000");
});
