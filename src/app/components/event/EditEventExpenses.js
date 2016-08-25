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
  SegmentedControlIOS,
  Switch,
  TextInput,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import ListEditor from '../shared/ListEditor'
import styles from '../../styles/main'

class EditEventExpenses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      perPerson: this.props.perPerson.toString(),
      deposit: this.props.deposit.toString(),
      insurance: this.props.insurance,
      detail: this.props.detail,
      include: this.props.include,
      exclude: this.props.exclude
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventExpenses({
      perPerson: parseInt(this.state.perPerson),
      deposit: parseInt(this.state.deposit),
      insurance: this.state.insurance,
      detail: this.state.detail,
      include: this.state.include,
      exclude: this.state.exclude
    })
  }

  render() {
    var mainView = null

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
                    value={this.state.perPerson}
                    onChangeText={(value) => this.setState({perPerson: value})}
                  />
                  <Text style={styles.editor.currencyPostfix}>{Lang.Yuan}</Text>
                </View>
              </View>
              <View style={styles.editor.link}>
                <View style={styles.editor.label}>
                  <Text>{Lang.Deposit}</Text>
                </View>
                <View style={styles.editor.value}>
                  <Text style={styles.editor.currencyPrefix}></Text>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder={(0).toString()}
                    style={styles.editor.numberInput}
                    value={this.state.deposit}
                    onChangeText={(value) => this.setState({deposit: value})}
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
          <ListEditor key='expDetail' list={this.state.detail} />
        )
      break

      case 2:
        mainView = (
          <ListEditor key='expInclude' list={this.state.include} />
        )
      break

      case 3:
        mainView = (
          <ListEditor key='expExclude' list={this.state.exclude} />
        )
      break
    }

    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.scroll}>
          <SegmentedControlIOS
            values={[Lang.EventExpenses, Lang.ExpensesDetail, Lang.ExpensesInclude, Lang.ExpensesExclude]}
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
  perPerson: PropTypes.number.isRequired,
  deposit: PropTypes.number,
  insurance: PropTypes.bool.isRequired,
  detail: PropTypes.array.isRequired,
  include: PropTypes.array,
  exclude: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    perPerson: state.newEvent.expenses.perPerson,
    deposit: state.newEvent.expenses.deposit,
    insurance: state.newEvent.expenses.insurance,
    detail: state.newEvent.expenses.detail,
    include: state.newEvent.expenses.include,
    exclude: state.newEvent.expenses.exclude
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventExpenses)
