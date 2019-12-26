import React from 'react'
import { Alert, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from './Card'
import Strings from '../../../res/Strings'
import Api from '../../../api';

const windowWidth = Dimensions.get('window').width

const TinderMode = React.memo(({data, showingItemIndex, onReload}) => {

  const swiper = React.useRef()

  const onSwipedRight = (index) => {
    const target = data[index]
    Api.instance().challengeTo(target.id);
  }

  const onSwipedAll = () => {
    Alert.alert(
      Strings.appName, 
      "You just explored all challengers. May someone just joined. Reload?",
      [
        {
          text: "Reload",
          onPress: onReload,
          style: 'default'
        }
      ]
    )
  }

  return (
    <Swiper
      ref={swiper}
      cards={data}
      disableTopSwipe={true}
      disableBottomSwipe={true}
      verticalSwipe={false}
      backgroundColor={Theme.mainBackground}
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
      renderCard={(card) => <Card card={card} withAds />}
      onSwipedAll={onSwipedAll}
    />
  )
})

export default TinderMode