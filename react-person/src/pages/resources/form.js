const React = require('react')
const xhr = require('xhr')

const dbUrl = process.env.REACT_APP_DB
const PouchDB = require('pouchdb-http')
const db = PouchDB(dbUrl)

const ResourceForm = React.createClass({
  getInitialState() {
    return {
      err: '',
      result: {},
      resource: {
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        _id: ''
      }
    }
  },
  handleChange(field) {
    return e => {
      let resource = this.state.resource
      resource[field] = e.target.value
      this.setState({resource})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    const resource = this.state.resource
    resource._id = new Date().toISOString()
    // db.put(resource, (err, result) => {
    //   if (err) this.setState({err: err.message})
    //   this.setState({result: result})
    // })
    xhr({
      method: 'POST',
      json: resource,
      //body: resource,
      url: 'http://localhost:8080/persons',
      headers: {
          "Content-Type": "application/json"
      }
    }, function (err, res, body) {
      if (err) {
        this.setState({err})
        console.log(err)
      }
      console.log(res)
    })
  },
  render() {
    // const showError = _ => {
    //   this.state.err !== '' ?
    //   <div>{this.state.err}</div>  : null
    // }
    // const showResult = _ => {
    //   this.state.result !== {} ?
    //   <div>{this.state.result}</div>  : null
    // }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Last name</label>
            <input
              onChange={this.handleChange('lastName')}
              value={this.state.resource.lastName}/>
          </div>
          <div>
            <label>First Name</label>
            <input
              onChange={this.handleChange('firstName')}
              value={this.state.resource.firstName}/>
          </div>
          <div>
            <label>Email</label>
            <input
              onChange={this.handleChange('email')}
              value={this.state.resource.email}/>
          </div>
          <div>
            <label>Phone</label>
            <input
              onChange={this.handleChange('phone')}
              value={this.state.resource.phone}/>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <pre>
          {JSON.stringify(this.state.result, null, 2)}
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    )
  }
})

module.exports = ResourceForm
