'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Alert,
  ListView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import Swipeout from 'react-native-swipeout'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as newTrailActions from '../../../redux/actions/newTrailActions'

import Empty from '../shared/Empty'
import TrailInfo from '../trail/TrailInfo'

import styles from '../../styles/main'

import {
  LANG,
  Graphics
} from '../../../../common/__'

class MyTrails extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this._swipeOut = this._swipeOut.bind(this)
    this._nextPage = this._nextPage.bind(this)
    this._editConfirm = this._editConfirm.bind(this)
    this._editTrail = this._editTrail.bind(this)
    this._deleteConfirm = this._deleteConfirm.bind(this)
    this._deleteTrail = this._deleteTrail.bind(this)
  }

  _nextPage(trail) {
    this.props.navigator.push({
      id: 'TrailDetail',
      title: LANG.t('trail.TrailDetail'),
      passProps: {
        trail,
        isReview: true
      }
    })
  }

  _editConfirm(index) {
    const trail = this.props.login.trails[index],
      userId = this.props.login.user._id,
      creator = (typeof(trail.creator) === 'string') ? trail.creator : trail.creator._id

    if (creator === userId) {
      this._editTrail(trail)
    }
  }

  _editTrail(trail) {
    this.props.newTrailActions.editTrail(trail)

    this.props.navigator.push({
      id: 'EditTrail',
      title: LANG.t('trail.EditTrail'),
      passProps: {
        trail
      }
    })
  }

  _deleteConfirm(index) {
    const trail = this.props.login.trails[index],
      userId = this.props.login.user._id,
      creator = (typeof(trail.creator) === 'string') ? trail.creator : trail.creator.id

    if (creator === userId) {
      Alert.alert(
        LANG.t('trail.edit.DeleteAlert.title'),
        LANG.t('trail.edit.DeleteAlert.description'),
        [
          {text: LANG.t('trail.edit.DeleteAlert.cancel')},
          {
            text: LANG.t('trail.edit.DeleteAlert.confirm'),
            onPress: () => this._deleteTrail(trail)
          }
        ]
      )
    }
  }

  _deleteTrail(trail) {
    this.props.newTrailActions.deleteTrail(trail)
  }

  _swipeOut(index) {
    return [{
      text: LANG.t('glossary.Delete'),
      backgroundColor: Graphics.colors.warning,
      onPress: () => this._deleteConfirm(index)
    },
    {
      text: LANG.t('glossary.Edit'),
      backgroundColor: Graphics.colors.primary,
      onPress: () => this._editConfirm(index)
    }]
  }

  renderRow(rowData, sectionId, rowId) {
    const SwipeOutButtons = () => this._swipeOut(rowId)

    return (
      <View key={rowId} style={styles.global.row}>
        <Swipeout
          autoClose={true}
          backgroundColor="transparent"
          right={SwipeOutButtons()}
        >
          <TouchableOpacity onPress={() => this._nextPage(rowData)}>
            <TrailInfo
              type={rowData.type}
              title={rowData.title}
              date={rowData.date}
            />
          </TouchableOpacity>
        </Swipeout>
      </View>
    )
  }

  render() {
    const {trails} = this.props.login

    if (trails.length < 1) {
      return (
        <Empty
          text={''}
        />
      )
    }

    return (
      <View style={styles.global.main}>
        <ScrollView>
          {
            trails.map((trail, index) => {
              const SwipeOutButtons = () => this._swipeOut(index)

              return (
                <View key={index} style={[styles.global.row, {height: 80}]}>
                  <Swipeout
                    autoClose={true}
                    backgroundColor="transparent"
                    right={SwipeOutButtons()}
                  >
                    <TouchableOpacity onPress={() => this._nextPage(trail)}>
                      <TrailInfo
                        type={trail.type}
                        title={trail.title}
                        date={trail.date}
                      />
                    </TouchableOpacity>
                  </Swipeout>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

MyTrails.propTypes = {
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTrails)
