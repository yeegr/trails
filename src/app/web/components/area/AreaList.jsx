'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../../redux/actions/areasActions'

class AreaList extends Component {
  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    areasActions.resetAreaList()
  }

  fetchData() {
    this.props.areasActions.listAreas(this.props.query)
  }

  onRefresh() {
    this.fetchData()
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <div>

        </div>
    )
  }

  render() {
    const {areas} = this.props

    return (
      <detail>
      </detail>
    )
  }
}

AreaList.propTypes = {
  areasActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  areas: PropTypes.object
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
