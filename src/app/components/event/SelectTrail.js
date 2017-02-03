'use strict'

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
import * as newEventActions from '../../redux/actions/newEventActions'

import Icon from '../shared/Icon'
import Loading from '../shared/Loading'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../settings'

class SelectTrail extends Component {
  constructor(props) {
    super(props)
    this._fetch = this._fetch.bind(this)
    this._select = this._select.bind(this)
    this._remove = this._remove.bind(this)
    this._toggle = this._toggle.bind(this)

    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      selected: this.props.schedule,
      loading: true,
      dataSource: this.dataSource.cloneWithRows([])
    }
  }

  componentWillMount() {
    this._fetch()
  }

  componentDidMount() {
    this.setState({
      loading: false,
      dataSource: this.state.dataSource.cloneWithRows(this.props.trails)
    })
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventSchedule(this.state.selected)
  }

  _fetch() {
    const query = "?isPublic=true&status=approved&city=" + AppSettings.currentCity
    this.props.trailsActions.listTrails(query)
  }

  _select(value) {
    let selected = this.state.selected.splice(0)

    if (selected.indexOf(value) < 0) {
      selected.push(value)
    }

    this.setState({selected})
  }

  _remove(value) {
    let selected = this.state.selected.splice(0)

    if (selected.indexOf(value) > -1) {
      selected.splice(selected.indexOf(value), 1)
    }

    this.setState({selected})
  }

  _toggle(value) {
    (this.state.selected.indexOf(value) > -1) ? this._remove(value) : this._select(value)
  }

  renderRow(rowData, sectionId, rowId) {
    const icon = (this.state.selected.indexOf(rowData._id) > -1) ? (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        sideLength={36}
        type={'checkmark'}
      />
    ) : null

    return (
      <TouchableOpacity onPress={() => this._toggle(rowData._id)}>
        <View style={[styles.editor.link, {alignItems: 'flex-start'}]}>
          <View style={{height: Graphics.icon.sideLength, justifyContent: 'center'}}>
            <Icon type={rowData.type.toString()} />
          </View>
          <View style={{flex: 1, marginLeft: 10, marginTop: 5}}>
            <TextView fontSize={'M'} text={rowData.title} />
            <TextView class={'h5'} text={UTIL.formatTime(rowData.date)} />
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TextView
                class={'h6'}
                style={{marginRight: 10}}
                text={LANG.t('trail.DifficultyLevel') + ': ' + rowData.difficultyLevel.toFixed(1)}
              />
              <TextView
                class={'h6'}
                style={{marginRight: 10}}
                text={LANG.t('trail.TotalDuration') + ': ' + UTIL.formatDuration(rowData.totalDuration)}
              />
              <TextView
                class={'h6'}
                style={{marginRight: 10}}
                text={LANG.t('trail.TotalDistance') + ': ' + LANG.t('number.length.km', {'length': rowData.totalDistance.toFixed(1)})}
              />
            </View>
          </View>
          <View style={[styles.editor.value, {marginTop: 8, width: 40}]}>
            {icon}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {trails} = this.props

    if (!trails) {
      return <Loading />
    }

    if (trails.length === 0) {
      return null
    }

    return (
      <View style={styles.global.main}>
        <ListView
          style={{flex: 1}}
          enableEmptySections={true}
          scrollEnabled={true}
          dataSource={this.dataSource.cloneWithRows(trails)}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

SelectTrail.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  schedule: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  trails: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    schedule: state.newEvent.schedule,
    user: state.login.user,
    trails: state.trails.list,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch),
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTrail)

