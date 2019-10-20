import React from 'react'
import { View } from 'react-native'
import CardMetaData from './CardMetaData';
import CardBasicInfo from './CardBasicInfo.tindermode';
import CardAbout from './CardAbout';
import Ads from '../../../components/Ads';

const Card = React.memo(({card}) => (
  <View style={{
    flex: 1,
    marginTop: -48,
    marginBottom: 92,
    backgroundColor: Theme.mainBackground
  }}>
      <CardMetaData data={card.metaData} />
      <CardBasicInfo avatar={card.avatar} name={card.name} location={card.location} rating={card.rating}/>
      <CardAbout about={card.about} />
      <Ads />
  </View>
))

export default Card