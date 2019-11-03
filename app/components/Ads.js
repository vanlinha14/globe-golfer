import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet
} from 'react-native'
import DGText from './DGText';
import LoadableImage from './LoadableImage';
import { VIEW_ADS } from '../api/Endpoints';
import AdsRepository from '../repository/AdsRepository';

class Lottery extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      endTime: props.endTime
    }
  }
  

  componentDidMount() {
    setInterval(() => {
      this.setState({
        endTime: this.state.endTime - 1
      })
    }, 1000)
  }

  secondToCountDown(t) {
    const s = this.makeUpTimeValue(Math.floor(t % 60));
    const m = this.makeUpTimeValue(Math.floor((t/60) % 60));
    const h = this.makeUpTimeValue(Math.floor((t/(60*60)) % 24));

    return `${h}:${m}:${s}`
  } 

  makeUpTimeValue(v) {
    if (v < 10) {
      return `0${v}`
    }

    return v
  }

  render() {
    return (
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Theme.buttonPrimary,
        borderWidth: 4,
        alignItems: 'center'
      }}>
        <DGText style={{
          color: Theme.buttonPrimary,
          fontSize: 24,
          marginTop: 16,
        }}>Lottle</DGText>
        <DGText style={{
          color: 'white',
          fontSize: 16,
          marginTop: 4
        }}>{this.secondToCountDown(this.state.endTime)}</DGText>
      </View>
    )
  }
}

export default React.memo(({withLottery}) => {

  const [ads, setAds] = React.useState(null)

  const renderContent = () => {

    let lottery = undefined
    let adsView = undefined

    if (withLottery) {
      lottery = <Lottery endTime={30600} />
    }

    if (ads) {
      adsView = (
        <>
        {withLottery ? <View style={{width: 24}} /> : undefined}
        <TouchableWithoutFeedback style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }} onPress={() => {ads && Linking.openURL(ads.link)}} >
          <LoadableImage
            style={{
              width: 100,
              height: 100,
              borderRadius: 50
            }}
            resizeMethod='resize'
            resizeMode='cover'
            source={{uri: VIEW_ADS.replace("{image}", ads.image)}}
          />
        </TouchableWithoutFeedback>
        </>
      )
    }

    return (
      <View style={{flexDirection: 'row'}}>
        {lottery}
        {adsView}
      </View>
    )
  }

  React.useEffect(() => {
    const onAdsChanged = (ads) => {
      setAds(ads)
    }

    AdsRepository.instance().subscribe(onAdsChanged)

    return () => {
      AdsRepository.instance().unSubscribe(onAdsChanged)
    }
  }, [])

  return (
    <View style={styles.ads}>
        {renderContent()}    
    </View>
  )
})

const styles = StyleSheet.create({
  ads: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})