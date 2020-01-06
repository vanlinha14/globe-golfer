import React from 'react'
import {TouchableOpacity, View, Image} from 'react-native'
import DGText from '../../../../components/DGText'
import Theme from '../../../../res/Theme'


const NewPlayer = React.memo(({onRequestSelect}) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 40,
    }}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={onRequestSelect}
        disabled={onRequestSelect === undefined}
      >
        <DGText style={{
          color: Theme.buttonPrimary,
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'center'
        }}>{"New PLAYERS"}</DGText>
      </TouchableOpacity>
      <DGText style={{
        color: Theme.buttonPrimary,
        marginTop: 16
      }}>{"Select player"}</DGText>
    </View>
  )
})

const PlayerWithoutAvatar = React.memo(({name, onRequestSelect}) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 40,
    }}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={onRequestSelect}
        disabled={onRequestSelect === undefined}
      >
        <DGText style={{
          color: Theme.buttonPrimary,
          fontWeight: 'bold',
          fontSize: 40,
          textAlign: 'center'
        }}>{name[0]}</DGText>
      </TouchableOpacity>
      <DGText style={{
        color: Theme.buttonPrimary,
        marginTop: 16
      }}>{name}</DGText>
    </View>
  )
})

const Player = React.memo(({avatar, name, onRequestSelect}) => {
  if (!avatar && !name) {
    return <NewPlayer onRequestSelect={onRequestSelect} />
  }

  if (!avatar) {
    return <PlayerWithoutAvatar name={name} onRequestSelect={onRequestSelect} />
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 40,
    }}>
      <TouchableOpacity
        onPress={onRequestSelect}
        disabled={onRequestSelect === undefined}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'white',
          }}
          source={{uri: avatar}}
          onPress={onRequestSelect}
          disabled={onRequestSelect === undefined}
        />
      </TouchableOpacity>
      <DGText style={{
        color: Theme.buttonPrimary,
        marginTop: 16
      }}>{name}</DGText>
    </View>
  )
})

export default React.memo(({playerA, playerB, playerC, playerD, onRequestChangeC, onRequestChangeD}) => {

  let playerCUI = null
  let playerDUI = null

  if (!playerC) {
    playerCUI = <Player onRequestSelect={onRequestChangeC} />
  }
  else {
    playerCUI = <Player avatar={playerC.avatar} name={playerC.name} onRequestSelect={onRequestChangeC} />
  }
  
  if (!playerD) {
    playerDUI = <Player onRequestSelect={onRequestChangeD} />
  }
  else {
    playerDUI = <Player avatar={playerD.avatar} name={playerD.name} onRequestSelect={onRequestChangeD} />
  }

  return (
    <View style={{
      marginTop: 12,
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <Player avatar={playerA.avatar} name={playerA.name} />
        {playerCUI}
      </View>
      <DGText style={{
        color: Theme.buttonPrimary,
        fontSize: 30,
        fontWeight: 'bold',
      }}>VS</DGText>
      <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <Player avatar={playerB.avatar} name={playerB.name} />
        {playerDUI}
      </View>
    </View>
  )
})