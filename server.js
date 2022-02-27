const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const PORT = process.env.PORT || 3000;
const app = express();
const aws_fucntion_api = "https://c862zuo6ak.execute-api.us-east-1.amazonaws.com/prod/hello-resource";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Server homepage");
});

app.get("/say", (req, res) => {
  let keyword = req.query.keyword;
  axios
    .post(aws_fucntion_api, { keyword })
    .then((response) => {
      return res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Server error occurred");
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));