// Libraries
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();

// Modules Import
const schema = require("./schema/schema");

const app = express();

//Get port
const port = process.env.PORT || 4000;

//connect to mongodb database
mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//confirm connection to database
mongoose.connection.once("open", () => {
  console.log("Connected to ics database");
});

// Middlewares
app.use(express.json());

//graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
