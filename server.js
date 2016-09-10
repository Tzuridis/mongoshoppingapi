var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

console.log(__dirname); 
console.log(require('fs').existsSync(__dirname + '/public'));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



var Item = require('./models/items.js');

app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.put('/items/:id', function(req, res) {
    // console.log(req.params.id)
    var id = req.params.id
    Item.findByIdAndUpdate(
        id, {
            $set: {
                name: req.body.name
            }
        }, {
            new: true
        },
        function(err, item) {
            if (err) {
                res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            // console.log('returned Item', item)
            res.status(201).json(item);
        })
})

app.delete('/items/:id', function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        item.remove().then(function(item) {
            res.status(200).json(item);
            // if (err) return handleError(err);
        });
    })

});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;