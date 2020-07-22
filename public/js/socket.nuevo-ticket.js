const socket = io()

const label = $('#lblNuevoTicket')

socket.on('connect', () => {
  console.log('Connected to the server')

  socket.on('getLastOne', (response) => {
    label.text(response.lastOne)
  })
})

socket.on('disconnect', () => {
  console.log('Disconnected to the server')
})

$('button').on('click', () => {
  socket.emit('newTicket', null, function(response) {
    label.text(response)
  })
})