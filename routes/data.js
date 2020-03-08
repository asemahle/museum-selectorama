const express = require('express');
const router = express.Router();
const sse = require('./../sse')();
const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(Infinity);

// GET users listing
router.get('/', function(req, res, next) {
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.getUsers().then((users) => {
    res.send(users);
  });
  db.close();
});

// GET users who have not completed the journey

// STREAM of changes made to the user list
router.get('/stream', sse, function(req, res) {
  console.log('SSE connection opened');

  const addFunc = (id) => {
    res.sendEvent({id: id}, 'message');
    console.log('addUser SSE');
  };
  const completeFunc = (id) => {
    res.sendEvent({id: id}, 'message');
    console.log('completeUser SSE');
  };
  eventEmitter.on('addUser', addFunc);
  eventEmitter.on('completeUser', completeFunc);


  // The 'close' event is fired when a user closes their browser window
  req.on("close", function() {
    eventEmitter.removeListener('addUser', addFunc);
    eventEmitter.removeListener('addUser', completeFunc);
    console.log('SSE connection closed');
  });
});

// GET user by id
router.get('/:userID', function(req, res, next){
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.getUser(req.params.userID).then((user) => {
    res.send(user);
  });
  db.close();
});

// POST a new user
router.post('/', function (req, res) {
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.addUser(req.body.displayID, req.body.x, req.body.y).then((user) => {
    eventEmitter.emit('addUser', user.id);
    res.send({id: user.id});
  });
  db.close();
});

// POST a new user who is complete
router.post('/fullAdd', function (req, res) {
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.fullAdd(req.body.x1, req.body.y1, req.body.x2, req.body.y2).then((user) => {
    res.send({id: user.id});
  });
  db.close();
});

// POST to complete a user
router.post('/complete/:userID', function (req, res) {
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.completeUser(req.params.userID, req.body.x, req.body.y).then(() => {
    eventEmitter.emit('completeUser', req.params.userID);
    res.send();
  });
  db.close();
});

// DELETE a user
router.delete('/:userID', function(req, res) {
  const DB = require(process.env.DBJS);
  const db = new DB(process.env.DB);

  db.deleteUser(req.params.userID).then(() => {
    res.send();
  });
  db.close();
});

module.exports = router;
