import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import ImagePicker from 'react-native-image-picker'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class SetupAccountStepInputScannedCard extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    cardSource: undefined
  }

  requestGoToInputLocation = () => {
    this.props.navigation.navigate("SetupAccountStepInputLocation")
  }

  requestSelectImage = () => {
    const options = {
      title: Strings.selectCardImage,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          cardSource: source
        })
      }
    })
  }

  renderLogo() {
    return (
      <Image
        style={{
          marginTop: 60,
          width: 120,
          height: 120,
          alignSelf: 'center'
        }}
        source={require('../../res/images/ic_icon.png')}
      />
    )
  }

  renderTitle() {
    return <DGText style={styles.messgage}>{Strings.scannedCard.title}</DGText>
  }

  renderImageInputHint() {
    if (this.state.cardSource == undefined) {
      return <DGText style={styles.centerText}>{Strings.input.tapToSelect}</DGText> 
    }
  }

  renderImageInput() {
    let source = this.state.cardSource ? this.state.cardSource : require('../../res/images/placeholder.png')
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.requestSelectImage}>
        <Image style={styles.centerImage} resizeMethod='resize' source={source}/>
        {this.renderImageInputHint()}
      </TouchableOpacity>
    )
  }

  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderTitle()}
        {this.renderImageInput()}
      </View>   
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary }}
          text={Strings.button.continue}
          onPress={this.requestGoToInputLocation}
          />
      </View>
    )
  }

  render() {
    return (
      <BaseComponent>
        <KeyboardAwareScrollView contentContainerStyle={styles.body}>
          <View style={styles.body}>
            {this.renderLogo()}
            {this.renderBody()}
            {this.renderFooter()}
          </View>
          
        </KeyboardAwareScrollView>
      </BaseComponent>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  body: {
    flex: 1, 
    height: windowHeight,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: Theme.buttonSecondary,
    width: '80%',
    color: Theme.textWhite,
    textAlign: 'center',
    marginTop: 16
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 20,
    marginTop: 24,
    textAlign: 'center'
  },
  centerImage: {
    width: '80%',
    height: 200,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignSelf: 'center'
  },
  centerText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 160
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  }
})