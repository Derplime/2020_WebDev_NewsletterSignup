//@ts-check

const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;

// Name a folder to serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    const { fName, lName, email } = req.body;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    // Using Mailchimp
    // Use your own listid, username, apikey here
    const listId = `LISTID`;
    const apiKey = `APIKEY`;
    const userName = `USERNAME`;
    // Replace the X in usX with the similar number in the -us# in your apiKey
    const url = `https://usX.api.mailchimp.com/3.0/lists/${listId}`;
    const options = {
        method: "POST",
        auth: `${userName}:${apiKey}`
    }
    const request = https.request(url, options, (resp) => {
        
        if (resp.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        resp.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
