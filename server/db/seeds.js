use hotel;
db.dropDatabase();

db.bookings.insertMany([
  {
    name: "George Benson",
    email: "george.benson@gmail.com",
    checked_in: true
  },
  {
    name: "Eric Clapton",
    email: "eric.clapton@gmail.com",
    checked_in: false
  }
]);
