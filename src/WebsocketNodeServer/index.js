const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

var counter = 0;

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('counter: ' + counter++);
    //console.log('message: ' + msg);
  })

  socket.on('my message', (msg) => {
    msg += ' - from server with counter = ' + this.counter;
    io.emit('my broadcast', `server: ${msg}`);

  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});