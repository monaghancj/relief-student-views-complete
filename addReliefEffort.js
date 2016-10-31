/*jshint esversion: 6 */
////////////////////
//     NO SQL
////////////////////

// To run program.js from terminal, ensure you are in the correct directory
//  and run the following command:
// $ NODE_ENV=production node addReliefEffort.js

const dalNoSQL = require('./DAL/no-sql.js');

const reliefEffortData = [{
//     "phase": "completed",
//     "name": "Hurricane Hugo 1989",
//     "organizationID": "Hurricane Helpers",
//     "desc": "Purricane Hugo was a powerful Cape Verde-type hurricane that caused widespread damage and loss of life in the Leeward Islands, Puerto Rico, and the Southeast United States in 1989",
//     "start": "1989-09-10",
//     "end": "1989-09-25",
//     "active": true
// },
// {
//     "type": "relief",
//     "phase": "completed",
//     "name": "Haiti 2015",
//     "organizationID": "St. Phillips",
//     "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
//     "start": "2015-09-25",
//     "end": "2015-10-01",
//     "team": [{
//         "name": "Steve Ananias",
//         "role": "Team Leader",
//         "personID": "person_stevean@duke.edu"
//     }, {
//         "name": "Libby Satterfield",
//         "role": "Team member",
//         "personID": "person_lsat1972@gmail.com"
//     }, {
//         "name": "Judy Jones",
//         "role": "Team member",
//         "personID": "person_judy5555@aol.com"
//     }]
// },
// {
//     "type": "relief",
//     "phase": "planning",
//     "name": "Haiti 2017",
//     "organizationID": "St. Phillips",
//     "desc": "Provide dental services, education, and supplies to the village of Gros Mangle on the island of La Gonave, Haiti.  Island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.The bulk of the mission work will take place at St.Esprit(Holy Spirit) church and school in the remote village of Gros Mangle, Haiti.The team will consist of team leaders, dentists, and dental hygienists.",
//     "start": "2016-11-01",
//     "end": "2016-11-08",
//     "team": [{
//         "name": "Steve Harvey",
//         "role": "Team Leader",
//         "personID": "person_steveharvey1111@gmail.com"
//     }, {
//         "name": "Libby Satterfield",
//         "role": "Team member",
//         "personID": "person_lsat1972@gmail.com"
//     }, {
//         "name": "Jimmy Martin",
//         "role": "Team member",
//         "personID": "person_JimmyMartinJr@gmail.com"
//     }]
// },
// {
//     "phase": "completed",
//     "name": "Kenya 2015",
//     "organizationID": "St. Phillips",
//     "desc": "Build school in Kenya",
//     "start": "2015-01-05",
//     "end": "2015-02-15"
// },
// {
//     "type": "relief",
//     "phase": "completed",
//     "name": "Kenya 2016",
//     "organizationID": "St. Phillips",
//     "desc": "Build hospital in Kenya",
//     "start": "2016-01-05",
//     "end": "2016-02-15",
//     "active": true
// }
    "phase": "planning",
    "name": "America 2017",
    "organizationID": "American Citizens",
    "desc": "Get a new president",
    "start": "2016-10-05",
    "end": "2017-06-15"
  },{
      "phase": "aborted",
      "name": "Kongo 2016",
      "organizationID": "French Foreign Legion",
      "desc": "Rid of illegal gold mining polluting area, aborted due to guerilla groups.",
      "start": "2016-01-05",
      "end": "2016-09-15"
  },{
      "phase": "ongoing",
      "name": "Syria 2016",
      "organizationID": "European Aleagance",
      "desc": "Take in refugees",
      "start": "2016-01-05",
      "end": "2017-03-15"
  },{
      "phase": "completed",
      "name": "Middle East 2015",
      "organizationID": "St. Phillips",
      "desc": "Supply assets to refugees of area",
      "start": "2014-10-05",
      "end": "2016-02-15"
  },{
      "phase": "ongoing",
      "name": "World 2010",
      "organizationID": "Lutheran World Relief",
      "desc": "Extends the hand of Christian love to people overcoming poverty and injustice in 50 countries.",
      "start": "n/a",
      "end": "n/a"
  }
];


function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}

reliefEffortData.forEach(function(reliefEffort, index) {
  dalNoSQL.createReliefEffort(reliefEffort, callback('RELIEF EFFORT CREATED:\n'))
})

//console.log(dalNoSQL.getDBInfo());
