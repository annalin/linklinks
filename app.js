'use strict';

let  config = require(__dirname + "/config.js")
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let Link = require('./models/Link');
// Ensure that an index createdAt exists
Link.ensureIndex("createdAt");



io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('link', function(msg){
    console.log('link: ' + msg);
    createLink({ content: msg })
    .then((savedObj) => {
      io.emit('link', savedObj.content);
    })
    .catch((err) => console.error(err));
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.use(express.static(__dirname + '/public'));

// show main index.html page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/links/all', getLinks);

// Create a new link
function createLink(obj) {
  var link = new Link(obj);
  return link.save()
}

// Retrieve all links
function getLinks(req, res, next) {
  console.log('hit links')
    Link.orderBy({index: "createdAt"}).run()
    .then((result) => {
      console.log(result);
        res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Delete a link
// function deleteLink(req, res, next) {
//   Link.get(req.body.id).run().then(function(link) {
//     link.delete().then(function(result) {
//       res.send("");
//     }).error(handleError(res));
//   }).error(handleError(res));

  // Another way to delete a link is with
  // Link.get(req.body.id).delete().execute()
// }

http.listen(config.express.port, function(){
  console.log('listening on:' + config.express.port);
});

module.exports = app;
