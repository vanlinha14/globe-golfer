import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import lodash from 'lodash'

import BaseComponent from '../../components/BaseComponent'
import DGButton from '../../components/DGButton'
import LoadingModal from '../../components/LoadingModal'

import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import { ACCESS_TOKEN_STORE_KEY, USER_EMAIL_STORE_KEY } from '../../utils/constants';
import { StackActions, NavigationActions } from 'react-navigation';
import DialogCombination from '../../components/DialogCombination';
import Api from '../../api';
import { updateProfile } from '../../actions/updateProfile';
import { GoogleSignin } from 'react-native-google-signin'
import { renderToggleItem, renderSectionTitle, renderClickableItem, renderSeparator, renderSpacing, renderValueClickableItem, renderSliderItem, renderRangeItem } from './components/base'
import LoadableImage from '../../components/LoadableImage'
import DGText from '../../components/DGText'
import ImagePicker from 'react-native-image-picker'
import { getProfile } from '../../actions/getProfile'
import { getInterests } from '../../actions/getInterest'
import EditAbout from './components/editabout'

const InterestItem = React.memo(({name, style, onPress}) => {

  const itemWidth = (Dimensions.get('window').width - 60) / 3
  return (
    <TouchableOpacity style={[
      {
        marginHorizontal: 4,
        marginBottom: 8,
        borderWidth: 1,
        height: 40,
        width: itemWidth,
        justifyContent: 'center',
        borderColor: 'gray'
      },
      style
    ]} disabled={!onPress} onPress={onPress} activeOpacity={0.7}>
      <DGText style={{
        alignSelf: 'center',
        color: 'white'
      }}>{name}</DGText>
    </TouchableOpacity> 
  )
})

class Settings extends PureComponent {
  static navigationOptions = { header: null }

  needUpdate = false

  constructor(props) {
    super(props)

    this.state = {
      settings: props.settings,
      showChangePassword: false,
      loading: false,
      avatarSource: null,
      needOpenEditAbout: false,
      about: null
    }
  }

  componentDidMount() {
    AsyncStorage.getItem(USER_EMAIL_STORE_KEY).then(email => {
      if (email) {
        this.setState({showChangePassword: true})
      }
    })
  } 

  componentWillReceiveProps(nextProps) {
    if (this.needUpdate) {
      this.props.getProfile()
      this.props.getInterests()

      this.setState({
        settings: nextProps.settings,
        loading: false,
        avatarSource: null,
        about: null
      })
    }
    
    this.needUpdate = false;
  }

  onRequestChangePassword = () => {
    this.props.navigation.navigate("ChangePassword")
  }

