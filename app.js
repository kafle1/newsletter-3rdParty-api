const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us2.api.mailchimp.com/3.0/lists/fadaaea5f4",
    method: "POST",
    headers: {
      Authorization: "niraj c62c3f182f6806594b2e6b525a4e20c5-us2",
    },
    body: jsonData,
  };
  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
    } else if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
// Server
app.listen(process.env.PORT, function (req, res) {
  console.log("Server is running on port 3000");
});

// c62c3f182f6806594b2e6b525a4e20c5-us2

// fadaaea5f4
