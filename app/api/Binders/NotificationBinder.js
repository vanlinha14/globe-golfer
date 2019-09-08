import moment from 'moment'

export default class NotificationBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {

        const messageString = i.detail.trim()
        const message = JSON.parse(messageString)

        return {
          id: i.id,
          challengeId: i.challenge_id,
          type: i.type,
          typeMessage: i.type_message,
          lastMessage: message[message.length - 1],
          message,
          duration: moment(i.create_at).fromNow(),
          avatar: i.avatar,
          name: i.full_name,
          createAt: i.create_at
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