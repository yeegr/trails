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
    this.signupList = this.signupList.bind(this)
  }

  componentWillMount() {
    this.props.eventsActions.listEvents(this.props.query)
  }

  eventPage(id) {
    this.props.navigator.push({
      id: 'EventDetail',
      title: LANG.t('event.EventDetail'),
      passProps: {
        id
      }
    })
  }

  signupList(event, groupIndex) {
    this.props.navigator.push({
      id: 'SignUpList',
      title: LANG.t('mine.SignUpList'),
      passProps: {
        event,
        groupIndex
      }
    })
  }

  renderRow(event, sectionId, rowId) {
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
                onPress={() => this.signupList(event, index)}
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
      <ListView
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.dataSource.cloneWithRows(events)}
        renderRow={this.renderRow}
      />
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
