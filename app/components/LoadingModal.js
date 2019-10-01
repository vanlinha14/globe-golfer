import React from 'react'
import {
  View, ActivityIndicator
} from 'react-native'

import Modal from 'react-native-modal'

const LoadingModal = React.memo(({visible}) => {
  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator />
      </View>
    </Modal>
  )
})

export default LoadingModal;