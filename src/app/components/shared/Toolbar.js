'use strict'

import {
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Svg, {
  Path
} from 'react-native-svg'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {USER_ACTIONS} from '../../../constants'
import * as loginActions from '../../containers/actions/loginActions'
import * as toolbarActions from '../../containers/actions/toolbarActions'

import Icon from './Icon'
import TextView from './TextView'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.act = this.act.bind(this)
    this.comment = this.comment.bind(this)
  }

  act(type) {
    if (this.props.user) {
      var requestBody = {
        action: type,
        target: this.props.type,
        ref: this.props.data.id,
        creator: this.props.user.id
      }
      this.props.toolbarActions.send(requestBody);
    } else {
      this.props.loginActions.showLogin()
    }
  }

  comment() {
    this.props.navigator.push({
      id: 'Comments',
      title: Lang.Comments,
      passProps: {
        type: this.props.type,
        data: this.props.data
      }
    })
  }

  componentDidMount() {
    const data = this.props.data,
    init = {
      target: this.props.type,
      ref: data.id,
      likeCount: data.likeCount,
      saveCount: data.saveCount,
      shareCount: data.shareCount,
      commentCount: data.commentCount
    }

    this.props.toolbarActions.resetToolbar(init)
  }

  render() {
    const toolbar = this.props.toolbar,
    stack = this.props.stack || 'horizontal',
    icon = Graphics.toolbar.icon,
    sideLength = icon.sideLength,
    viewBox = icon.viewBox,
    scale = icon.scale,
    fillColor = this.props.fillColor || icon.fillColor,
    textColor = this.props.textColor || icon.textColor

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.act(USER_ACTIONS.LIKE)}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={fillColor}
            labelColor={textColor}
            scale={scale}
            showLabel={false}
            sideLength={sideLength}
            stack={stack}
            valueColor={textColor}
            viewBox={icon.viewBox}
            path={Graphics.toolbar.like}
            label={Lang.LIKE}
            value={toolbar.likeCount}  
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.act(USER_ACTIONS.SAVE)}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={fillColor}
            labelColor={textColor}
            scale={scale}
            showLabel={false}
            sideLength={sideLength}
            stack={stack}
            valueColor={textColor}
            viewBox={icon.viewBox}
            path={Graphics.toolbar.save}
            label={Lang.SAVE}
            value={toolbar.saveCount}  
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.act(USER_ACTIONS.SHARE)}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={fillColor}
            labelColor={textColor}
            scale={scale}
            showLabel={false}
            sideLength={sideLength}
            stack={stack}
            valueColor={textColor}
            viewBox={icon.viewBox}
            path={Graphics.toolbar.share}
            label={Lang.SHARE}
            value={toolbar.shareCount}  
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.comment}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={fillColor}
            labelColor={textColor}
            scale={scale}
            showLabel={false}
            sideLength={sideLength}
            stack={stack}
            valueColor={textColor}
            viewBox={icon.viewBox}
            path={Graphics.toolbar.comment}
            label={Lang.Comment}
            value={toolbar.commentCount}  
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

Toolbar.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  showLabel: PropTypes.bool
}

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
