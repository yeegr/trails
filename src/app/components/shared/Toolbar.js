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
import * as loginActions from '../../redux/actions/loginActions'
import * as toolbarActions from '../../redux/actions/toolbarActions'

import Icon from './Icon'

import {
  CONSTANTS,
  Lang,
  Graphics
} from '../../settings'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.act = this.act.bind(this)
    this.comment = this.comment.bind(this)
  }

  componentDidMount() {
    const {data, type} = this.props,
    {id, likeCount, saveCount, shareCount, commentCount} = data,
    init = {
      target: type,
      ref: id,
      likeCount,
      saveCount,
      shareCount,
      commentCount
    }

    this.props.toolbarActions.resetToolbar(init)
  }

  act(type) {
    if (this.props.user) {
      let requestBody = {
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

  render() {
    let {user, type, toolbar, data} = this.props,
    stack = this.props.stack || 'horizontal',
    icon = Graphics.toolbar.icon,
    sideLength = icon.sideLength,
    viewBox = icon.viewBox,
    scale = icon.scale,
    fillColor = this.props.fillColor || icon.fillColor,
    textColor = this.props.textColor || icon.textColor,
    id = data.id,

    likeFillColor = fillColor,
    saveFillColor = fillColor,
    shareFillColor = fillColor,
    commentFillColor = fillColor,

    showLogin = this.props.loginActions.showLogin,

    likeIcon = (
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
    ),
    shareIcon = (
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
    ),
    commentIcon = (
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
    ),

    likeView = (
      <TouchableOpacity onPress={showLogin}>
        {likeIcon}
      </TouchableOpacity>
    ),
    saveView = (
      <TouchableOpacity onPress={showLogin}>
        {saveIcon}
      </TouchableOpacity>
    ),
    shareView = (
      <TouchableOpacity onPress={showLogin}>
        {shareIcon}
      </TouchableOpacity>
    ),
    commentView = (
      <TouchableOpacity onPress={showLogin}>
        {commentIcon}
      </TouchableOpacity>
    )

    if (user) {
      const likesArray = user.likes[CONSTANTS.TOOLBAR_TYPE_KEYS[type]],
        savesArray = user.saves[CONSTANTS.TOOLBAR_TYPE_KEYS[type]],
        sharesArray = user.shares[CONSTANTS.TOOLBAR_TYPE_KEYS[type]]

      likeFillColor = (likesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor,
      saveFillColor = (savesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor,
      shareFillColor = (sharesArray.indexOf(id) > -1) ? Graphics.colors.primary : fillColor

      const likeAction = (likesArray.indexOf(id) < 0) ? CONSTANTS.USER_ACTIONS.LIKE : CONSTANTS.USER_ACTIONS.UNLIKE,
        saveAction = (savesArray.indexOf(id) < 0) ? CONSTANTS.USER_ACTIONS.SAVE : CONSTANTS.USER_ACTIONS.UNSAVE

      likeView = (
        <TouchableOpacity onPress={() => this.act(likeAction)}>
          {likeIcon}
        </TouchableOpacity>
      )

      saveView = (
        <TouchableOpacity onPress={() => this.act(saveAction)}>
          {saveIcon}
        </TouchableOpacity>
      )

      shareView = (
        <TouchableOpacity onPress={() => this.act(CONSTANTS.USER_ACTIONS.SHARE)}>
          {shareIcon}
        </TouchableOpacity>
      )

      commentView = (
        <TouchableOpacity onPress={this.comment}>
          {commentIcon}
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.wrapper}>
        {likeView}
        {saveView}
        {shareView}
        {commentView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

Toolbar.propTypes = {
  navigator: PropTypes.object.isRequired,
  toolbarActions: PropTypes.object.isRequired,
  loginActions: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  toolbar: PropTypes.object.isRequired,
  user: PropTypes.object,
  showLabel: PropTypes.bool,
  stack: PropTypes.string,
  fillColor: PropTypes.string,
  textColor: PropTypes.string
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
