import React, { PureComponent } from 'react'
import { 
  View, 
  Animated,
  Image,
  StyleSheet, 
  Dimensions,
  TouchableOpacity
} from 'react-native'

import DGText from '../../components/DGText'

const MENU_ITEMS = {
  PLAY: "play",
  CHALLENGE: "challenge",
  SCORES: "scores"
}

export default class MenuBlock extends PureComponent {

  offsetXPlay = new Animated.Value(0)
  offsetXChallenge = new Animated.Value(50)
  offsetXScores = new Animated.Value(100)

  currentLeft = MENU_ITEMS.PLAY
  currentCenter = MENU_ITEMS.CHALLENGE
  currentRight = MENU_ITEMS.SCORES

  runAnimateCenterToLeft() {
    let target = this.locateValue(this.currentCenter)
    this.runAnimateToValue(target, 0)
  }

  runAnimateCenterToRight() {
    let target = this.locateValue(this.currentCenter)
    this.runAnimateToValue(target, 100)
  }

  runAnimateLeftToCenter() {
    let target = this.locateValue(this.currentLeft)
    this.runAnimateToValue(target, 50)
  }

  runAnimateLeftToRight() {
    let target = this.locateValue(this.currentLeft)
    this.runAnimateToValue(target, -100)
  }

  runAnimateRightToCenter() {
    let target = this.locateValue(this.currentRight)
    this.runAnimateToValue(target, 50)
  }

  runAnimateRightToLeft() {
    let target = this.locateValue(this.currentRight)
    this.runAnimateToValue(target, 0)
  }

  runAnimateToValue(target, value) {
    Animated.spring(
      target,
      { toValue: value, friction: 8 }
    ).start()
  }

  locateValue(target) {
    switch(target) {
      case MENU_ITEMS.PLAY: return this.offsetXPlay
      case MENU_ITEMS.CHALLENGE: return this.offsetXChallenge
      case MENU_ITEMS.SCORES: return this.offsetXScores
    }
  }

  requestNext = () => {
    this.locateValue(this.currentRight).setValue(100)

    this.runAnimateCenterToLeft()
    this.runAnimateLeftToRight()
    this.runAnimateRightToCenter()

    setTimeout(() => {
      let temp = this.currentLeft
      this.currentLeft = this.currentCenter
      this.currentCenter = this.currentRight
      this.currentRight = temp
    }, 300)
  }

  requestPrevious = () => {
    this.locateValue(this.currentRight).setValue(-100)

    this.runAnimateCenterToRight()
    this.runAnimateLeftToCenter()
    this.runAnimateRightToLeft()

    setTimeout(() => {
      let temp = this.currentLeft
      this.currentLeft = this.currentRight
      this.currentRight = this.currentCenter
      this.currentCenter = temp
    }, 300)
  }

  renderPlayItem() {
    return this.renderMenuItem("Play", null, this.offsetXPlay)
  }

  renderChallengeItem() {
    return this.renderMenuItem("Challenge", null, this.offsetXChallenge)
  }

  renderScoresItem() {
    return this.renderMenuItem("Scores", null, this.offsetXScores)
  }

  renderMenuItem(name, image, offsetX) {
    let translatePercent = (offsetX._value / 100)
    let translateInterpolate = offsetX.interpolate({
      inputRange: [-100, 0, 50, 100],
      outputRange: [windowWidth - itemWidth, 0, windowWidth / 2 - itemWidth / 2, windowWidth - itemWidth]
    })
    let scaleInterpolate = offsetX.interpolate({
      inputRange: [-100, 0, 50, 100],
      outputRange: [1, 1, 2, 1]
    })
    let opacityInterpolate = offsetX.interpolate({
      inputRange: [-100, -50, 0, 50, 100],
      outputRange: [1, 0, 1, 1, 1]
    })
    return (
      <Animated.View style={{
        position: 'absolute',
        width: itemWidth,
        height: itemWidth,
        transform: [
          { 
          translateX: translateInterpolate,
          },
          {
            scale: scaleInterpolate
          }
        ],
        opacity: scaleInterpolate,
      }}>
        <TouchableOpacity style={{ 
          width: itemWidth,
          height: itemWidth,
          justifyContent: 'center'
        }}>
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
          <DGText style={{ color: "white", alignSelf: 'center' }}>{name}</DGText>
        </TouchableOpacity>
        
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderPlayItem()}
        {this.renderChallengeItem()}
        {this.renderScoresItem()}
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const itemWidth = windowWidth * 0.25
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})