/*jshint esversion: 6 */
////////////////////
//     NO SQL
////////////////////

// To run program.js from terminal, ensure you are in the correct directory
//  and run the following command:
// $ NODE_ENV=production node addPerson.js

const dalNoSQL = require('./DAL/no-sql.js');

// person data. Use to test the createPerson() function within your DAL,
// Make INDIVIDUAL calls to the createPerson() function within your DAL
// with each person within the array.
const personData = [{
//     firstName: "Jimmy",
//     lastName: "Martin",
//     phone: "404 394-2479",
//     email: "JimmyMartinJr@gmail.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Tom",
//     lastName: "Jefferson",
//     phone: "843 444-4444",
//     email: "TJ@dentalone.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Wyatt",
//     lastName: "Johnston",
//     phone: "843 222-1212",
//     email: "WyattJ1111@gmail.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Gary",
//     lastName: "Johnson",
//     phone: "843 555-9876",
//     email: "gary.johnson1971@gmail.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Judy",
//     lastName: "Jones",
//     phone: "843 555-5555",
//     email: "judy5555@aol.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Libby",
//     lastName: "Satterfield",
//     phone: "843 888-8438",
//     email: "lsat1972@gmail.com",
//     type: "person",
//     active: true
// },{
//     firstName: "Steve",
//     lastName: "Ananias",
//     phone: "843 555-1515",
//     email: "stevean@duke.edu",
//     type: "person",
//     active: true
// }]
    firstName: "Rick",
    lastName: "Sanchez",
    phone: "843 105-1019",
    email: "rickandmorty@cofc.edu",
    type: "person",
    active: true
},{
    firstName: "Jamie",
    lastName: "Thomas",
    phone: "843 907-9087",
    email: "sthomasj@fallen.com",
    type: "person",
    active: true
},{
    firstName: "Steve",
    lastName: "Caballero",
    phone: "301 555-1515",
    email: "steveCab@gmail.com",
    type: "person",
    active: true
},{
    firstName: "Nina",
    lastName: "Monaghan",
    phone: "843 555-1515",
    email: "ninaMarie@gmail.com",
    type: "person",
    active: true
},{
    firstName: "Jesus",
    lastName: "Christ",
    phone: "666 911-0000",
    email: "jcsuperStart@not4money.org",
    type: "person",
    active: true
}]

function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

personData.forEach(function(person) {
  dalNoSQL.createPerson(person, callback('PERSON CREATED:\n'))
})
