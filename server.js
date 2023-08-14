const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


var http = require('http')
var fs = require('fs')

const PORT = 8080

fs.readFile('./index.html', function(error, html) {
  if(error) throw error;
  http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"})
    response.write(html)
    response.end()
  }).listen(PORT)
})
