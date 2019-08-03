import React, { PureComponent } from 'react'
import { 
  View, 
  Animated,
  Image,
  StyleSheet, 
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import DGText from '../../components/DGText'

const DotPagination = React.memo(({dotsLength, activeSlide}) => {
  return (
    <Pagination
      style={{
      }}
      dotsLength={dotsLength}
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
          backgroundColor: Theme.buttonPrimary
      }}
      inactiveDotStyle={{
        backgroundColor: 'white'
      }}
      inactiveDotOpacity={1}
      inactiveDotScale={1}
    />
  )
})

export default class MenuBlock extends PureComponent {

  state = {
    activeSlide: 0
  }

  renderMenuItem(item) {
    return (
      <TouchableOpacity style={{ 
        width: itemWidth,
        height: itemWidth,
        justifyContent: 'center'
      }} activeOpacity={0.7} onPress={item.onPress}>
        <Image
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: itemWidth - 16,
            height: itemWidth - 16
          }}
          source={require('../../res/images/ic_global.png')}
        />
        <DGText style={{ color: "white", alignSelf: 'center' }}>{item.name}</DGText>
      </TouchableOpacity>
    )
  }
    
  renderItem = ({item}) => {
    return this.renderMenuItem(item)
  }

  render() {

    const data = [
      {
        name: "Challenge",
        onPress: this.props.onChallengePress
      },
      {
        name: "Invite a Friend"
      },
      {
        name: "Play"
      },
      {
        name: "All in 1"
      },
      {
        name: "Scores"
      },
      {
        name: "Premium"
      }
    ]

    return (
      <View style={[styles.container, this.props.style]}>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={data}
          renderItem={this.renderItem}
          sliderWidth={windowWidth}
          itemWidth={itemWidth}
          loop={true}
          inactiveSlideScale={0.6}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        <DotPagination dotsLength={data.length} activeSlide={this.state.activeSlide}/>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const itemWidth = windowWidth * 0.4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'center'
  }
})