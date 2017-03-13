'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  Switch,
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import EditLink from '../shared/EditLink'
import EditRow from '../shared/EditRow'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG
} from '../../settings'

class EditExpenses extends Component {
  constructor(props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)

    this.state = {
      perHead: this.props.expenses.perHead.toString() || '',
      deposit: this.props.expenses.deposit.toString() || ''
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setExpensesPerHead(parseFloat(this.state.perHead) || 0)
    this.props.newEventActions.setExpensesDeposit(parseFloat(this.state.deposit) || 0)
  }

  _nextPage(type) {
    let id = null,
      title = null

    switch (type) {
      case 'detail':
        id = 'EditExpensesDetails',
        title = LANG.t("event.ExpensesDetails")
      break

      case 'includes':
        id = 'EditExpensesIncludes',
        title = LANG.t("event.ExpensesIncludes")
      break

      case 'excludes':
        id = 'EditExpensesExcludes',
        title = LANG.t("event.ExpensesExcludes")
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title
      })
    }
  }

  render() {
    const expenses = this.props.expenses

    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <EditRow
              label={LANG.t("event.edit.PerHead")}
              input={
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={8}
                    placeholder={(0).toString()}
                    style={[styles.editor.numberInput, {alignSelf: 'center'}]}
                    value={this.state.perHead}
                    onChangeText={(value) => this.setState({perHead: value})}
                  />
                  <TextView
                    text={LANG.t('number.currency.format.postfix')}
                  />
                </View>
              }
            />
            <EditRow
              label={LANG.t("event.edit.IncludeInsurance")}
              input={
                <Switch
                  placeholder={(0).toString()}
                  onValueChange={(value) => this.props.newEventActions.setEventInsurance(value)}
                  value={expenses.insurance}
                />
              }
            />
          </View>
          <View style={styles.editor.group}>
            <EditLink
              label={LANG.t("event.ExpensesDetails")}
              onPress={() => this._nextPage('detail')}
              value={expenses.detail.length}
            />
            <EditLink
              label={LANG.t("event.ExpensesIncludes")}
              onPress={() => this._nextPage('includes')}
              value={expenses.includes.length}
            />
            <EditLink
              label={LANG.t("event.ExpensesExcludes")}
              onPress={() => this._nextPage('excludes')}
              value={expenses.excludes.length}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditExpenses.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  expenses: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    expenses: state.newEvent.expenses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenses)
