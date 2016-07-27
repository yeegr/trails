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
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {USER_ACTIONS} from '../../../constants'
import * as loginActions from '../../containers/actions/loginActions'
import * as toolbarActions from '../../containers/actions/toolbarActions'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.act = this.act.bind(this)
  }

  act(type) {
    if (this.props.user) {
      var requestBody = {
        action: type,
        target: this.props.type,
        ref: this.props.data.id,
        creator: this.props.user.id
      }
      console.log(JSON.stringify(requestBody))
      this.props.toolbarActions.send(requestBody);
    } else {
      this.props.loginActions.showLogin()
    }
  }

  componentDidMount() {
    const data = this.props.data,
      initState = {
        target: this.props.type,
        ref: data.id,
        likeCount: data.likeCount,
        saveCount: data.saveCount,
        shareCount: data.shareCount
      }

    this.props.toolbarActions.resetToolbar(initState)
  }

  render() {
    const showLabel = this.props.showLabel,
      flex = (showLabel) ? {flex: 1} : null,
      data = this.props.toolbar
    
    return (
      <View style={[styles.toolbar, flex]}>
        <Button path={Graphics.button.like} onPress={() => this.act(USER_ACTIONS.LIKE)} showLabel={showLabel} label={data.likeCount.toString()} />
        <Button path={Graphics.button.save} onPress={() => this.act(USER_ACTIONS.SAVE)} showLabel={showLabel} label={data.saveCount.toString()} />
        <Button path={Graphics.button.share} onPress={() => this.act(USER_ACTIONS.SHARE)} showLabel={showLabel} label={data.shareCount.toString()} />
      </View>
    )
  }
}

Toolbar.propTypes = {
  showLabel: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
}

const Button = (props) => {
  let label = null,
    scale = 1

  if (props.showLabel) {
    label = <Text style={styles.toolbarLabel}>{props.label.toString()}</Text>,
    scale = 0.75
  }

  let sideLength = scale * Graphics.buttonSide

  return (
    <TouchableOpacity style={styles.toolbarButton} onPress={props.onPress}>
      <Svg width={sideLength} height={sideLength}>
        <Path scale={scale} fill={AppSettings.color.midGray} d={props.path} />
      </Svg>
      {label}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    width: Graphics.iconSide * 3,
  },
  toolbarButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5,
    height: Graphics.buttonSide,
    width: Graphics.buttonSide,
  },
  toolbarLabel: {
    color: AppSettings.color.midGray,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
})

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    toolbar: state.toolbar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    toolbarActions: bindActionCreators(toolbarActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