  onRequestLogout = () => {
    this.container.showYesNoDialog(
      Strings.logout.title,
      Strings.logout.message,
      Strings.button.yes,
      Strings.button.no,
      async () => {
        AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY).then(() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
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

  onRequestDeleteAccount = () => {
    this.container.showYesNoDialog(
      Strings.deleteAccount.title,
      Strings.deleteAccount.message,
      Strings.button.yes,
      Strings.button.no,
      () => {
        this.setState({loading: true})
        Api.instance().deleteAccount().then(() => {
          this.setState({loading: false})
          AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY).then(() => {
            Api.instance().setAccessToken(null)
            this.props.navigation.dispatch(StackActions.reset({
              index: 0, 
              key: null, 
              actions: [NavigationActions.navigate({ routeName: 'Authentication' })]
            }));
          });
        })
      },
      () => {}
    )
  }

  requestEditAbout = () => {
    this.setState({
      needOpenEditAbout: true
    })
  }

  requestChangeAvatar = () => {
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
        const imageBase64 = 'data:image/jpeg;base64,' + response.data
        const source = { uri: imageBase64 };
        this.setState({
          avatarSource: source
        })
      }
    })
  }

  renderAvatar = () => {
    const avatarSize = 200
    const avatarUrl = this.props.user.avatar
    let source = undefined
    if (avatarUrl && avatarUrl.startsWith("http")) {
      source = {uri: avatarUrl}
    }
    else {
      source = require('../../res/images/golfer_placeholder.png')
    }

    if (this.state.avatarSource) {
      source = this.state.avatarSource
    }

    return (
      <View style={{
        marginBottom: 24
      }}>
        <LoadableImage
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            alignSelf: 'center',
            backgroundColor: Theme.buttonPrimary
          }}
          source={source}
        />
        <TouchableOpacity style={{
          width: '100%',
          height: 50,
          backgroundColor: '#00000090',
          position: 'absolute',
          bottom: 0,
        }} activeOpacity={0.7} onPress={this.requestChangeAvatar}>
          <DGText style={{
            width: '100%',
            height: 50,
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            paddingTop: 8
          }}>Edit</DGText>
        </TouchableOpacity>
      </View>
    )
  }

  renderInterests() {
    const user = this.props.user
    const interest = user.interest.slice()
    if (!Array.isArray(interest) || interest.length == 0) {
      return <InterestItem 
        name={"+"} 
        style={{
          marginHorizontal: 16
        }}
        onPress={() => this.props.navigation.navigate("Interest")}
      />
    }

    interest.push({})

    return (
      <FlatList
        style={{ marginLeft: 12 }}
        data={interest}
        numColumns={3}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          if (item.name) {
            return <InterestItem name={item.name} />
          }
          else {
            return <InterestItem 
              name={"+"} 
              onPress={() => this.props.navigation.navigate("Interest")}
            />
          }
        }}
      />
    )
  }

  renderPersonalInfoBlock = () => {
    const user = this.props.user
    const name = [user.firstName, user.lastName].join(" ")

    const about = this.state.about ? this.state.about : user.about

    return (
      <View>
        {renderValueClickableItem(Strings.profile.fullName, name)}
        {renderValueClickableItem(Strings.profile.myCountry, user.country)}
        {renderValueClickableItem(Strings.profile.myRegion, user.region)}
        {renderValueClickableItem(Strings.profile.myCountry, user.club)}
        {renderValueClickableItem(Strings.profile.index, user.index)}
        {renderSpacing(24)}
        {renderSectionTitle(Strings.profile.aboutMe, true)}
        {renderSpacing(8)}
        {
          about ? (
            <DGText style={{
              width: '80%',
              color: Theme.textWhite,
              marginHorizontal: 16,
            }}>{about}</DGText>
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={this.requestEditAbout}>
              <DGText style={{
                width: '80%',
                color: Theme.textWhite,
                marginHorizontal: 16,
              }}>{"Your about is blank. Tap to edit"}</DGText>
            </TouchableOpacity>
          )
        }
        {renderSpacing(24)}
        {renderSectionTitle(Strings.profile.myInterests, true)}
        {renderSpacing(8)}
        {this.renderInterests()}
      </View>
    )
  }

  renderUserInfo() {
    const userAvatar = this.renderAvatar()
    const userBasicInfo = this.renderPersonalInfoBlock()
    
    return [userAvatar, userBasicInfo, renderSpacing(44)]
  }

  renderDiscoverBlock() {
    const user = this.props.user

    return (
      <View>
        {renderSectionTitle(Strings.settings.defaultSettings)}
        {renderValueClickableItem(Strings.settings.location, user.country)}
        {renderValueClickableItem(Strings.settings.region, user.region)}
        {renderValueClickableItem(Strings.settings.club, user.club)}
        {
          renderSliderItem(
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
          renderRangeItem(
            Strings.settings.ageRange, 
            13, 
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
          renderRangeItem(
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

  renderTopBlock() {
    let ggSubscriptionButton = <DGButton 
      style={styles.ggButton}
      text={Strings.settings.getGGSubscription}
      onPress={() => this.props.navigation.navigate("Premium")}
    />
    return [ggSubscriptionButton]
  }

  renderVisibilityBlock() {
    let showGG = renderToggleItem(
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
        {renderSectionTitle(Strings.settings.notifications.title)}
        {
          renderToggleItem(
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
          renderToggleItem(
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
        {renderSectionTitle(Strings.settings.contactUs)}
        {renderClickableItem(Strings.settings.helpAndSupport)}
        {renderClickableItem(Strings.settings.rateUs)}
        {renderClickableItem(Strings.settings.shareGG)} 
      </View>
    )
  }

  renderLegalBlock() {
    return (
      <View>
        {renderSectionTitle(Strings.settings.legal)}
        {
          renderClickableItem(
            Strings.settings.privacyPolicy, 
            "flex-start",
            () => alert("Open privary policy")
          )
        }
        {
          renderClickableItem(
            Strings.settings.termOfService, 
            "flex-start",
            () => alert("Open term of service")
          )
        }
        {
          renderClickableItem(
            Strings.settings.rulesAndEtiquettes, 
            "flex-start",
            () => alert("Open rules and etiquettes")
          )
        } 
        {
          renderClickableItem(
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
          this.state.showChangePassword ? 
          renderClickableItem(
            Strings.settings.changePassword,
            undefined, 
            this.onRequestChangePassword
          ) : undefined
        } 
        {
          renderClickableItem(
            Strings.settings.logout, 
            undefined, 
            this.onRequestLogout
          )
        } 
        {
          renderClickableItem(
            Strings.settings.deleteAccount,
            undefined, 
            this.onRequestDeleteAccount
          )
        } 
      </View>
    )
  }

  renderDeleteAccountBlock() {
    return (
      <View>
        {renderSeparator()}
        {renderClickableItem(Strings.settings.deleteAccount)} 
      </View>
    )
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
      globe_golfer: this.state.settings.globegolfer,
      avatar: this.state.avatarSource ? this.state.avatarSource.uri : undefined,
      about: this.state.about ? this.state.about : undefined
    }

    this.setState({
      loading: true
    })
    this.needUpdate = true
    this.props.updateProfile(objToUpdate)
  }

  render() {
    let right;
    const isSettingEqual = lodash.isEqual(this.state.settings, this.props.settings)
    const isAvatarHasChanged = this.state.avatarSource != null
    const isAboutHasChanged = this.state.about != null

    if (!isSettingEqual || isAvatarHasChanged || isAboutHasChanged) {
      right = {
        title: "Apply",
        onPress: this.onApply
      }
    }
    
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
          {this.renderUserInfo()}
          {
            this.props.user.isPremium ? undefined : [
              this.renderTopBlock(),
              renderSeparator()
            ]
          }
          {renderSpacing(44)}
          {this.renderDiscoverBlock()}
          {this.renderVisibilityBlock()}
          {renderSpacing(44)}
          {this.renderNotificationBlock()}
          {renderSpacing(44)}
          {this.renderContactUsBlock()}
          {renderSpacing(44)}
          {this.renderLegalBlock()}
          {renderSpacing(44)}
          {this.renderLogoutBlock()}
          {renderSpacing(44)}
        </DialogCombination>
        <LoadingModal visible={this.state.loading} />
        <EditAbout visible={this.state.needOpenEditAbout} onRequestOK={(text) => {
          this.setState({
            about: text,
            needOpenEditAbout: false
          })
        }}/>
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
  updateProfile: (objToUpdate) => dispatch(updateProfile(objToUpdate)),
  getProfile: () => dispatch(getProfile()),
  getInterests: () => dispatch(getInterests())
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)