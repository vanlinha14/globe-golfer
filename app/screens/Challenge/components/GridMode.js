import React from 'react'
import { FlatList } from 'react-native'
import CardBasicInfo from './CardBasicInfo.gridmode'

const GridMode = React.memo(({data}) => {
  const keyExtractor = (_, index) => "grid item " + index

  const renderItem = ({item}) => (
    <CardBasicInfo
      avatar={item.avatar} 
      name={item.name} 
      location={item.location} 
      rating={item.rating}
    />
  );

  return (
    <FlatList 
      keyExtractor={keyExtractor}
      data={data}
      numColumns={2}
      renderItem={renderItem}
    />
  )
})

export default GridMode