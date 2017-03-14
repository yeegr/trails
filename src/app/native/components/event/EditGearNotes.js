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
import * as newEventActions from '../../../redux/actions/newEventActions'

import ListEditor from '../shared/ListEditor'

import styles from '../../styles/main'

class EditGearNotes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: this.props.notes
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setGearNotes(this.state.notes)
  }

  render() {
    return (
      <View style={styles.editor.list}>
        <ListEditor
          list={this.state.notes}
        />
      </View>
    )
  }
}

EditGearNotes.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    notes: state.newEvent.gears.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGearNotes)
