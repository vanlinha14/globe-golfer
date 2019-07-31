import React, { PureComponent } from 'react'
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView
} from 'react-native'

import Modal from 'react-native-modal'
import DGText from './DGText'

export default class DialogCombination extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    visibleModal: undefined,
    dialogTitle: undefined,
    dialogMessage: undefined,
    dialogActionTitle: undefined,
    dialogAction: undefined
  }

  showDialog(title, message, dialogActionTitle, action) {
    this.setState({
      visibleModal: "dialog",
      dialogTitle: title,
      dialogMessage: message,
      dialogActionTitle: dialogActionTitle,
      dialogAction: action
    })
  }

  doBindAction = () => {
    this.setState({
      visibleModal: undefined,
      dialogTitle: undefined,
      dialogMessage: undefined,
      dialogActionTitle: undefined,
      dialogAction: undefined
    }, this.state.dialogAction)
  }

  renderModals() {
    const regularEmailModal = (
      <Modal 
        isVisible={this.state.visibleModal === "dialog"}
        useNativeDriver={true}
        onBackdropPress={() => this.setState({visibleModal: undefined})}
        onBackButtonPress={() => this.setState({visibleModal: undefined})}
        >
          <View style={{
            backgroundColor: 'white',
            borderRadius: 4,
            paddingHorizontal: 16,
            paddingVertical: 12
          }}>
          <DGText style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}>{this.state.dialogTitle}</DGText>
          <DGText>{this.state.dialogMessage}</DGText>
          <TouchableOpacity 
            style={[
              { height: 44, justifyContent: 'center', alignItems: 'center' },
              { marginTop: 20 },
              { backgroundColor: Theme.buttonPrimary },
              { borderWidth: 0 }
            ]} activeOpacity={0.7} onPress={this.doBindAction}>
            <DGText style={[styles.socialText, {color: 'white', fontWeight: 'bold'}]}>{this.state.dialogActionTitle}</DGText>
          </TouchableOpacity>
        </View>
      </Modal>
    )

    return regularEmailModal
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.body, { backgroundColor: Theme.mainBackground }]}>
        {this.props.children}
        {this.renderModals()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center'
  }
})