const { io } = require('../server');
const { TicketControl } = require('./../classes/ticket-control');

const ticketControl = new TicketControl()

io.on('connection', (client) => {

  console.log('User connected');

  client.on('disconnect', () => {
    console.log('User disconnected');
  });

  client.on('newTicket', (data, callback) => {
    callback(ticketControl.next())
  });

  client.emit('getLastOne', {
    lastOne: ticketControl.getLastOne()
  })

  client.emit('currentState', {
    current: ticketControl.getLastOne(),
    lastFour: ticketControl.getLastFour()
  })

  client.on('takeTicket', (data, callback) => {
    if (!data.desk) {
      callback({
        err: true,
        message: 'Desk required'
      })
    }

    const ticketTaken = ticketControl.takeTicket(data.desk)
    callback(ticketTaken)

    client.broadcast.emit('lastFour', {
      lastFour: ticketControl.getLastFour()
    })
  })

});