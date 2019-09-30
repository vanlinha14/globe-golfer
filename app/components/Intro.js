import React from 'react'
import RN, {
  Dimensions,
  View,
  Image
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import DGText from './DGText'
import Theme from '../res/Theme';

const introData = [
  {
    image: require('../res/images/intro-1.jpg'),
    content: "Challenge and meet other members"
  },
  {
    image: require('../res/images/intro-2.jpg'),
    content: "Play in match play course & putting green"
  },
  {
    image: require('../res/images/intro-3.jpg'),
    content: "Score points to go in the final"
  }
]

const DotPagination = React.memo(({activeSlide}) => {
  return (
    <Pagination
      style={{
      }}
      dotsLength={introData.length}
      activeDotIndex={activeSlide || 0}
      containerStyle={{ 
        position: 'absolute',
        alignSelf: 'center',
        bottom: -8,
      }}
      dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: Theme.buttonPrimary,
          marginHorizontal: -12
      }}
      inactiveDotStyle={{
        backgroundColor: 'white'
      }}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
    />
  )
})

const carouselWidth = Dimensions.get('screen').width
const itemWidth = carouselWidth - 32

const renderItem = ({item}) => {
  return (
    <View>
      <RN.Image
        style={{ 
          width: itemWidth, 
          height: itemWidth,
          marginVertical: 8,
          borderRadius: carouselWidth / 2
        }}
        resizeMethod='resize'
        resizeMode='cover'
        source={item.image}
      />
      <DGText
        style={{
          width: '60%',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
          position: 'absolute',
          bottom: 40,
          textAlign: 'center',
          alignSelf: 'center'
        }}
      >{item.content}</DGText>
    </View>
  )
}

const Intro = React.memo(() => {
  const [activeSlide, setActiveSlide] = React.useState()
  return (
    <View>
      <Carousel
        style={{
          width: carouselWidth,
          height: carouselWidth
        }}
        data={introData}
        renderItem={renderItem}
        sliderWidth={carouselWidth}
        itemWidth={itemWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <DotPagination activeSlide={activeSlide} />
    </View>
  )
})

export default Intro;