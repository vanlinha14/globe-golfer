import moment from 'moment'
import lodash from 'lodash'
import { GET_AVATAR } from '../Endpoints'

export default class NotificationBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {

        const messageString = i.detail.trim()
        const message = JSON.parse(messageString)

        return {
          id: i.id,
          playerId: i.sender_id,
          challengeId: i.challenge_id,
          scheduleId: i.scheduleId,
          type: i.type,
          typeMessage: i.type_message,
          lastMessage: message[message.length - 1].trim(),
          message: lodash.reverse(message),
          duration: moment(i.create_at).fromNow(),
          avatar: i.avatar ? GET_AVATAR.replace("{id}", i.avatar) : null,
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