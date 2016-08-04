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

import TextView from './TextView'

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
    const showLabel = this.props.showLabel || false,
      data = this.props.toolbar
    
    return (
      <View style={styles.toolbar}>
        <Button 
          path={Graphics.toolbar.like}
          showLabel={showLabel}
          label={Lang.LIKE}  
          value={data.likeCount}  
          onPress={() => this.act(USER_ACTIONS.LIKE)}
        />
        <Button
          path={Graphics.toolbar.save}
          showLabel={showLabel}
          label={Lang.SAVE} 
          value={data.saveCount} 
          onPress={() => this.act(USER_ACTIONS.SAVE)}
        />
        <Button 
          path={Graphics.toolbar.share}
          showLabel={showLabel}
          label={Lang.SHARE}
          value={data.shareCount}
          onPress={() => this.act(USER_ACTIONS.SHARE)}
        />
      </View>
    )
  }
}

const Button = (props) => {
  const actionButton = Graphics.actionButton,
    iconScale = actionButton.iconScale,
    sideLength = actionButton.sideLength * iconScale,
    fillColor = props.fillColor || actionButton.fillColor,
    textColor = props.textColor || actionButton.textColor,
    label = (props.showLabel) ? (
      <View style={{marginTop: 5}}>
        <TextView
          fontSize='XS'
          fontWeight='bold'
          textColor={textColor}
          text={props.label}
        />
      </View>
    ) : null

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Svg width={sideLength} height={sideLength}>
          <Path scale={iconScale} fill={fillColor} d={props.path} />
        </Svg>
        {label}
        <Text style={[styles.value, {color: textColor}]}>{props.value.toString()}</Text>
      </View>
    </TouchableOpacity>
  )
},
styles = StyleSheet.create({
  toolbar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Graphics.actionBar.height,
    justifyContent: 'space-around',
    paddingHorizontal: 5
  },
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 5,
    height: Graphics.actionButton.sideLength,
    width: Graphics.actionButton.sideLength + 10
  },
  value: {
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
})

Toolbar.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  showLabel: PropTypes.bool
}

Button.propTypes = {
  path: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string
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
