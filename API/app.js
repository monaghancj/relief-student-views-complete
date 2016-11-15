// Our API goes here!
var HTTPError = require('node-http-error')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()
const port = process.env.PORT || 8080  // Use process.env to acess the contents of the user environment
const dal = require('../DAL/no-sql.js')

app.use(bodyParser.json())

//Allows CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  const sortBy = req.query.sortby || 'vPerson'//'lastNameView';
  const sortToken = req.query.sorttoken || ''
  const limit = req.query.limit || 5

  dal.listPersons(sortBy, sortToken, limit, function(err, body){
    console.log(sortBy, sortToken, limit)
    if (err) {
      var newErr = new HTTPError(500, 'Bad Sumtin', {
        m: err
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(200).send(JSON.stringify(body, null, 2))
    }
  })
})

app.post('/persons', function(req, res, next) {

  dal.createPerson(req.body, function(err, body) {
    if (err) return next(err)
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.put('/persons/:id', function(req, res, next) {
  dal.getPerson(req.params.id, function(err, data){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Get Person did not work'
      })
      return next(newErr)
    }
    req.body["_id"] = data["_id"]
    req.body["_rev"] = data["_rev"]
    dal.updatePerson(req.body, function(err, body) {
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
})

app.delete('/persons/:id', function(req, res, next) {
  dal.getPerson(req.params.id, function(err, data) {
    if (err) return next(err)
    if (data) {
      console.log('DATA in app: ' + data)
      dal.deletePerson(data, function(deletedErr, deletedBody) {
        if (deletedErr) {
          console.log(deletedErr)
          var newErr = new HTTPError(500, 'Bad Request ID', {
            m: 'Delete Person did not work',
            err: deletedErr
          })
          return next(newErr)
        }
        if (deletedBody) {
          res.append('content-type', 'application/json')
          res.status(500).send(JSON.stringify(deletedBody, null, 2))
        }
      })
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

//      '/reliefEfforts?sortby=name&startkey=haiti+2015&limit=5
app.get('/reliefEfforts', function(req, res, next) {
  const sortBy = req.query.sortby || 'vRelief'
  const sortToken = req.query.sorttoken || ''
  const limit = req.query.limit || 5

  dal.listReliefEfforts(sortBy, sortToken, limit, function(err, body){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Sumtin', {
        m: 'Something went wrong'
      })
      return next(newErr)
    }
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.post('/reliefEfforts', function(req, res, next) {

  dal.createReliefEffort(req.body, function(err, body) {
    if (err) console.log('Didnt work: ' + err)
    if (body) {
      res.append('content-type', 'application/json')
      res.status(500).send(JSON.stringify(body, null, 2))
    }
  })
})

app.put('/reliefEfforts/:id',  function(req, res, next) {
  dal.getReliefEffort(req.params.id, function(err, data){
    if (err) {
      var newErr = new HTTPError(500, 'Bad Request ID', {
        m: 'Get Relief Effort did not work'
      })
      return next(newErr)
    }
    req.body["_id"] = data["_id"]
    req.body["_rev"] = data["_rev"]
    dal.updateReliefEffort(req.body, function(updatedErr, updatedBody) {
      if (updatedErr) {
        var newErr = new HTTPError(500, 'Bad Request ID', {
          m: 'Update Relief did not work'
        })
        return next(newErr)
      }
      if (updatedBody) {
        res.append('content-type', 'application/json')
        res.status(500).send(JSON.stringify(updatedBody, null, 2))
      }
    })
  })
})

app.delete('/reliefEffort/:id',  function(req, res, next) {
  dal.getReliefEffort(req.params.id, function(err, data) {
    if (err) return next(console.log("get Person failed"))
    if (data) {
      dal.deleteReliefEffort(data, function(deletedErr, deletedBody) {
        if (deletedErr) {
          var newErr = new HTTPError(500, 'Bad Request ID', {
            m: 'Delete Relief did not work'
          })
          return next(newErr)
        }
        if (deletedBody) {
          res.append('content-type', 'application/json')
          res.status(500).send(JSON.stringify(body, null, 2))
        }
      })
    }
  })
})
//  --------

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})
