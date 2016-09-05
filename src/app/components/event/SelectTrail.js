'use strict'

import {
  Graphics,
  Lang
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as trailsActions from '../../redux/actions/trailsActions'

import Icon from '../shared/Icon'
import Loading from '../shared/Loading'
import TextView from '../shared/TextView'
import styles from '../../styles/main'

class SelectTrail extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      loading: true,
      dataSource: ds.cloneWithRows([]),
      selectedIndex: this.props.trailId
    }
  }

  componentWillMount() {
    this.props.trailsActions.listTrails("?creator=" + this.props.user.id)
  }

  componentDidMount() {
    this.setState({
      loading: this.props.isFetching,
      dataSource: this.state.dataSource.cloneWithRows(this.props.trails)
    })
  }

  renderRow(rowData, sectionId, rowId) {
    let icon = (this.state.selectedIndex === rowData.id) ? (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        sideLength='36'
        type='checkmark'
      />
    ) : null

    return (
      <TouchableOpacity onPress={() => this.setState({selectedIndex: rowData.id})}>
        <View style={styles.editor.link}>
          <View style={styles.editor.label}>
            <TextView text={rowData.title} />
          </View>
          <View style={styles.editor.value}>
            {icon}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {trails, navigator} = this.props

    if (!trails) {
      return <Loading />
    }

    return (
      <ListView
        style={styles.global.wrapper}
        enableEmptySections={true}
        scrollEnabled={true}
        style={styles.global.main}
        dataSource={this.dataSource.cloneWithRows(trails)}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}

SelectTrail.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    trails: state.trails.list,
    isFetching: state.trails.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTrail)

