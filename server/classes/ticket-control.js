const fs = require('fs')

class Ticket {
  constructor(number, desk) {
    this.number = number
    this.desk = desk
  }
}

class TicketControl {
  constructor() {
    this.lastOne = 0
    this.today = new Date().getDate()
    this.tickets = []
    this.lastFour = []

    const data = require('./../data/data.json')

    if (data.today === this.today) {
      this.lastOne = data.lastOne
      this.tickets = data.tickets
      this.lastFour = data.lastFour
    } else {
      this.rebootCount()
    }
  }

  next() {
    this.lastOne += 1

    const ticket = new Ticket(this.lastOne, null)
    this.tickets.push(ticket)

    this.saveData()
    return `Ticket ${this.lastOne}`
  }

  getLastOne() {
    return `Ticket ${this.lastOne}`
  }

  getLastFour() {
    return this.lastFour
  }

  takeTicket(desk) {
    if (this.tickets.length === 0) {
      return {
        err: true,
        message: 'No tickets'
      }
    }

    let ticketNumber = this.tickets[0].number
    this.tickets.shift()

    const ticketTaken = new Ticket(ticketNumber, desk)

    this.lastFour.unshift(ticketTaken)

    if (this.lastFour.length > 4) {
      this.lastFour.pop()
    }

    this.saveData()

    return ticketTaken
  }

  rebootCount() {
    this.lastOne = 0
    this.tickets = []
    this.lastFour = []
    this.saveData()
    console.log('System Rebooted')
  }

  saveData() {
    const jsonData = {
      lastOne: this.lastOne,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    }

    const jsonDataString = JSON.stringify(jsonData)
    fs.writeFileSync('./server/data/data.json', jsonDataString)
  }
}

module.exports = {
  TicketControl
}