import React from 'react'
import { Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from './Card'
import Strings from '../../../res/Strings'
import Api from '../../../api';

const windowWidth = Dimensions.get('window').width

const TinderMode = React.memo(({data, showingItemIndex}) => {

  const onSwipedRight = (index) => {
    const target = data[index]
    Api.instance().challengeTo(132);
  }

  return (
    <Swiper
      cards={data}
      disableTopSwipe={true}
      disableBottomSwipe={true}
      verticalSwipe={false}
      backgroundColor={Theme.mainBackground}
      onSwipedLeft={() => { console.warn("swipe left")}}
      onSwipedRight={onSwipedRight}
      cardIndex={showingItemIndex}
      stackSize= {3}
      outputRotationRange={["0deg", "0deg", "0deg"]}
      animateOverlayLabelsOpacity={true}
      overlayOpacityHorizontalThreshold={10}
      outputOverlayLabelsOpacityRangeX={[1, 0.8, 0, 0.8, 1]}
      overlayLabels={{
        left: {
          title: Strings.challenge.notYet,
          style: {
            label: {
              color: 'red',
              marginTop: (windowWidth - 80) / 2 - 22
            },
            wrapper: {
              backgroundColor: '#FF000040',
              alignItems: 'center'
            }
          }
        },
        right: {
          title: Strings.challenge.challenge,
          style: {
            label: {
              color: 'green',
              marginTop: (windowWidth - 80) / 2 - 22
            },
            wrapper: {
              backgroundColor: '#00FF0040',
              alignItems: 'center'
            }
          }
        }
      }}
      renderCard={(card) => <Card card={card} />}
    />
  )
})

export default TinderMode