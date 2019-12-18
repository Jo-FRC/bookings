const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();


app.use(bodyParser.json());


app.use('/bookings',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

const PORT = process.env.PORT || 8080;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-wsfsq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(()=> {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }).catch(err => {
    console.log('it s not connecting ' + err);
  })
