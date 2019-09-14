import React from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import DGText from '../../../components/DGText'
import Theme from '../../../res/Theme'

const InterestItem = React.memo(({name, style, selected, onPress}) => {

  const itemWidth = (Dimensions.get('window').width - 60) / 3
  return (
    <TouchableOpacity style={[
      {
        marginHorizontal: 4,
        marginBottom: 8,
        borderWidth: 1,
        height: 40,
        width: itemWidth,
        justifyContent: 'center',
        borderColor: 'gray',
        backgroundColor: selected ? Theme.buttonPrimary : "black"
      },
      style
    ]} disabled={!onPress} onPress={onPress} activeOpacity={0.7}>
      <DGText style={{
        alignSelf: 'center',
        color: 'white'
      }}>{name}</DGText>
    </TouchableOpacity> 
  )
})

export default InterestItem