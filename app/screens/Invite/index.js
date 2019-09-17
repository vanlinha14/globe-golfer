import React, { PureComponent } from 'react'
import { View, SectionList, Dimensions, Platform } from 'react-native'
import Permissions from 'react-native-permissions'
import Contacts from 'react-native-contacts'
import lodash from 'lodash'

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

  const renderItem = ({item, index, section}) => (
    <ContactItem
      index={index}
      name={item.displayName}
      selected={item.selected}
      onChanged={() => onDataChanged(section, index)}
    />
  );

  const renderHeader = ({section: {title}}) => {
    return <View style={{backgroundColor: Theme.mainBackground}}>
      <DGText style={{color: Theme.buttonPrimary, fontWeight: 'bold', fontSize: 30}}>{title}</DGText>
    </View>
  }

  return (
    <SectionList
      style={{ 
        alignSelf: 'center'
      }}
      contentContainerStyle={{
        paddingVertical: 24
      }}
      keyExtractor={keyExtractor}
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      stickySectionHeadersEnabled={true}
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
    Contacts.getAll((_, contacts) => {
      const mapped = contacts
        .filter(i => i.phoneNumbers.length > 0)
        .map(i => {
          const displayName = isiOS ? (i.givenName + " " + i.familyName) : i.displayName
          
          return { 
            firstLetter: displayName.charAt(0),
            displayName,
            phone: i.phoneNumbers,
            selected: false
          }
        })
      const sorted = lodash.sortBy(mapped, o => o.displayName)
      const dics = lodash.groupBy(sorted, "firstLetter")

      const result = Object.keys(dics).map(k => {
        return {
          title: k,
          data: dics[k]
        }
      })
      
      this.setState({
        contacts: result
      })
    })
  }

  onDataChanged = (section, index) => {
    const contacts = this.state.contacts.map(i => {
      let newi = i
      if (newi.title === section.title) {
        newi.data = i.data.map((ii, id) => {
          if (id === index) {
            return {
              ...ii,
              selected: !ii.selected
            }
          }

          return ii;
        })
      }

      return newi
    });

    this.setState({ contacts })
  }

  onRequestSend = () => {
    const isiOS = Platform.OS === 'ios'
    if (isiOS) {
      alert("Features is under development!")
      return
    }

    const target = lodash(this.state.contacts).flatMap(i => i.data).filter(ii => 
      ii.selected && 
      ii.phone[0] &&
      ii.phone[0].number
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