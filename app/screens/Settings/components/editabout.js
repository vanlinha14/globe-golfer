import React from 'react'
import {
  View,
  TextInput
} from 'react-native'

import Modal from 'react-native-modal'
import DGText from '../../../components/DGText'
import TextInputBlockV2 from '../../../components/TextInputBlockV2'
import DGButtonV2 from '../../../components/DGButtonV2'
import Theme from '../../../res/Theme'
import Strings from '../../../res/Strings'

export default React.memo(({visible, initValue, onRequestOK}) => {

  const [state, setState] = React.useState(initValue)

  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View style={{
        borderRadius: 8,
        backgroundColor: 'white',
        width: '90%',
        paddingVertical: 12
      }}>
        <DGText style={{
          fontSize: 20,
          marginHorizontal: 16,
          fontWeight: 'bold',
        }}>About</DGText>
        <TextInput
          style={{
            marginTop: 4,
            marginHorizontal: 16,
            minHeight: 100,
          }}
          value={state}
          onChangeText={text => setState(text)}
          multiline={true}
          placeholder={"Enter your self introduction"} 
        />
        <DGButtonV2
          style={{ 
            width: '90%',
            marginTop: 4,
            backgroundColor: Theme.buttonPrimary 
          }}
          text={"OK"}
          onPress={() => onRequestOK(state)}
          />
      </View>
      
    </Modal>
  )
})