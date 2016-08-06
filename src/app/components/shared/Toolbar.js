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
import {USER_ACTIONS, TOOLBAR_TYPE_KEYS} from '../../../constants'
import * as loginActions from '../../containers/actions/loginActions'
import * as toolbarActions from '../../containers/actions/toolbarActions'

import Icon from './Icon'
import TextView from './TextView'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.act = this.act.bind(this)
    this.comment = this.comment.bind(this)

    console.log(this.props.user)
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
    const user = this.props.user, 
    type = this.props.type,
    id = this.props.data.id,
    toolbar = this.props.toolbar,
    stack = this.props.stack || 'horizontal',
    icon = Graphics.toolbar.icon,
    sideLength = icon.sideLength,
    viewBox = icon.viewBox,
    scale = icon.scale,
    fillColor = this.props.fillColor || icon.fillColor,
    textColor = this.props.textColor || icon.textColor

    const likesArray = user.likes[TOOLBAR_TYPE_KEYS[type]],
    savesArray = user.saves[TOOLBAR_TYPE_KEYS[type]],
    sharesArray = user.shares[TOOLBAR_TYPE_KEYS[type]]

    //console.log(likesArray)
    //console.log(savesArray)
    //console.log(sharesArray)

    const likeFillColor = (likesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor,
    saveFillColor = (savesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor,
    shareFillColor = (sharesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor,
    commentFillColor = fillColor

    let likeIcon = (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={likeFillColor}
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
    ),
    saveIcon = (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={saveFillColor}
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
    )

    const likeView = (likesArray.indexOf(id) < 0) ? (
      <TouchableOpacity onPress={() => this.act(USER_ACTIONS.LIKE)}>
        {likeIcon}
      </TouchableOpacity>
    ) : likeIcon,
    saveView = (savesArray.indexOf(id) < 0) ? (
      <TouchableOpacity onPress={() => this.act(USER_ACTIONS.SAVE)}>
        {saveIcon}
      </TouchableOpacity>
    ) : saveIcon

    return (
      <View style={styles.wrapper}>
        {likeView}
        {saveView}
        <TouchableOpacity onPress={() => this.act(USER_ACTIONS.SHARE)}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={shareFillColor}
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
            fillColor={commentFillColor}
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
