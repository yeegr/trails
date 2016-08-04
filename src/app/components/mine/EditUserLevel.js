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
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../containers/actions/loginActions'

import Icon from '../shared/Icon'
import styles from '../../styles/main'

class EditUserLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: this.props.user.level
    }
  }

  componentWillUnmount() {
    this.props.loginActions.updateUser(this.props.user.id, {
      level: this.state.level
    })
  }

  render() {
    let transparent = 'rgba(0,0,0,0)'

    return (
      <View style={styles.detail.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              [0,1,2,3,4].map((level) => {
                return (
                  <TouchableOpacity 
                    key={level} 
                    onPress={() => this.setState({level})}>
                    <View style={[styles.editor.link, {}]}>
                      <View style={styles.editor.label}>
                        <Text>
                          {Lang.userLevelArray[level]}
                        </Text>
                      </View>
                      <View style={styles.editor.value}>
                        <Icon sideLength='36' backgroundColor={transparent} fillColor={(level === this.state.level) ? Graphics.colors.primary : transparent} type='checkmark' />
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditUserLevel.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserLevel)