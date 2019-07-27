import React from 'react'

import Swiper from 'react-native-deck-swiper'
import Card from './Card';

const TinderMode = React.memo(({data}) => (
  <Swiper
    cards={data}
    renderCard={(card) => <Card card={card} />}
    disableTopSwipe={true}
    disableBottomSwipe={true}
    verticalSwipe={false}
    onSwiped={(cardIndex) => {console.log(cardIndex)}}
    onSwipedAll={() => {console.log('onSwipedAll')}}
    cardIndex={0}
    backgroundColor={Theme.mainBackground}
    stackSize= {3}>
  </Swiper>
))

export default TinderMode