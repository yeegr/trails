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
import {bindActionCreators} from 'redux'
import * as userActions from '../../../redux/actions/userActions'

import TextView from '../shared/TextView'

import {
  LANG,
  Graphics
} from '../../../../common/__'

class FollowButton extends Component {
  constructor(props) {
    super(props)
    this._toggleFollow = this._toggleFollow.bind(this)

    this.state = {
      me: this.props.login.user
    }
  }

  _toggleFollow() {
    this.props.userActions.updateUserFollowings(this.props.user._id)
  }

  render() {
    const {user} = this.props,
      {me} = this.state,
      isFollowing = (me && me.followings.indexOf(user._id) > -1)

    return (
      <TouchableOpacity onPress={this._toggleFollow}>
        <View style={[styles.button, {
          borderColor: isFollowing ? Graphics.colors.disabled : Graphics.colors.primary
        }]}>
          <TextView
            textColor={isFollowing ? Graphics.colors.disabled : Graphics.colors.primary}
            text={LANG.t(isFollowing ? 'user.Unfollow' : 'user.Follow')}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2
  }
})

FollowButton.propTypes = {
  login: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)
