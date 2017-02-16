'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import ListEditor from '../shared/ListEditor'

import styles from '../../styles/main'

class EditGearTags extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: this.props.tags
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setGearTags(this.state.tags)
  }

  render() {
    return (
      <View style={styles.editor.list}>
        <ListEditor
          list={this.state.tags}
          type={'tag'}
        />
      </View>
    )
  }
}

EditGearTags.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    tags: state.newEvent.gears.tags
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGearTags)
