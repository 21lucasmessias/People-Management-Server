const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers/resolvers');
const path = require('path');
const mongoose = require('mongoose');

//using docker compose
mongoose.connect('mongodb://0.0.0.0/eprecise', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
  if (err) {
    console.log('Error on conection');
    throw err;
  }
  console.log("connected to mongo");
})

//without docker compose
/*mongoose.connect('mongodb://localhost:27017/eprecise', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
  if (err) throw err;
  console.log("connected to mongo");
})*/

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schemas', 'schema.graphql'),
  resolvers
});

server.start(() => console.log('Server is running on localhost:4000'));