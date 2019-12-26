export default class AdsBinder {
  bind(input) {
    try {
      const data = input.data

      return {
        id: data.advertisementId,
        description: data.description,
        image: data.urlImage,
        link: data.link
      }
    }
    catch {
      return {
        result: false
      }
    }
  }
}