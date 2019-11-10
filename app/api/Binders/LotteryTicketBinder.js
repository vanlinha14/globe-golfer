export default class LotteryTicketBinder {
  bind(input) {
    try {
      const result = input.result
      const data = input.data

      if (result) {
        return data.ticketNumber
      }
      else {
        return null
      }
    }
    catch {
      return null
    }
  }
}