import React, { PureComponent } from 'react'
import { Dimensions, View } from 'react-native'

import BaseComponent from '../../components/BaseComponent'
import LoadableImage from '../../components/LoadableImage'
import DGText from '../../components/DGText'

const IMAGE_WIDTH = Dimensions.get('window').width - 44
export default class LotteryList extends PureComponent {
  static navigationOptions = { header: null }

  render() {
    const data = this.props.navigation.getParam("data")
    return (
      <BaseComponent toolbar={{
        title: data.name,
        onBack: this.props.navigation.goBack,
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <LoadableImage 
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH,
              borderRadius: IMAGE_WIDTH / 2,
            }}
            source={{uri: data.image}}
          />
          <DGText style={{color: 'white', marginTop: 24, fontWeight: 'bold'}}>
            About
          </DGText>
          <DGText style={{color: 'white', marginTop: 12}}>
            {data.about}
          </DGText>
        </View>
        
      </BaseComponent>
    )
  }
}