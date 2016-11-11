const path = require('path')
const fetchConfig = require('zero-config')
const mysql = require('mysql')

var dal = {
  getPerson: getPerson,
  updatePerson: updatePerson,
  createPerson: createPerson,
  deletePerson: deletePerson,
  listPersons: listPersons,
  getRelief: getRelief,
  updateRelief: updateRelief,
  createRelief: createRelief,
  deleteRelief: deleteRelief,
  listReliefs: listReliefs
}

//////////////////////////////////////////////
////////      UTILITY FUNCTIONS     //////////
//////////////////////////////////////////////
function createConnection() {
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'burganday1.',
    database: 'Persons'
  })
}

function prepDataForDB(data) {
    if (data.hasOwnProperty('active') === true) {
        data.active = data.active === true ? 1 : 0
    }

    if (data.hasOwnProperty('type') === true) {
        delete data.type
    }
    return data;
}

function parseToJSON(data) {
  return JSON.parse(JSON.stringify(data))
}

// var convertPersonNoSQLFormat = function(data) {
//   data.active
// }

function deleteDocByID(table, id, callback) {
  if (typeof id == 'undefined' || id === null) {
    return callback(new Error('400Missing id for delete'))
  }
  var connection = createConnection()
  connection.connect()
  connection.query('DELETE FROM ' + table + ' WHERE ID =' + id, function(err, result) {
    if (err) return callback(err)
    if (result.affectedRows === 0) {
      return callback({
        error: 'not_found',
        reason: 'missing',
        name: 'not_found',
        status: 404,
        message: 'missing'
      })
    }
    if (typeof result !== 'undefined' && result.affectedRows > 0) {
      return callback( null, {
        ok: true,
        result: result
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

function getDocByID(table, id, callback) {
  if (typeof id == 'undefined' || id === null) {
    return callback(new Error('400Missing id for delete'))
  }
  var connection = createConnection()
  connection.connect()
  connection.query('SELECT * FROM ' + table + ' WHERE ID =' + id, function(err, result) {
    if (err) return callback(err)
    if (data.length === 0){
      return callback({
        error: 'not_found',
        reason: 'missing',
        name: 'not_found',
        status: 404,
        message: 'missing'
      })
    }
    if (typeof result !== 'undefined') {
      //return callback(null, data.map(compose(parseToJSON, formatter))[0])
      return callback( null, {
        ok: true,
        result: result
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

function listDocs(table, callback) {
  // Create a connection to mysql
  var connection = createConnection()
  connection.connect()
  connection.query('SELECT * FROM ' + table, function(err, result) {
    if (err) return callback(err)
    if (typeof result !== 'undefined') {
      return callback( null, {
        ok: true,
        result: result
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

///////////////////////////////////////////////
///////         PUBLIC              ///////////
///////////////////////////////////////////////
function createPerson(data, callback) {
  // Data Validation
  if (typeof data == 'undefined' || data === null) {
    return callback(new Error('400 missing data'))
  } else if (data.hasOwnProperty('id') === true) {
    return callback(new Error('400 ID property not need cause its auto gen'))
  } else if (data.hasOwnProperty('firstName') !== true) {
    return callback(new Error('400 Missing firstName property within data'))
  } else if (data.hasOwnProperty('lastName') !== true) {
    return callback(new Error('400 Missing lastName property within data'))
  } else if (data.hasOwnProperty('email') !== true) {
    return callback(new Error('400 Missing email property within data'))
  } else if (data.hasOwnProperty('phone') !== true) {
    return callback(new Error('400 Missing phone property within data'))
  }
  // Create a connection to mysql
  var connection = createConnection()
  connection.connect()

  // Query database by performing a SQL INSERT INTO statement
  connection.query('INSERT INTO persons SET ?', prepDataForDB(data), function(err, result) {
    if (err) return callback(err)
    if (typeof result !== 'undefined' && result.insertId !== 'undefined') {
      console.log('The solution is: ', result);
      return callback( null, {
        ok: true,
        id: result.insertId
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
  // Change the JSON from mysql to the spec for our app
  // Call the callback tell the API that were done (err, result)
  // Terminate connection
}

function updatePerson(data, callback) {
  // Data Validation
  if (typeof data == 'undefined' || data === null) {
    return callback(new Error('400Missing data for update'))
  } else if (data.hasOwnProperty('_id') !== true) {
    return callback(new Error('400Missing _id property within data'))
  }
  // Create a connection to mysql
  var connection = createConnection()
  connection.connect()
  var ID = data._id
  delete data._id
  connection.query('UPDATE persons SET ? WHERE ID =' + ID, prepDataForDB(data), function(err, result) {
    if (err) return callback(err)
    if (typeof result !== 'undefined' && result.affectedRows > 0) {
      console.log('The solution is: ', result);
      return callback( null, {
        ok: true,
        result: result
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

function deletePerson(id, callback) {
  deleteDocByID('persons', id, callback)
}

function getPerson(id, callback) {
   getDocByID('persons', id, callback)
}

function listPersons(callback) {
  listDocs('persons', callback)
}

function createRelief(data, callback) {
  // Data Validation
  if (typeof data == 'undefined' || data === null) {
    return callback(new Error('400 missing data'))
  } else if (data.hasOwnProperty('id') === true) {
    return callback(new Error('400 ID property not need cause its auto gen'))
  } else if (data.hasOwnProperty('name') !== true) {
    return callback(new Error('400 Missing name property within data'))
  } else if (data.hasOwnProperty('organizationID') !== true) {
    return callback(new Error('400 Missing organizationID property within data'))
  } else if (data.hasOwnProperty('description') !== true) {
    return callback(new Error('400 Missing description property within data'))
  }
  // Create a connection to mysql
  var connection = createConnection()
  connection.connect()

  // Query database by performing a SQL INSERT INTO statement
  connection.query('INSERT INTO relief SET ?', prepDataForDB(data), function(err, result) {
    if (err) return callback(err)
    if (typeof result !== 'undefined' && result.insertId !== 'undefined') {
      console.log('The solution is: ', result);
      return callback( null, {
        ok: true,
        id: result.insertId
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

function updateRelief(data, callback) {
  // Data Validation
  if (typeof data == 'undefined' || data === null) {
    return callback(new Error('400Missing data for update'))
  } else if (data.hasOwnProperty('_id') !== true) {
    return callback(new Error('400Missing _id property within data'))
  }
  // Create a connection to mysql
  var connection = createConnection()
  connection.connect()
  var ID = data._id
  delete data._id
  connection.query('UPDATE relief SET ? WHERE ID =' + ID, prepDataForDB(data), function(err, result) {
    if (err) return callback(err)
    if (typeof result !== 'undefined' && result.affectedRows > 0) {
      console.log('The solution is: ', result);
      return callback( null, {
        ok: true,
        result: result
      })
    }
  })
  connection.end(function(err){
    if (err) return err
  })
}

function deleteRelief(id, callback) {
  deleteDocByID('relief', id, callback)
}

function getRelief(id, callback) {
  getDocByID('relief', id, callback)
}

function listReliefs(callback) {
  listDocs('relief', callback)
}

module.exports = dal;
