import React from 'react'
import {
  Animated
} from 'react-native'

import Modal from 'react-native-modal'

const animatedValue = new Animated.Value(0)

const LoadingModal = React.memo(({visible}) => {

  React.useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 3000
      }),
    ])).start()
  }, [])

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  })

  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Animated.Image 
        style={{
          width: 150,
          height: 150,
          transform: [{rotate: spin}]
        }}
        resizeMethod='resize'
        resizeMode='cover'
        source={require('../res/images/loading_ball.png')}
      />
    </Modal>
  )
})

export default LoadingModal;