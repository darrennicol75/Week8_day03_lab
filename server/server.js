const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const app = express();
app.use(cors());
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017')
.then(( client ) => {
  const db = client.db('hotel');
  const bookings = db.collection("bookings");
  const bookingsRouter = createRouter(bookings);
  app.use('/api/bookings', bookingsRouter);
})
.catch(console.err);

// app.get('/', (req, res) => {
//   res.send("Hello world!")
// })
app.listen(3000, function (){
  console.log(`Listening on port ${ this.address().port}`);
});
