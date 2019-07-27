import React, { PureComponent } from 'react'
import { StyleSheet, View, Switch, Image, Dimensions } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-deck-swiper'
import DGText from '../../components/DGText'
import { useNavigation } from 'react-navigation-hooks';

const windowWidth = Dimensions.get('window').width

const dummydata = [
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg",
    rating: 3,
    name: "Adrien",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
    rating: 3,
    name: "Zoé",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
    rating: 3,
    name: "Anoushka",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
]

const FlexSpacing = React.memo(() => <View style={{ flex: 1 }} />)

const HeaderIcon = React.memo(({name, action}) => (
  <Icon 
    size={32}
    color={'white'}
    name={name}
    onPress={action}
  />
))

const Toggler = React.memo(({isOn, onChanged}) => (
  <Switch 
    tintColor='gray' 
    thumbColor={'white'} 
    onTintColor={Theme.buttonPrimary} 
    value={isOn}
    onValueChange={onChanged}
    />
))

const Header = React.memo(({isOn, onViewModeChanged}) => {

  const { goBack, navigate } = useNavigation()

  const onGoBack = () => {
    goBack()
  }

  const onGoToSetting = () => {
    navigate('Settings')
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12
    }}>
      <HeaderIcon name={"ios-home"} action={onGoBack}/>
      <FlexSpacing />
      <Toggler isOn={isOn} onChanged={onViewModeChanged} />
      <FlexSpacing />
      <HeaderIcon name={"ios-settings"} action={onGoToSetting}/>
    </View>
  )
})

const CardMetaItem = React.memo(({data}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <DGText style={{ color: Theme.buttonPrimary, fontSize: 18 }}>{data.value}</DGText>
      <DGText style={{ color: Theme.buttonPrimary, fontSize: 11 }}>{data.key}</DGText>
    </View>
  )
})

const CardMetaData = React.memo(({data}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {
        data.map(element => {
          return <CardMetaItem data={element} />
        })
      }
    </View>
  )
})

const Start = React.memo(({isActive}) => {
  return (
    <Icon 
      style={{ marginHorizontal: 2 }}
      name={"ios-star"} 
      color={isActive ? Theme.buttonPrimary : 'white'} 
      size={20}
    />
  )
})

const CardRatingBar = React.memo(({star}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Start isActive={1 <= star} />
      <Start isActive={2 <= star} />
      <Start isActive={3 <= star} />
      <Start isActive={4 <= star} />
      <Start isActive={5 <= star} />
    </View>
  )
})

const CardBasicInfo = React.memo(({ avatar, name, location, rating }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Image 
        style={{ 
          width: windowWidth - 80, 
          height: windowWidth - 80,
          borderRadius: (windowWidth - 80) / 2
        }}
        source={{ uri: avatar }}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <View style={{ position: 'absolute', bottom: 16 }}>
        <DGText style={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 30
        }}>{name}</DGText>
        <DGText style={{ 
          textAlign: 'center', 
          color: 'white',
          fontSize: 20
        }}>{location}</DGText>
        <CardRatingBar star={rating} />
      </View>
    </View>
  )
})

const CardAbout = React.memo(({about}) => {
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 16, marginTop: 20 }}>
      <DGText style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>About</DGText>
      <DGText style={{ textAlign: 'center', color: 'white' }}>{about}</DGText>
    </View>
  )
})

const Card = React.memo(({card}) => (
  <View style={{
    flex: 1,
    marginTop: -48,
    marginBottom: 92,
    backgroundColor: Theme.mainBackground
  }}>
      <CardMetaData data={card.metaData} />
      <CardBasicInfo avatar={card.avatar} name={card.name} location={card.location} rating={card.rating}/>
      <CardAbout about={card.about} />
  </View>
))

const TinderMode = React.memo(({data}) => (
  <Swiper
    cards={data}
    renderCard={(card) => <Card card={card} />}
    disableTopSwipe={true}
    disableBottomSwipe={true}
    verticalSwipe={false}
    onSwiped={(cardIndex) => {console.log(cardIndex)}}
    onSwipedAll={() => {console.log('onSwipedAll')}}
    cardIndex={0}
    backgroundColor={Theme.mainBackground}
    stackSize= {3}>
  </Swiper>
))

export default class Challenge extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isGridMode: false,
  }

  onViewModeChanged = () => {
    this.setState({
      isGridMode: !this.state.isGridMode
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isOn={this.state.isGridMode} onViewModeChanged={this.onViewModeChanged} />
        <View style={{ flex: 1 }}>
          {this.state.isGridMode ? undefined : <TinderMode data={dummydata}/>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.mainBackground
  }
})