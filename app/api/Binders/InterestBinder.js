export default class InterestBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.interestId,
          name: i.name
        };
      })
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}