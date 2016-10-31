const dalNoSQL = require('./DAL/no-sql.js');

var designDoc = {
    _id: '_design/reliefEfforts',
    views: {
        'reliefEfforts': {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit(doc.name);
                }
            }.toString()
        }
    }
}

var designDoc2 = {
    _id: '_design/emailView',
    views: {
        'emailView': {
            map: function(doc) {
                if (doc.type === 'person') {
                    emit(doc.email + doc._id);
                }
            }.toString()
        }
    }
}

var designDoc3 = {
    _id: '_design/lastNameView',

    views: {
        'lastNameView': {
            map: function(doc) {
                if (doc.type === 'person') {
                    emit(doc.lastName + doc._id);
                }
            }.toString()
        }
    }
}

dalNoSQL.createView(designDoc, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dalNoSQL.createView(designDoc2, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dalNoSQL.createView(designDoc3, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})
