
const dalNoSQL = require('./DAL/no-sql.js');

//const sortBy = 'lastNameView'
const sortBy = 'reliefEfforts'
//const startKey = ''
const limit = 2

//const startKey = "Johnsonperson_gary.johnson1971@gmail.com"
const startKey = 'Haiti 2015'

// dalNoSQL.listPersons(sortBy, startKey, limit, function callback(err, data) {
//     if (err) {
//       console.log(err)
//       }
//     if (data) {
//         console.log(JSON.stringify(data, null, 2))
//     }
// });


dalNoSQL.listReliefEfforts(sortBy, startKey, limit, function callback(err, data) {
    if (err) {
      console.log(err)
      }
    if (data) {
        console.log(JSON.stringify(data, null, 2))
    }
});
