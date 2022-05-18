const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const gqlSchema = fs.readFileSync('./schema/schema.graphql');
let schema = buildSchema(gqlSchema.toString());

const cors = require('cors');
const app = express();

const {  createCustomer } = require('./resolvers/customer');


app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', 1728000);
  next();
});



const root = {
  createCustomer
  };




  
  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))
  app.listen(3001, () => {
    console.log('GraphQL server started on port 3001');
  });
  
