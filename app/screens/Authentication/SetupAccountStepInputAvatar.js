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

export default class SetupAccountStepInputAvatar extends PureComponent {
  static navigationOptions = { header: null }

  requestGoToStepFinal = () => {
    this.props.navigation.navigate("SetupAccountStepFinal")
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
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        })
      }
    })
  }

  renderLogo() {

  }

  renderTitle() {
    return <DGText style={styles.messgage}>{Strings.myBestPictureIs}</DGText>
  }

  renderImageInput() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.requestSelectImage}>
        <Image style={styles.centerImage} source={require('../../res/images/placeholder.png')}/>
        <DGText style={styles.centerText}>{Strings.tapToSelect}</DGText>
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
          text={Strings.continue}
          onPress={this.requestGoToStepFinal}
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
    width: '60%',
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
    width: 200,
    height: 200,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 32,
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