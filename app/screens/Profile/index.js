import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Image, FlatList } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButtonV2 from '../../components/DGButtonV2'
import SettingToggle from '../../components/SettingToggle'
import SettingClickable from '../../components/SettingClickable'
import SettingValueClickable from '../../components/SettingValueClickable'
import SettingRange from '../../components/SettingRange'

import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import SettingSlider from '../../components/SettingSlider'

const fakeInterests = [
  "Guitar",
  "Music",
  "Fishing",
  "Book",
  "Dance"
]

export default class Profile extends PureComponent {
  static navigationOptions = { header: null }

  renderTopBlock() {
    let ggSubscriptionButton = <DGButton 
      style={styles.ggButton}
      text={Strings.settings.getGGSubscription}
      onPress={this.onRequestScanCard}
    />
    return [ggSubscriptionButton]
  }

  renderAvatar() {
    const avatarSize = 280
    return <Image 
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        alignSelf: 'center',
        backgroundColor: 'white'
      }}
      source={{ uri: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg" }}
    />
  }

  renderPersonalInfoBlock() {
    return (
      <View>
        {this.renderValueClickableItem("Full Name", "Aaron Smith")}
        {this.renderValueClickableItem("My Country", "France")}
        {this.renderValueClickableItem("My Region", "lle de france")}
        {this.renderValueClickableItem("My Club", "La Boulie")}
        {this.renderValueClickableItem("Index", "11.1")}
        {this.renderSpacing(24)}
        {this.renderSectionTitle("About Me")}
        {this.renderSpacing(8)}
        <DGText style={{
          width: '80%',
          color: Theme.textWhite,
          marginHorizontal: 16,
        }}>{"I really love to play golf with friends and another one. So if you want to become my friend or you want to win me. Come and get it."}</DGText>
        {this.renderSpacing(24)}
        {this.renderSectionTitle("My Interests")}
        {this.renderSpacing(8)}
        {this.renderInterests()}
      </View>
    )
  }

  renderInterests() {
    const itemWidth = (Dimensions.get('window').width - 60) / 3
    return (
      <FlatList
        style={{ marginLeft: 12 }}
        data={fakeInterests}
        numColumns={3}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => (
          <View style={{
            marginHorizontal: 4,
            marginBottom: 8,
            borderWidth: 1,
            height: 40,
            width: itemWidth,
            justifyContent: 'center',
            borderColor: 'gray'
          }}>
            <DGText style={{
              alignSelf: 'center',
              color: 'white'
            }}>{item}</DGText>
          </View> 
        )}
      />
    )
  }

  renderCTABlock() {
    return (
      <DGButtonV2 
        style={{ backgroundColor: Theme.buttonPrimary, width: '50%' }}
        text="Edit Settings"
        onPress={this.requestGoToEditProfile}
        />
    )
  }

  renderDeleteAccountBlock() {
    return (
      <View>
        {this.renderSeparator()}
        {this.renderClickableItem(Strings.settings.deleteAccount)} 
      </View>
    )
  }

  renderRangeItem(title, min, max, value) {
    let item = <SettingRange
      key="range item"
      style={{ paddingBottom: 0 }}
      title={title}
      min={min}
      max={max}
      value={value}
    />
    return item;
  }

  renderSliderItem(title, valueTemplate, min, max, value) {
    let item = <SettingSlider
      key="slider item"
      style={{ paddingBottom: 0 }}
      title={title}
      valueTemplate={valueTemplate}
      min={min}
      max={max} 
      value={value}
    />
    return item;
  }

  renderValueClickableItem(title, value) {
    let item = <SettingValueClickable
      key="value clickable item" 
      style={{ paddingBottom: 12, paddingTop: 16 }}
      title={title}
      value={value}
      />
    return item;
  }

  renderClickableItem(title, align) {
    let item = <SettingClickable 
      key="clickable item" 
      titleAlign={align ? align : 'center'}
      style={{ paddingBottom: 8, paddingTop: 16 }}
      title={title} />
    return item;
  }

  renderToggleItem(title, description) {
    let item = <SettingToggle
      key="toggle item"
      style={{ paddingBottom: 4 }}
      title={title}
      description={description}
    />
    return item;
  }

  renderSectionTitle(title) {
    return <DGText key="section title" style={styles.sectionTitle}>{title}</DGText>
  }

  renderSpacing(height) {
    return <View style={{ height }} />
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: "Profile",
        onBack: () => this.props.navigation.goBack()
      }}>
        <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 24 }}>
          {this.renderAvatar()}
          {this.renderPersonalInfoBlock()}
          {this.renderSpacing(40)}
          {this.renderCTABlock()}
          {this.renderSpacing(40)}
        </KeyboardAwareScrollView>
      </BaseComponent>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center'
  },
  ggButton: {
    backgroundColor: Theme.buttonPrimary,
    width: windowWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  separator: {
    marginTop: 12,
    width: '100%',
    height: 1,    
    backgroundColor: Theme.separator
  },
  title: {
    color: Theme.textWhite,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 20,
    marginTop: 24,
    marginLeft: 16, 
    marginRight: 16,
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  },
  sectionTitle: {
    color: Theme.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16, 
    marginRight: 16,
  }
})