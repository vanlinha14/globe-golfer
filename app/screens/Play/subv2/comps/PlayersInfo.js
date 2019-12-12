import React from 'react'
import {View, Image} from 'react-native'
import DGText from '../../../../components/DGText'
import Theme from '../../../../res/Theme'

const Player = React.memo(({avatar, name}) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 24
    }}>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: 'white',
        }}
        source={{uri: avatar}}
      />
      <DGText style={{
        color: Theme.buttonPrimary,
        marginTop: 16
      }}>{name}</DGText>
    </View>
  )
})

export default React.memo(({playerA, playerB}) => {
  return (
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Player avatar={playerA.avatar} name={playerA.name} />
      <DGText style={{
        color: Theme.buttonPrimary,
        marginHorizontal: 16,
        marginBottom: 32,
        fontSize: 30,
        fontWeight: 'bold',
      }}>VS</DGText>
      <Player avatar={playerB.avatar} name={playerB.name} />
    </View>
  )
})