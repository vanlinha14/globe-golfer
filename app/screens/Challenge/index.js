import React, { PureComponent } from 'react'
import { StyleSheet, View, Switch, Image, Dimensions } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'
import DGText from '../../components/DGText'

import Header from './components/Header'
import TinderMode from './components/TinderMode'
import GridMode from './components/GridMode'

const dummydata = [
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg",
    rating: 3,
    name: "Adrien",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
    rating: 3,
    name: "Zoé",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
  {
    metaData: [
      {
        key: "Level",
        value: "Tour Player"
      },
      {
        key: "Index",
        value: "18"
      },
      {
        key: "Match",
        value: "1225"
      },
      {
        key: "Win",
        value: "173"
      }
    ],
    avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
    rating: 3,
    name: "Anoushka",
    location: "Golf, New York",
    about: "Sharing my experience with aspiring golfer. I'm a golfer from New York. Sharing my experience with aspiring golfer."
  },
]

export default class Challenge extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isGridMode: false,
  }

  onViewModeChanged = () => {
    this.setState({
      isGridMode: !this.state.isGridMode
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isOn={this.state.isGridMode} onViewModeChanged={this.onViewModeChanged} />
        <View style={{ flex: 1 }}>
          {this.state.isGridMode ? <GridMode data={dummydata} /> : <TinderMode data={dummydata}/>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.mainBackground
  }
})