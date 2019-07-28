import React from 'react'
import { FlatList } from 'react-native'
import CardBasicInfo from './CardBasicInfo.gridmode'

const GridMode = React.memo(({data, onItemSelected}) => {
  const keyExtractor = (_, index) => "grid item " + index

  const renderItem = ({item, index}) => (
    <CardBasicInfo
      index={index}
      avatar={item.avatar} 
      name={item.name} 
      location={item.location} 
      rating={item.rating}
      onPress={onItemSelected}
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