'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  SegmentedControlIOS,
  Switch,
  TextInput,
  Text,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import ListEditor from '../shared/ListEditor'

import styles from '../../styles/main'

import {
  Lang
} from '../../settings'

class EditEventExpenses extends Component {
  constructor(props) {
    super(props)
    this._ifZero = this._ifZero.bind(this)

    this.state = {
      selectedIndex: 0,
      perHead: this._ifZero(this.props.perHead),
      deposit: this._ifZero(this.props.deposit),
      insurance: this.props.insurance,
      detail: this.props.detail,
      includes: this.props.includes,
      excludes: this.props.excludes
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventExpenses({
      perHead: parseInt(this.state.perHead) || 0,
      deposit: parseInt(this.state.deposit) || 0,
      insurance: this.state.insurance,
      detail: this.state.detail,
      includes: this.state.includes,
      excludes: this.state.excludes
    })
  }

  _ifZero(num) {
    return (num === 0) ? '' : num.toString()
  }

  render() {
    let mainView = null

    switch (this.state.selectedIndex) {
      case 0:
        mainView = (
          <View>
            <View style={styles.editor.group}>
              <View style={styles.editor.link}>
                <View style={styles.editor.label}>
                  <Text>{Lang.PerHead}</Text>
                </View>
                <View style={styles.editor.value}>
                  <Text style={styles.editor.currencyPrefix}></Text>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder={(0).toString()}
                    style={styles.editor.numberInput}
                    value={this.state.perHead}
                    onChangeText={(value) => this.setState({perHead: value})}
                  />
                  <Text style={styles.editor.currencyPostfix}>{Lang.Yuan}</Text>
                </View>
              </View>
              <View style={styles.editor.link}>
                <View style={styles.editor.label}>
                  <Text>{Lang.IncludeInsurance}</Text>
                </View>
                <View style={styles.editor.value}>
                  <Switch
                    placeholder={(0).toString()}
                    onValueChange={(value) => this.setState({insurance: value})}
                    value={this.state.insurance}
                  />
                </View>
              </View>
            </View>
          </View>
        )
      break

      case 1:
        mainView = (
          <ListEditor
            key={'expDetail'}
            list={this.state.detail}
          />
        )
      break

      case 2:
        mainView = (
          <ListEditor
            key={'expInclude'}
            list={this.state.includes}
          />
        )
      break

      case 3:
        mainView = (
          <ListEditor
            key={'expExclude'}
            list={this.state.excludes}
          />
        )
      break
    }

    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.scroll}>
          <SegmentedControlIOS
            values={[Lang.EventExpenses, Lang.ExpensesDetails, Lang.ExpensesInclude, Lang.ExpensesExclude]}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex})
            }}
            style={{marginHorizontal: 15, marginBottom: 15}}
          />
          <View style={{flex: 1}}>
            {mainView}
          </View>
        </View>
      </View>
    )
  }
}

EditEventExpenses.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  perHead: PropTypes.number.isRequired,
  deposit: PropTypes.number,
  insurance: PropTypes.bool.isRequired,
  detail: PropTypes.array.isRequired,
  includes: PropTypes.array,
  excludes: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    perHead: state.newEvent.expenses.perHead,
    deposit: state.newEvent.expenses.deposit,
    insurance: state.newEvent.expenses.insurance,
    detail: state.newEvent.expenses.detail,
    includes: state.newEvent.expenses.includes,
    excludes: state.newEvent.expenses.excludes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventExpenses)
