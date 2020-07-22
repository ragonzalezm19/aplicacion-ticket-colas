const socket = io()
const searchParams = new URLSearchParams(window.location.search)
const HTMLSmall = $('small')

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
}

const desk = searchParams.get('escritorio')

$('h1').text(`Escritorio ${desk}`)

socket.on('connect', () => {
  console.log('Connected to the server')
})

socket.on('disconnect', () => {
  console.log('Disconnected to the server')
})

$('button').on('click', () => {
  socket.emit('takeTicket', { desk }, (response) => {
    if (!response.desk) {
      alert(response.message)
      HTMLSmall.text(response.message)
    } else {
      HTMLSmall.text(`Ticket ${response.number}`)
    }
  })
})