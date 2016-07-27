'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  Image,
  Text,
  TabBarIOS
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import styles from '../../styles/main'
import Loading from '../shared/Loading'
import Tag from '../shared/Tag'

export default class UserDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  fetchData(id) {
    fetch(AppSettings.apiUri + 'users/' + id)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        loading: false,
        data: responseData
      })
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    const user = this.state.data,
      navigator = this.props.navigator

    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: AppSettings.assetUri + AppSettings.userBackground }}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: AppSettings.color.background}}
        header={(
          <View style={styles.user.hero}>
            <View style={styles.user.heroItem}>
              <View style={styles.user.avatarRing}>
                <Image
                  style={styles.user.avatar}
                  source={{uri: AppSettings.assetUri + 'users/' + user.avatar}}
                / >
              </View>
            </View>
            <View style={styles.user.heroItem}>
              <Text style={styles.user.userHandle}>{user.handle}</Text>
            </View>
            <View style={styles.user.userTags}>
              <Tag label="10年" bgColor="#f90" />
              {
                user.tags.map(function(tag, i){
                  return <Tag label={tag} key={i} />
                })
              }
            </View>
          </View>
        )}>
        <View>
        </View>
      </ParallaxView>
    )
  }
}
