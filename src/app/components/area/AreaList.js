'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  RefreshControl
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../redux/actions/areasActions'

import AreaCard from './AreaCard'
import Loading from '../shared/Loading'

class AreaList extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.props.areasActions.resetAreas()
  }

  fetchData() {
    this.props.areasActions.listAreas(this.props.query)
  }

  onRefresh() {
    this.fetchData()
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
    const {areas} = this.props

    if (!areas.list) {
      return <Loading />
    }

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={areas.isFetching}
            onRefresh={() => this.onRefresh()}
          />
        }
        removeClippedSubviews={false}
        scrollEnabled={true}
        dataSource={this.dataSource.cloneWithRows(areas.list)}
        renderRow={this.renderRow}
      />
    )
  }
}

AreaList.propTypes = {
  navigator: PropTypes.object.isRequired,
  areasActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  areas: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  return {
    areas: state.areas
  }
}

function mapDispatchToProps(dispatch) {
  return {
    areasActions: bindActionCreators(areasActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaList)
