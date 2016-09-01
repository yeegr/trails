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
  ListView
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../redux/actions/areasActions'

import Loading from '../shared/Loading'
import AreaCard from './AreaCard'
import styles from '../../styles/main'

class AreaList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  componentWillMount() {
    this.props.areasActions.listAreas(this.props.params)
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <AreaCard
        key={rowId}
        navigator={this.props.navigator}
        data={rowData}
      />
    )
  }

  render() {
    const {areas, navigator} = this.props

    if (!areas) {
      return <Loading />
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.dataSource.cloneWithRows(areas)}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    areas: state.areas.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    areasActions: bindActionCreators(areasActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaList)
