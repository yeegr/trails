'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import {connect} from 'react-redux'

import Empty from '../shared/Empty'
import UserList from '../user/UserList'

import styles from '../../styles/main'


class MyFollowings extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.user.followings.length < 1) {
      this.props.navigator.pop()
    }
  }

  render() {
    const {navigator} = this.props,
      me = this.props.login.user

    if (me.followings.length < 1) {
      return (
        <Empty
          text={''}
        />
      )
    }

    return (
      <View style={styles.global.main}>
        <ScrollView>
          <UserList
            navigator={navigator}
            query={'?in=[' + me.followings.join(',') + ']'}
            data={null}
          />
        </ScrollView>
      </View>
    )
  }
}

MyFollowings.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(MyFollowings)
