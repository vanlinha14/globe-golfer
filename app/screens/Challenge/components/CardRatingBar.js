import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Star = React.memo(({isActive, small}) => {
  return (
    <Icon 
      style={{ marginHorizontal: 2 }}
      name={"ios-star"} 
      color={isActive ? Theme.buttonPrimary : 'white'} 
      size={small ? 12 : 20}
    />
  )
})

const CardRatingBar = React.memo(({small, star}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Star isActive={1 <= star} small={small}/>
      <Star isActive={2 <= star} small={small}/>
      <Star isActive={3 <= star} small={small}/>
      <Star isActive={4 <= star} small={small}/>
      <Star isActive={5 <= star} small={small}/>
    </View>
  )
})

export default CardRatingBar