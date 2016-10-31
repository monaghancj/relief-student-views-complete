const dalNoSQL = require('./DAL/no-sql.js');

var designDoc4 = {
    _id: '_design/phaseNameView',

    views: {
        'phaseNameView': {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit([doc.phase, doc.name], {
                      'name': doc.name,
                      'phase': doc.phase,
                      'startDate': doc.start,
                      'endDate': doc.end
                    })
                }
            }.toString()
        }
    }
}

dalNoSQL.createView(designDoc4, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})
