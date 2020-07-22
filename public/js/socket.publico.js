var socket = io()

let lblTicket1 = $('#lblTicket1')
let lblTicket2 = $('#lblTicket2')
let lblTicket3 = $('#lblTicket3')
let lblTicket4 = $('#lblTicket4')

let lblDesk1 = $('#lblEscritorio1')
let lblDesk2 = $('#lblEscritorio2')
let lblDesk3 = $('#lblEscritorio3')
let lblDesk4 = $('#lblEscritorio4')

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
let lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4]

socket.on('currentState', function(data) {
  updateHTML(data.lastFour)
})

socket.on('lastFour', function(data) {
  let audio = new Audio('audio/new-ticket.mp3')
  audio.play()
  updateHTML(data.lastFour)
})

function updateHTML(lastFour) {
  lastFour.forEach((ticket, index) => {
    lblTickets[index].text(`Ticket ${ticket.number}`)
    lblDesks[index].text(`Escritorio ${ticket.desk}`)
  });
}