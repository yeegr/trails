'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  SegmentedControlIOS,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'

import EditLink from '../shared/EditLink'
import Loading from '../shared/Loading'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  Graphics
} from '../../settings'

class MyEvents extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
    this.renderRow = this.renderRow.bind(this)
    this._toggleList = this._toggleList.bind(this)
    this._signUpList = this._signUpList.bind(this)

    this.state = {
      selectedIndex: 0
    }
  }

  componentWillMount() {
    this._toggleList(this.state.selectedIndex)
  }

  eventPage(id) {
    this.props.navigator.push({
      id: 'EventDetail',
      title: LANG.t('event.EventDetail'),
      passProps: {
        id,
        isReview: true
      }
    })
  }

  _signUpList(event, groupIndex, isReview) {
    this.props.navigator.push({
      id: 'SignUpList',
      title: LANG.t('mine.SignUpList'),
      passProps: {
        event,
        groupIndex,
        isReview
      }
    })
  }

  _toggleList(selectedIndex) {
    this.setState({selectedIndex})

    let query = ''

    switch (selectedIndex) {
      case 0:
        query = "&status!=editing"
      break

      case 1:
        query = "&status=editing"
      break
    }

    this.props.eventsActions.listEvents(this.props.query + query)
  }

  renderRow(event, sectionId, rowId) {
    let isReview = (this.state.selectedIndex !== 0)

    return (
      <View style={styles.detail.section}>
        <View style={{flexDirection: 'row', paddingTop: 14}}>
          <TouchableOpacity onPress={() => this.eventPage(event._id)}>
            <TextView
              style={{flex: 1, fontWeight: '400', marginBottom: 5, paddingHorizontal: 15}}
              fontSize={'XL'}
              textColor={Graphics.textColors.link}
              text={event.title}
            />
          </TouchableOpacity>
          <TextView
            style={{flex: 1, marginBottom: 5, paddingHorizontal: 15, textAlign: 'right'}}
            fontSize={'XL'}
            text={LANG.l('currencty', event.total)}
          />
        </View>
        <View style={styles.editor.group}>
        {
          event.groups.map((group, index) => {
            const dates = UTIL.formatEventGroupLabel(event, index)
            return (
              <EditLink
                key={index}
                label={dates}
                value={group.signUps.length} 
                onPress={() => this._signUpList(event, index, isReview)}
              />
            )
          })
        }
        </View>
      </View>
    )
  }

  render() {
    const {events} = this.props

    if (!events) {
      return <Loading />
    }

    return (
      <View style={styles.global.main}>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <SegmentedControlIOS
            values={[
              LANG.t('mine.events.ApprovedEvents'),
              LANG.t('mine.events.UnapprovedEvents')
            ]}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => this._toggleList(event.nativeEvent.selectedSegmentIndex)}
            style={{marginHorizontal: 15, marginBottom: 15}}
          />
        </View>
        <ScrollView>
          <ListView
            enableEmptySections={true}
            scrollEnabled={false}
            dataSource={this.dataSource.cloneWithRows(events)}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View>
    )
  }
}

MyEvents.propTypes = {
  navigator: PropTypes.object.isRequired,
  eventsActions: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  events: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    events: state.events.list,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents)
