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

class EditExpensesExcludes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      excludes: this.props.excludes
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setExpensesExcludes(this.state.excludes)
  }

  render() {
    return (
      <View style={styles.editor.list}>
        <ListEditor
          list={this.state.excludes}
        />
      </View>
    )
  }
}

EditExpensesExcludes.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  excludes: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    excludes: state.newEvent.expenses.excludes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesExcludes)
