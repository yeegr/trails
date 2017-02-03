'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as trailsActions from '../../redux/actions/trailsActions'

import Loading from '../shared/Loading'
import TrailCard from './TrailCard'

import styles from '../../styles/main'

class TrailList extends Component {
  constructor(props) {
    super(props)
    this._fetch = this._fetch.bind(this)

    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      loading: true,
      dataSource: this.dataSource.cloneWithRows([])
    }
  }

  componentWillMount() {
    if (this.props.trails) {
      this.setState({
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows(this.props.trails)
      })
    } else {
      this.setState({
        loading: this.props.isFetching,
        dataSource: this.state.dataSource.cloneWithRows(this.props.remoteTrails)
      })

      this._fetch(this.props.query)
    }
  }

  _fetch(query) {
    this.props.trailsActions.listTrails(query)
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TrailCard
        key={rowId} 
        navigator={this.props.navigator}
        trail={rowData}
      />
    )
  }

  render() {
    const trails = this.props.trails || this.props.remoteTrails

    if (!trails) {
      return <Loading />
    }

    if (trails.length === 0) {
      return null
    }

    const list = (
      <ListView
        style={styles.global.wrapper}
        enableEmptySections={true}
        removeClippedSubviews={false}
        scrollEnabled={this.props.scrollEnabled || false}
        dataSource={this.dataSource.cloneWithRows(trails)}
        renderRow={this.renderRow.bind(this)}
      />
    )

    return (this.props.trails) ? list : <View style={{paddingTop: 20}}>{list}</View>
  }
}

TrailList.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  query: PropTypes.string,
  trails: PropTypes.array,
  remoteTrails: PropTypes.array,
  isFetching: PropTypes.bool,
  scrollEnabled: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
  return {
    remoteTrails: state.trails.list,
    isFetching: state.trails.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailList)

