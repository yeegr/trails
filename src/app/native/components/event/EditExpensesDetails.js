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

class EditExpensesDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: this.props.detail
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setExpensesDetails(this.state.detail)
  }

  render() {
    return (
      <View style={styles.editor.list}>
        <ListEditor
          list={this.state.detail}
        />
      </View>
    )
  }
}

EditExpensesDetails.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  detail: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    detail: state.newEvent.expenses.detail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesDetails)
