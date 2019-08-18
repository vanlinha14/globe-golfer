import React, { PureComponent } from 'react'
import { View, FlatList, Dimensions, Platform } from 'react-native'
import Permissions from 'react-native-permissions'
import Contacts from 'react-native-contacts'

import SharingHelper from '../../utils/SharingHelper'

import Theme from '../../res/Theme'

import Toggler from '../../components/Toggler'
import DGButtonV2 from '../../components/DGButtonV2'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import DGText from '../../components/DGText';
import { showErrorAlertWithCallbackAction } from '../../utils';
import FlexSpacing from './components/FlexSpacing';

const ContactItem = React.memo(({index, name, selected, onChanged}) => {

  const onItemChanged = () => {
    onChanged(index)
  }

  return (
    <View style={{
      width: Dimensions.get('window').width - 32,
      height: 48,
      marginBottom: 12,
      alignItems: 'center',
      flexDirection: 'row'
    }}>
      <DGText style={{ color: 'white' }}>{name}</DGText>
      <FlexSpacing />
      <Toggler isOn={selected} onChanged={onItemChanged} />
    </View>
  )
})

const ContactList = React.memo(({data, onDataChanged}) => {
  const keyExtractor = (_, index) => "contact item " + index

  const onListPropsChanged = (index) => {
    onDataChanged(index)
  }

  const renderItem = ({item, index}) => (
    <ContactItem
      index={index}
      name={item.displayName}
      selected={item.selected}
      onChanged={onListPropsChanged}
    />
  );

  return (
    <FlatList 
      style={{ 
        alignSelf: 'center'
      }}
      contentContainerStyle={{
        paddingVertical: 24
      }}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
    />
  )
})

export default class Invite extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    contacts: []
  }

  componentDidMount() {
    Permissions.check('contacts').then(response1 => {
      if (response1 == 'authorized') {
        this.getContactList()
      } else if (response1 == 'denied') {
        this.showErrorMessage()
      } else {
        Permissions.request('contacts').then(response2 => {
          if (response2 == 'authorized') {
            this.getContactList()
          } else {
            this.showErrorMessage()
          }
        })
      }
    })
  }

  showErrorMessage() {
    showErrorAlertWithCallbackAction(
      "Without your contacts permission. We can not continue to process. Please go to setting page and allow us to read you contacts.",
      this.props.navigation.goBack
    )
  }

  getContactList() {
    const isiOS = Platform.OS === 'ios'
    Contacts.getAll((err, contacts) => {
      console.warn(contacts);
      
      this.setState({
        contacts: contacts.map(i => { 
          return { 
            displayName: isiOS ? i.givenName : i.displayName,
            phone: i.phoneNumbers,
            selected: false
          }
        })
      })
    })
  }

  onDataChanged = (index) => {
    this.state.contacts[index].selected = !this.state.contacts[index].selected
    
    const contacts = this.state.contacts.slice()
    this.setState({ contacts })
  }

  onRequestSend = () => {
    const target = this.state.contacts.filter(i => 
      i.selected && 
      i.phone[0] &&
      i.phone[0].number
    )
    const phoneList = target.map(i => { return i.phone[0].number }).join(";")
    SharingHelper.shareTo(phoneList, "Download GG application to join us and play Golf by the awesome way. https://google.com")
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <ContactList 
          data={this.state.contacts} 
          onDataChanged={this.onDataChanged}
        /> 
        <DGButtonV2 
          style={{ 
            width: '40%', 
            marginBottom: 24,
            backgroundColor: Theme.buttonPrimary
          }}
          text="Send"
          onPress={this.onRequestSend}
        />
      </BaseComponent>
    )
  }
}