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

class EditExpensesIncludes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      includes: this.props.includes
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setExpensesIncludes(this.state.includes)
  }

  render() {
    return (
      <View style={styles.editor.list}>
        <ListEditor
          list={this.state.includes}
        />
      </View>
    )
  }
}

EditExpensesIncludes.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  includes: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    includes: state.newEvent.expenses.includes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesIncludes)
