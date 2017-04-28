'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'

import Avatar from '../shared/Avatar'
import TextView from '../shared/TextView'
import FollowButton from './FollowButton'

import {
  LANG,
  Graphics
} from '../../../../common/__'

class UserLink extends Component {
  constructor(props) {
    super(props)
    this._onPress = this._onPress.bind(this)
    this._toggleFollow = this._toggleFollow.bind(this)

    this.state = {
      me: this.props.login.user
    }
  }

  _onPress() {
    const {user} = this.props.login

    this.props.navigator.push({
      id: 'UserDetail',
      title: user.handle,
      passProps: {
        id: user.id
      }
    })
  }

  _toggleFollow() {
    this.props.userActions.updateUserFollowings(this.props.user._id)
  }

  render() {
    const {user} = this.props,
      {me} = this.state,
      title = this.props.title || LANG.t('user.levels.' + parseInt(user.level).toString()),
      level = this.props.title ? (
        <TextView
          textColor={Graphics.colors.darkGray}
          fontSize={'SML'}
          text={LANG.t('user.levels.' + parseInt(user.level).toString())}
        />
      ) : null,
      followSection = (me) ? (
        <View style={styles.follow}>
          <FollowButton user={user} />
        </View>
      ) : null

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.wrapper}>
          <Avatar user={user} />
          <View style={styles.content}>
            <TextView
              class={'h4'}
              text={title}
            />
            <View style={styles.user}>
              <TextView
                fontSize={'L'}
                text={user.handle}
              />
              <View style={styles.info}>
                {level}
              </View>
            </View>
          </View>
          {followSection}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5
  },
  user: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  info: {
    marginLeft: 10,
    marginBottom: 2
  },
  follow: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2
  }
})

UserLink.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  title: PropTypes.string,
  login: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(UserLink)
