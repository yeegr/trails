'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  Modal,
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

import {
  UTIL,
  Graphics,
  Lang
} from '../../settings'

class TrailPicker extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      loading: false,
      dataSource: this.dataSource.cloneWithRows([])
    }
  }

  componentWillMount() {
    this.props.trailsActions.listTrails("?creator=" + this.props.user.id)
  }

  componentDidMount() {
    this.setState({
      loading: true,
      dataSource: this.state.dataSource.cloneWithRows(this.props.trails)
    })
  }

  onPress(trail) {
    this.props.onPress(trail)
    this.props.onCancel()
  }

  renderRow(rowData, sectionId, rowId) {
    let icon = (this.props.selected && this.props.selected._id === rowData.id) ? (
      <Icon
        backgroundColor={Graphics.colors.transparent}
        fillColor={Graphics.colors.primary}
        sideLength={36}
        type={'checkmark'}
      />
    ) : null

    return (
      <TouchableOpacity onPress={() => this.onPress(rowData)}>
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
                text={Lang.DifficultyLevel.substring(0,2) + ': ' + rowData.difficultyLevel}
              />
              <TextView
                class={'h6'}
                style={{marginRight: 10}}
                text={Lang.TotalDuration.substring(0,2) + ': ' + UTIL.formatDuration(rowData.totalDuration)}
              />
              <TextView
                class={'h6'}
                style={{marginRight: 10}}
                text={Lang.TotalDistance.substring(2) + ': ' + rowData.totalDistance.toFixed(1) + Lang.Kilometre}
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

    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.showPicker}>
        <View style={styles.modal.wrapper}>
          <TextView
            style={{marginBottom: 20, marginTop: 30, textAlign: 'center'}}
            fontSize={'XL'}
            text={Lang.SelectTrail}
          />
          <ListView
            style={{flex: 1}}
            enableEmptySections={true}
            scrollEnabled={true}
            dataSource={this.dataSource.cloneWithRows(trails)}
            renderRow={this.renderRow.bind(this)}
          />
          <TouchableOpacity onPress={this.props.onCancel} style={styles.modal.close}>
            <Icon 
              backgroundColor={Graphics.colors.transparent}
              fillColor={'rgba(0, 0, 0, 0.5)'}
              type={'close'}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

TrailPicker.propTypes = {
  navigator: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  trails: PropTypes.array.isRequired,
  selected: PropTypes.object,
  trailsActions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  onCancel: PropTypes.func,
  showPicker: PropTypes.bool.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(TrailPicker)

