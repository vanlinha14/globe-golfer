import moment from 'moment'

export default class NotificationBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.id,
          challengeId: i.challenge_id,
          type: i.type,
          lastMessage: i.detail.trim(),
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