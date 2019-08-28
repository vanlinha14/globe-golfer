export default class MatchInfoBinder {
  bind(input) {
    try {
      const data = input.data 
      return data.map(i => {
        return {
          from: {
            id: i.id_user_from,
            name: i.name_user_from,
            avatar: i.avatar_user_from
          },
          to: {
            id: i.id_user_to,
            name: i.name_user_to,
            avatar: i.avatar_user_to
          }
        }
      })
    }
    catch {
      return {
        result: false
      }
    }
  }
}