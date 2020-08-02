const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

//Get port
const port = process.env.PORT || 4000;

//connect to mongodb database
mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//confirm connection to database
mongoose.connection.once('open', () => {
  console.log('Connected to ics database');
});

const Mentor = require('./models/mentor');

app.use(express.json());
//react client endpoint
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

//graphql endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('/trial', async (req, res) => {
  const data = await Mentor.findOne({ rollNumber: '416PH5047' });

  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
