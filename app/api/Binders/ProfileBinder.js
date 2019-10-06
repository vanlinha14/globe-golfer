import { GET_AVATAR } from "../Endpoints"

export default class ProfileBinder {
  bind(input) {
    try {
      const result = input.result
      const user = input.data[0]
      const id = user.userId
      const index = user.p_index
      const fname = user.firstname
      const lname = user.lastname
      const avatar = user.avatar ? GET_AVATAR.replace("{id}", user.avatar) : null 
      const about = user.about
      const club = user.golfCourseName
      const clubId = user.golfCourseId
      const region = user.regionName
      const country = user.countryName
      const distance = user.distance
      const indexMin = user.index_min
      const indexMax = user.index_max
      const ageMin = user.age_min
      const ageMax = user.age_max
      const showGG = user.show_gg
      const message = user.message
      const globegolfer = user.globe_golfer
      const interest = user.interest.map(i => {
        return {
          id: i.interestId,
          name: i.name
        }
      })

      if (result === true) {
        return { 
          result,
          user: {
            id,
            index,
            club,
            clubId,
            region, 
            country,
            firstName: fname,
            lastName: lname,
            avatar,
            about,
            interest
          },
          settings: {
            indexRange: {
              min: indexMin,
              max: indexMax
            },
            ageRange: {
              min: ageMin,
              max: ageMax
            },
            distance,
            globegolfer,
            showGG,
            message
          }
        }
      }
      else {
        return { 
          result: false
        }
      }
    }
    catch {
      return {
        result: false
      }
    }
  }
}