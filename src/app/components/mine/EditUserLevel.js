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
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../../containers/actions/loginActions'

import TextView from '../shared/TextView'
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
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            {
              [0,1,2,3,4].map((level) => {
                let icon = (level === this.state.level) ? (
                  <Icon
                    backgroundColor={Graphics.colors.transparent}
                    fillColor={Graphics.colors.primary}
                    sideLength='36'
                    type='checkmark'
                  />
                ) : null

                return (
                  <TouchableOpacity 
                    key={level} 
                    onPress={() => this.setState({level})}
                  >
                    <View style={[styles.editor.link, {}]}>
                      <View style={styles.editor.label}>
                        <TextView text={Lang.userLevelArray[level]} />
                      </View>
                      <View style={styles.editor.value}>
                        {icon}
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