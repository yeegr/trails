'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../../../common/__'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Text,
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import Avatar from '../shared/Avatar'
import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'
import TagList from '../shared/TagList'

import styles from '../../styles/main'

export default class UserDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      user: null
    }
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  fetchData(id) {
    fetch(AppSettings.apiUri + 'users/' + id)
    .then((res) => res.json())
    .then((user) => {
      this.setState({
        loading: false,
        user
      })
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  render() {
    if (!this.state.user) {
      return <Loading />
    }

    const {user} = this.state,
      userBackgroundUrl = ImagePath({type: 'background', path: AppSettings.userBackground})

    return (
      <ParallaxView style={styles.user.wrapper}
        backgroundSource={{uri: userBackgroundUrl}}
        windowHeight={320}
        scrollableViewStyle={{backgroundColor: Graphics.colors.background}}
        header={(
          <View style={styles.user.hero}>
            <Avatar user={user} size={'XL'} borderWidth={6} />
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

UserDetail.propTypes = {
  id: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired
}