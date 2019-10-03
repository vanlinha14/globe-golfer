import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import lodash from 'lodash'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import SettingToggle from '../../components/SettingToggle'
import SettingClickable from '../../components/SettingClickable'
import SettingValueClickable from '../../components/SettingValueClickable'
import SettingRange from '../../components/SettingRange'
import LoadingModal from '../../components/LoadingModal'

import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import SettingSlider from '../../components/SettingSlider'
import { ACCESS_TOKEN_STORE_KEY } from '../../utils/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import DialogCombination from '../../components/DialogCombination';
import Api from '../../api';
import { updateProfile } from '../../actions/updateProfile';

class Settings extends PureComponent {
  static navigationOptions = { header: null }

  needUpdate = false

  constructor(props) {
    super(props)

    this.state = {
      settings: props.settings,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.needUpdate) {
      this.setState({
        settings: nextProps.settings,
        loading: false
      })
    }
    
    this.needUpdate = false;
  }

  onRequestLogout = () => {
    this.container.showYesNoDialog(
      Strings.logout.title,
      Strings.logout.message,
      Strings.button.yes,
      Strings.button.no,
      () => {
        AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY).then(() => {
          Api.instance().setAccessToken(null)
          this.props.navigation.dispatch(StackActions.reset({
            index: 0, 
            key: null, 
            actions: [NavigationActions.navigate({ routeName: 'Authentication' })]
          }));
        });
      },
      () => {}
    )
  }

  renderTopBlock() {
    let ggSubscriptionButton = <DGButton 
      style={styles.ggButton}
      text={Strings.settings.getGGSubscription}
      onPress={() => this.props.navigation.navigate("Premium")}
    />
    return [ggSubscriptionButton]
  }

  renderDiscoverBlock() {
    const user = this.props.user
    return (
      <View>
        {this.renderSectionTitle(Strings.settings.defaultSettings)}
        {this.renderValueClickableItem(Strings.settings.location, user.country)}
        {this.renderValueClickableItem(Strings.settings.region, user.region)}
        {this.renderValueClickableItem(Strings.settings.club, user.club)}
        {
          this.renderSliderItem(
            Strings.settings.maxDistance, 
            "%s km", 
            1, 
            100, 
            this.state.settings.distance,
            (newValue) => this.setState({ 
              settings: {
                ...this.state.settings,
                distance: newValue 
              } 
            })
          )
        }
        {
          this.renderRangeItem(
            Strings.settings.ageRange, 
            3, 
            99, 
            [this.state.settings.ageRange.min, this.state.settings.ageRange.max],
            (nmin, mmax) => this.setState({ 
              settings: {
                ...this.state.settings,
                ageRange: { min: nmin, max: mmax }
              }
            }),
            1
          )
        }
        {
          this.renderRangeItem(
            Strings.settings.indexRange, 
            -4.0, 
            54.0, 
            [this.state.settings.indexRange.min, this.state.settings.indexRange.max],
            (nmin, mmax) => this.setState({ 
              settings: {
                ...this.state.settings,
                indexRange: { min: nmin, max: mmax }
              }
            }),
            0.1
          )
        }
      </View>
    )
  }

  renderVisibilityBlock() {
    let showGG = this.renderToggleItem(
      Strings.settings.showMeOnGG.title, 
      Strings.settings.showMeOnGG.message,
      this.state.settings.showGG === 1,
      () => { this.setState({ 
        settings: {
          ...this.state.settings,
          showGG: this.state.settings.showGG === 1 ? 0 : 1 
        }
      }) 
      }
    )

    return showGG
  }

  renderNotificationBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settings.notifications.title)}
        {
          this.renderToggleItem(
            Strings.settings.notifications.messages,
            undefined,
            this.state.settings.message === 1,
            () => { this.setState({ 
              settings: {
                ...this.state.settings,
                message: this.state.settings.message === 1 ? 0 : 1 
              }
            }) 
            }
          )
        }
        {
          this.renderToggleItem(
            Strings.settings.notifications.globeGolfer,
            undefined,
            this.state.settings.globegolfer === 1,
            () => { this.setState({ 
              settings: {
                ...this.state.settings, 
                globegolfer: this.state.settings.globegolfer === 1 ? 0 : 1  
              }
            }) 
            }
          )
        }
      </View>
    )
  }

  renderContactUsBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settings.contactUs)}
        {this.renderClickableItem(Strings.settings.helpAndSupport)}
        {this.renderClickableItem(Strings.settings.rateUs)}
        {this.renderClickableItem(Strings.settings.shareGG)} 
      </View>
    )
  }

  renderLegalBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settings.legal)}
        {
          this.renderClickableItem(
            Strings.settings.privacyPolicy, 
            "flex-start",
            () => alert("Open privary policy")
          )
        }
        {
          this.renderClickableItem(
            Strings.settings.termOfService, 
            "flex-start",
            () => alert("Open term of service")
          )
        }
        {
          this.renderClickableItem(
            Strings.settings.rulesAndEtiquettes, 
            "flex-start",
            () => alert("Open rules and etiquettes")
          )
        } 
        {
          this.renderClickableItem(
            Strings.settings.licenses, 
            "flex-start",
            () => alert("Open licenses")
          )
        }
      </View>
    )
  }

  renderLogoutBlock() {
    return (
      <View>
        {
          this.renderClickableItem(
            Strings.settings.changePassword,
            undefined, 
            () => alert("Open change password")
          )
        } 
        {
          this.renderClickableItem(
            Strings.settings.logout, 
            undefined, 
            this.onRequestLogout
          )
        } 
        {
          this.renderClickableItem(
            Strings.settings.deleteAccount,
            undefined, 
            () => alert("Open delete account")
          )
        } 
      </View>
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

  renderRangeItem(title, min, max, value, onChange, step) {
    let item = <SettingRange
      key={"range-item-" + title}
      style={{ paddingBottom: 0 }}
      title={title}
      min={min}
      max={max}
      value={value}
      step={step}
      onValueChange={onChange}
    />
    return item;
  }

  renderSliderItem(title, valueTemplate, min, max, value, onChange) {
    let item = <SettingSlider
      key={"slider-item-" + title}
      style={{ paddingBottom: 0 }}
      title={title}
      valueTemplate={valueTemplate}
      min={min}
      max={max} 
      value={value}
      onValueChange={onChange}
    />
    return item;
  }

  renderValueClickableItem(title, value) {
    let item = <SettingValueClickable
      key={"value-clickable-item-" + title}
      style={{ paddingBottom: 12, paddingTop: 16 }}
      title={title}
      value={value}
      />
    return item;
  }

  renderClickableItem(title, align, onPress) {
    let item = <SettingClickable 
      key={"clickable-item-" + title} 
      titleAlign={align ? align : 'center'}
      style={{ paddingBottom: 8, paddingTop: 16 }}
      title={title}
      onPress={onPress}
    />
    return item;
  }

  renderToggleItem(title, description, isOn, onChanged) {
    let item = <SettingToggle
      key={"toggle-item-" + title}
      style={{ paddingBottom: 4 }}
      title={title}
      description={description}
      isOn={isOn}
      onChanged={onChanged}
    />
    return item;
  }

  renderSectionTitle(title) {
    let item = <DGText key="section title" style={styles.sectionTitle}>{title.toUpperCase()}</DGText>
    return this.renderItemWithSeparator(item)
  }

  renderItemWithSeparator(item) {
    let separator = this.renderSeparator()
    return [item, separator]
  }

  renderSpacing(height) {
    return <View style={{ height }} />
  }

  renderSeparator() {
    return <View key="separator" style={styles.separator} />
  }

  onApply = () => {
    const objToUpdate = {
      distance: this.state.settings.distance,
      index_min: this.state.settings.indexRange.min,
      index_max: this.state.settings.indexRange.max,
      age_min: this.state.settings.ageRange.min,
      age_max: this.state.settings.ageRange.max,
      show_gg: this.state.settings.showGG,
      message: this.state.settings.message,
      globe_golfer: this.state.settings.globegolfer
    }

    console.warn("ducgaogao: ", objToUpdate);
    
    
    this.setState({loading: true})
    this.needUpdate = true
    this.props.updateProfile(objToUpdate)
  }

  render() {
    let right;
    if (!lodash.isEqual(this.state.settings, this.props.settings)) {
      right = {
        title: "Apply",
        onPress: this.onApply
      }
    }

    console.warn("ducgao: ", right);
    

    return (
      <BaseComponent toolbar={{
        title: Strings.settings.title,
        onBack: this.props.navigation.goBack,
        right
      }}>
        <DialogCombination 
          ref={r => this.container = r}
          contentContainerStyle={{ paddingTop: 24 }}
        >
          {this.renderTopBlock()}
          {this.renderSeparator()}
          {this.renderSpacing(44)}
          {this.renderDiscoverBlock()}
          {this.renderVisibilityBlock()}
          {this.renderSpacing(44)}
          {this.renderNotificationBlock()}
          {this.renderSpacing(44)}
          {this.renderContactUsBlock()}
          {this.renderSpacing(44)}
          {this.renderLegalBlock()}
          {this.renderSpacing(44)}
          {this.renderLogoutBlock()}
          {this.renderSpacing(44)}
        </DialogCombination>
        <LoadingModal  visible={this.state.loading} />
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

const mapStateToProps = (state) => ({
  user: state.profile.user,
  settings: state.profile.settings
})

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (objToUpdate) => dispatch(updateProfile(objToUpdate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)