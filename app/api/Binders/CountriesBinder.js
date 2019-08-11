export default class CountriesBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.id,
          title: i.name
        }
      })
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}