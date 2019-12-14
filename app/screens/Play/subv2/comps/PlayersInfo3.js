import React from 'react'
import {View, Image} from 'react-native'
import DGText from '../../../../components/DGText'
import Theme from '../../../../res/Theme'

const Player = React.memo(({avatar, name}) => {
  if (!avatar && !name) {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
        marginHorizontal: 8,
      }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <DGText style={{
            color: Theme.buttonPrimary,
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
          }}>{"New PLAYERS"}</DGText>
        </View>
        <DGText style={{
          color: Theme.buttonPrimary,
          marginTop: 16
        }}>{"Select player"}</DGText>
      </View>
    )
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 24,
      marginHorizontal: 8,
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

export default React.memo(({playerA, playerB, playerC}) => {
  return (
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Player avatar={playerA.avatar} name={playerA.name} />
      <Player avatar={playerB.avatar} name={playerB.name} />
      {playerC ? <Player avatar={playerC.avatar} name={playerB.name} /> : <Player />}
    </View>
  )
})