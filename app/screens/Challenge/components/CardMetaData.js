import React from 'react'
import { View } from 'react-native'
import CardMetaItem from './CardMetaItem'

const CardMetaData = React.memo(({data}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {
        data.map((element, index) => {
          return <CardMetaItem key={"card meta item " + index} data={element} />
        })
      }
    </View>
  )
})

export default CardMetaData