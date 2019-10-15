import React, { PureComponent } from 'react'
import { View, AsyncStorage, StyleSheet, Dimensions } from 'react-native'

import { emailValidationFunction, passwordValidationFunction, showErrorAlert } from '../../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { loginWithEmail } from '../../actions/login'
import { INPUT_TYPE } from '../../components/DGInput'
import { connect } from 'react-redux'

import BaseComponent from '../../components/BaseComponent'
import TextInputBlockV2 from '../../components/TextInputBlockV2'
import DGButtonV2 from '../../components/DGButtonV2'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import DGText from '../../components/DGText';
import { StackActions, NavigationActions } from 'react-navigation';
import Api from '../../api'
import { USER_EMAIL_STORE_KEY } from '../../utils/constants'

const Title = React.memo(() => {
  return (
    <DGText style={{
      width: '60%',
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      marginHorizontal: 16,
      marginVertical: 12
    }}>Modify your password</DGText>
  )
})

class ChangePassword extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    loading: false
  }

  oldPasswordTextInput = undefined
  passwordTextInput = undefined
  repasswordTextInput = undefined

  onRequestChangePassword = () => {
    let oldPassword = this.oldPasswordTextInput.getText()
    let password = this.passwordTextInput.getText()
    let repassword = this.repasswordTextInput.getText()

    if (oldPassword == null) {
      showErrorAlert("You old password is not valid")
      return
    }

    if (password == null) {
      showErrorAlert("You password you just filled is not valid")
      return
    }

    if (password != repassword)  {
      showErrorAlert("Your verify password is not match")
      return
    }
    
    this.setState({loading: true})
    AsyncStorage.getItem(USER_EMAIL_STORE_KEY).then(email => {
      Api.instance().changePassword(email, oldPassword, password).then(res => {
        this.setState({loading: false}, () => {
          this.props.navigation.goBack()
          alert("Your password has been updated")
        })
      })
      .catch(err => {
        this.setState({loading: false})
      })
    })
  }

  renderBody() {
    let oldPassword = <TextInputBlockV2
      ref={ref => this.oldPasswordTextInput = ref}
      title={"Old password"}
      placeholder={"Enter your old password"} 
      validateFunction={passwordValidationFunction}
      inputType={INPUT_TYPE.PASSWORD}
      inputAlign="left"
    />
    let password = <TextInputBlockV2
      ref={ref => this.passwordTextInput = ref}
      title={"New password"}
      placeholder={"Enter your new password"} 
      validateFunction={passwordValidationFunction}
      inputType={INPUT_TYPE.PASSWORD}
      inputAlign="left"
    />
    let repassword = <TextInputBlockV2 
      ref={ref => this.repasswordTextInput = ref}
      title={"Verify password"}
      placeholder={"Re-enter you new password"}
      validateFunction={passwordValidationFunction}
      inputType={INPUT_TYPE.PASSWORD}
      inputAlign="left"
    />
    return (
      <View style={{
        paddingHorizontal: 16
      }}>
        {oldPassword}
        {password}
        {repassword}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButtonV2
          style={{ 
            width: Dimensions.get('window').width - 32,
            backgroundColor: Theme.buttonPrimary 
          }}
          loading={this.state.loading}
          text={"Submit"}
          onPress={this.onRequestChangePassword}
          />
      </View>
    )
  }

  render() {
    let isDisableViewInteract = this.state.loading == true ? 'none' : 'auto' 
    return (
      <BaseComponent toolbar={{
        title: Strings.toolbar.back,
        onBack: () => this.props.navigation.goBack()
      }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.body} pointerEvents={isDisableViewInteract}>
          <View style={styles.body}>
            <Title />
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
    height: windowHeight
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
  footerContainer: {
    paddingTop: 40,
    paddingBottom: getBottomSpace() + 32
  }
})


const mapStateToProps = (state) => ({
  user: state.profile.user,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)