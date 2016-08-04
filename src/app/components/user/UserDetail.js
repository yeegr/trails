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

import Loading from '../shared/Loading'
import Avatar from '../shared/Avatar'
import TagList from '../shared/Tag'
import styles from '../../styles/main'

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
      return <Loading />
    }

    const user = this.state.data,
      navigator = this.props.navigator

    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: AppSettings.assetUri + AppSettings.userBackground }}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
        header={(
          <View style={styles.user.hero}>
            <Avatar user={user} size='XL' borderWidth={6} />
            <Text style={styles.user.userHandle}>{user.handle}</Text>
            <TagList tags={user.tags} />
          </View>
        )}>
        <View>
        </View>
      </ParallaxView>
    )
  }
}
