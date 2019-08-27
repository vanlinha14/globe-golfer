export default class NotificationBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.id,
          challengeId: i.challenge_id,
          type: i.type,
          lastMessage: i.detail,
          duration: i.create_at
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

// avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg",
// name: "Gentlemen golfer",
// lastMessage: "Recu",
// duration: "73:34:40"