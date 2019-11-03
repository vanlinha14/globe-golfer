import React from 'react'
import { View } from 'react-native'
import CardMetaData from './CardMetaData';
import CardBasicInfo from './CardBasicInfo.tindermode';
import CardAbout from './CardAbout';
import Ads from '../../../components/Ads';

const Card = React.memo(({withAds, card}) => (
  <View style={{
    flex: 1,
    marginTop: -48,
    marginBottom: 92,
    backgroundColor: Theme.mainBackground
  }}>
      <CardMetaData data={card.metaData} />
      <CardBasicInfo avatar={card.avatar} name={card.name} location={card.location} rating={card.rating}/>
      {card.about ? <CardAbout about={card.about} /> : null}
      {withAds ? <Ads /> : null}
  </View>
))

export default Card