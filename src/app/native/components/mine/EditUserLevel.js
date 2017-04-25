'use strict'

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
import * as userActions from '../../../redux/actions/userActions'

import Icon from '../shared/Icon'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  Graphics
} from '../../../../common/__'

class EditUserLevel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      level: this.props.user.level
    }
  }

  componentWillUnmount() {
    this.props.userActions.updateUser(this.props.user.id, {
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
                    sideLength={36}
                    type={'checkmark'}
                  />
                ) : null

                return (
                  <TouchableOpacity 
                    key={level} 
                    onPress={() => this.setState({level})}
                  >
                    <View style={[styles.editor.link, {}]}>
                      <View style={styles.editor.label}>
                        <TextView text={LANG.t('user.levels.' + level)} />
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
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserLevel)