
const dalMySQL = require('./DAL/my-sql.js');

var person = {
    firstName: "Bill",
    lastName: "Nye",
    phone: "801 092-1199",
    email: "billnyesciguy@gmail.com",
    type: "person",
    active: true
}

var updatePerson = {
    _id: 9,
    firstName: "Bill",
    lastName: "Nie",
    phone: "801 092-1109",
    email: "billniesciguy@gmail.com",
    type: "person",
    active: true
}

var relief = {
  name: "Kongo Gold Miners",
  organizationID: "French Foreign Legion",
  description: "Gold Miners are poisening local water supplies due to malpractice",
  start:"2010-01-10",
  phase: "active"
}

var updateRelief = {
  _id: 4,
  name: "Stopping the Kongo Gold Miners",
  organizationID: "FrenchForeignLegion",
  description: "Gold Miners are poisening local water supplies due to malpractice",
  start:"2009-02-18",
  phase: "active"
}

// dalMySQL.createPerson(person, function(err, response) {
//   if (err) return console.log(err)
//   console.log(response)
// })

// dalMySQL.updatePerson(updatePerson, function(err, response) {
//   if (err) return console.log(err)
//   console.log(response)
// })

// dalMySQL.deletePerson(7, function(err, response) {
//   if (err) return console.log(err)
//   console.log(response)
// })

// dalMySQL.getPerson(1, function(err, response) {
//   if (err) return console.log("Err: " + err)
//   console.log("Response: " + response)
// })

// dalMySQL.listPersons(function(err, response) {
//   if (err) return console.log("Err: " + err)
//   console.log("Response: " + response)
// })

// dalMySQL.createRelief(relief, function(err, response) {
//    if (err) return console.log("Err: " + err)
//    console.log("Response: " + response)
// })

// dalMySQL.getRelief(1, function(err, response) {
//    if (err) return console.log("Err: " + err)
//    console.log("Response: " + response)
// })

// dalMySQL.updateRelief(updateRelief, function(err, response) {
//   if (err) return console.log(err)
//   console.log(response)
// })

dalMySQL.listReliefs(function(err, response) {
  if (err) return console.log(err)
  console.log(response)
})
