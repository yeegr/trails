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

import * as WeChat from 'react-native-wechat'

import Icon from './Icon'
import ImagePath from './ImagePath'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../settings'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this._act = this._act.bind(this)
    this._send = this._send.bind(this)
    this._comment = this._comment.bind(this)
    this._share = this._share.bind(this)
  }

  componentWillMount() {
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

  componentDidMount() {
  }

  _send(action) {
    let requestBody = {
      action,
      target: this.props.type,
      ref: this.props.data.id,
      creator: this.props.user.id
    }
    this.props.toolbarActions.send(requestBody);
  }

  _comment() {
    this.props.navigator.push({
      id: 'Comments',
      title: LANG.t('comment.comment_plural'),
      passProps: {
        type: this.props.type,
        data: this.props.data
      }
    })
  }

  async _share(data) {
    try {
      let result = await WeChat.shareToSession(data)

      if (result.errCode === 0) {
        this._send(CONSTANTS.USER_ACTIONS.SHARE)
      }
    } catch (e) {
      console.log(e)
    }
  }

  _act(action) {
    if (this.props.user) {
      let data = this.props.data,
        id = data._id,
        contentType = CONSTANTS.TOOLBAR_TYPE_KEYS[this.props.type],
        webpageUrl = AppSettings.baseUri + contentType + '/' + id,
        contentCreator = data.creator._id,
        currentUser = this.props.user._id

      switch (action) {
        case CONSTANTS.USER_ACTIONS.LIKE:
        case CONSTANTS.USER_ACTIONS.SAVE:
          if (contentCreator !== currentUser) {
            this._send(action)
          }
        break

        case CONSTANTS.USER_ACTIONS.SHARE:
          let description = data.excerpt || data.description,
            path = 'assets/favicon.png'

          switch (this.props.type) {
            case CONSTANTS.ACTION_TARGETS.EVENT:
              if (description.length < 1) {
                description = data.destination.substring(0, 100)
              }

              path = UTIL.getEventHeroPath(data)
            break

            case CONSTANTS.ACTION_TARGETS.POST:
              if (description.length < 1) {
                description = data.content.substring(0, 100)
              }

              path = CONSTANTS.TOOLBAR_TYPE_KEYS[this.props.type] + '/' + id + '/' + data.hero
            break
          }

          this._share({
            type: 'news',
            title: data.title,
            description,
            thumbImage: ImagePath({type: 'thumb', path}),
            webpageUrl
          })
        break

        case CONSTANTS.USER_ACTIONS.COMMENT:
          this._comment()
        break
      }
    } else {
      this.props.loginActions.showLogin()
    }
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
          label={LANG.t('action.LIKE')}
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
          label={LANG.t('action.SAVE')}
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
          label={LANG.t('action.SHARE')}
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
          label={LANG.t('action.Comment')}
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
          <TouchableOpacity onPress={() => this._act(likeAction)}>
            {likeIcon}
          </TouchableOpacity>
        )

        saveView = (
          <TouchableOpacity onPress={() => this._act(saveAction)}>
            {saveIcon}
          </TouchableOpacity>
        )

        shareView = (
          <TouchableOpacity onPress={() => this._act(CONSTANTS.USER_ACTIONS.SHARE)}>
            {shareIcon}
          </TouchableOpacity>
        )

        commentView = (
          <TouchableOpacity onPress={this._comment}>
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
