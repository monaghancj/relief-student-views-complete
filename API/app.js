// Our API goes here!
var HTTPError = require('node-http-error')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()
const port = process.env.PORT || 3000  // Use process.env to acess the contents of the user environment
const dal = require('../DAL/no-sql.js')

var jsonParser = bodyParser.json()

// ------  GENERAL  -------  //
app.get('/', function (req, res) {
  res.send('Hello World!')
})

///////////////////////////////
// ------  PERSONS  -------  //
///////////////////////////////
app.get('/persons/:id', function(req, res, next) {
  dal.getPerson(req.params.id, function(err, body){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Try another ID'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(200).send(body)
    }
  })
})

app.get('/persons', function(req, res, next) {
  dal.listPersons('emailView', '', 10, function(err, body){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Sumtin', {
        m: 'Something went wrong'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body.rows, null, 2))
    }
  })
})

app.post('/persons', jsonParser, function(req, res, next) {
  var personData = {
     "firstName": "Mary",
     "lastName": "Gonzalez",
     "phone": "404 303-1234",
     "email": "mgo1234@yahoo.com"
  }

  dal.createPerson(personData, function(err, body) {
    if (err) console.log('Didnt work')
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.put('/persons/:id', jsonParser, function(req, res, next) {
  var personData = {
    "_id": "person_mgo1234@yahoo.com",
    "_rev": "9-5fe47d418eb350771cd818ab6e3f58c6",
    "firstName": "Mary",
    "lastName": "Gonzalezss",
    "phone": "404 303-1234",
    "email": "mgo1234@yahoo.com"
  }

  dal.updatePerson(personData, function(err, body) {
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Update Person did not work'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.delete('/persons/:id', jsonParser, function(req, res, next) {
  var personData = {
    "_id": "person_JimmyMartinJr@gmail.com",
    "_rev": "1-6a03349ba1398f6d38a3871ff9721725"
  }
  dal.deletePerson(personData, function(err, body) {
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Delete Person did not work'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

/////////////////////////////////////////
//  --------  RELIEF EFFORTS --------  //
/////////////////////////////////////////
app.get('/reliefEfforts/:id', function(req, res, next) {
  dal.getReliefEffort(req.params.id, function(err, body){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Try another ID'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(200).send(body)
    }
  })
})

//       /reliefEfforts?sortby=name&startkey=haiti+2015&limit=5
app.get('/reliefEfforts', function(req, res, next) {
  dal.listReliefEfforts('reliefEfforts', '', 10, function(err, body){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Sumtin', {
        m: 'Something went wrong'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body.rows, null, 2))
    }
  })
})

app.post('/reliefEfforts', jsonParser, function(req, res, next) {
  var reliefData = {
    "phase": "complete",
    "name": "Tears of the Sun 2003",
    "organizationID": "Special-Ops",
    "desc": "Evacuate UN doctor from Nigerian village due to dangerous, growing militia groups in the area. ",
    "start": "2002-12-01",
    "end": "203-12-08",
    "team": [
      {
        "name": "Bruce Willis",
        "role": "Team Leader",
        "personID": "person_steveharvey1111@gmail.com"
      },
      {
        "name": "Bad Ass # 1",
        "role": "Team member",
        "personID": "person_marine2thaCore1972@gmail.com"
      },
      {
        "name": "Bad Ass # 2",
        "role": "Team member",
        "personID": "person_junglefever@gmail.com"
      }
    ]
  }

  dal.createReliefEffort(reliefData, function(err, body) {
    if (err) console.log('Didnt work')
    if (body) {
      // console.log('Worked: ' + JSON.stringify(res))
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.put('/reliefEfforts/:id', jsonParser, function(req, res, next) {
  var reliefData = {
    "_id": "relief_Special-Ops_Tears_of_the_Sun_2003",
    "_rev": "1-a2803cd7b162539ba938daf544ca73c1",
    "phase": "complete",
    "name": "Tears of the Sun 2003",
    "organizationID": "Special-Ops",
    "desc": "Evacuate UN doctor from Nigerian village due to dangerous, growing militia groups in the area. ",
    "start": "2002-12-01",
    "end": "2003-12-08",
    "team": [
      {
        "name": "Bruce Willis",
        "role": "Team Leader",
        "personID": "person_willyBruce1@gmail.com"
      },
      {
        "name": "Bad Ass # 1",
        "role": "Team member",
        "personID": "person_marine2thaCore1972@gmail.com"
      },
      {
        "name": "Bad Ass # 2",
        "role": "Team member",
        "personID": "person_junglefever@gmail.com"
      }
    ]
  }

  dal.updatePerson(reliefData, function(err, body) {
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Update Relief did not work'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.delete('/reliefEffort/:id', jsonParser, function(req, res, next) {
  var reliefData = {
    "_id": "relief_Special-Ops_Tears_of_the_Sun_2003",
    "_rev": "2-3724702d9f0504f4796985a2945f00d0"
  }
  dal.deleteReliefEffort(reliefData, function(err, body) {
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Delete Relief did not work'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})
//  --------

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
