import React, { PureComponent } from 'react'
import { 
  View, 
  Animated,
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import DGText from '../../components/DGText'
import Theme from '../../res/Theme';

const DotPagination = React.memo(({dotsLength, activeSlide}) => {
  return (
    <Pagination
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

export default class MenuBlock extends PureComponent {

  state = {
    activeSlide: 0
  }

  renderMenuItem(item) {

    let iconSource = null

    switch (item.name) {
      case "Challenge":
        iconSource = require('../../res/images/ic_global_1.png')
        break;
      case "Invite a Friend":
        iconSource = require('../../res/images/ic_global_2.png')
        break;
      case "Play":
        iconSource = require('../../res/images/ic_global_3.png')
        break;
      case "Scores":
        iconSource = require('../../res/images/ic_global_4.png')
        break;
      case "Premium":
        iconSource = require('../../res/images/ic_global_1.png')
        break;
      default:
        iconSource = require('../../res/images/ic_global.png')
        break;
    }

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
          resizeMethod='resize'
          resizeMode='contain'
          source={iconSource}
        />
        <DGText style={{ 
          color: "white", 
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          color: Theme.buttonPrimary
        }}>{item.name}</DGText>
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
        name: "Invite a Friend",
        onPress: this.props.onInvitePress
      },
      {
        name: "Play",
        onPress: this.props.onPlayPress
      },
      {
        name: "Scores",
        onPress: this.props.onScoresPress
      },
      {
        name: "Premium",
        onPress: this.props.onPremiumPress
      }
    ]

    return (
      <View style={[styles.container, this.props.style]}>
        <Carousel
          ref={(c) => { this.carousel = c; }}
          data={data}
          contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
          renderItem={this.renderItem}
          sliderWidth={windowWidth}
          sliderHeight={itemWidth}
          itemWidth={itemWidth}
          itemHeight={itemWidth}
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