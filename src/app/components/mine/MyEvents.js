'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Image,
  ListView,
  SegmentedControlIOS,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import moment from 'moment'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../redux/actions/eventsActions'
import * as newEventActions from '../../redux/actions/newEventActions'

import ImagePath from '../shared/ImagePath'
import InfoItem from '../shared/InfoItem'
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
    this._nextPage = this._nextPage.bind(this)

    this.state = {
      selectedIndex: 0
    }
  }

  componentWillMount() {
    this._toggleList(this.state.selectedIndex)
  }

  _nextPage(event) {
    let id = 'EventManager',
      title = event.title,
      passProps = {
        event
      }

    if (event.status === 'editing') {
      this.props.newEventActions.editEvent(event)

      id = 'EditEvent',
      title = LANG.t('event.EditEvent')
    }

    this.props.navigator.push({
      id,
      title,
      passProps
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
    let totalSignUps = 0

    event.groups.map((group) => {
      totalSignUps += group.signUps.length
    })

    const infoStyles = {
        wrapper: {
          height: 22,
          paddingLeft: 0,
          paddingVertical: 0
        }
      },
      heroUri = ImagePath({type: 'thumb', path: UTIL.getEventHeroPath(event)}),
      eventDates = (event.groups.length > 1) ? (
        LANG.t('event.EventGroups', {count: event.groups.length})
      ) : (
        moment(event.groups[0]).format('ll') + ' ' + UTIL.formatMinutes(event.gatherTime)
      ),
      
      sub = (event.status === 'editing') ? (
        <View>
          <InfoItem
            labelWidth={75}
            styles={infoStyles}
            label={LANG.t('event.EventDates')}
            value={eventDates}
          />
          <InfoItem
            labelWidth={75}
            styles={infoStyles}
            label={LANG.t('event.FeePerHead')}
            value={LANG.l('currency', event.expenses.perHead)}
          />
        </View>
      ) : (
        <View>
          <InfoItem
            labelWidth={75}
            styles={infoStyles}
            label={LANG.t('event.SignUpCount')}
            value={LANG.t('event.numberOfPeopleAlreadySignedUp', {count: totalSignUps})}
          />
          <InfoItem
            labelWidth={75}
            styles={infoStyles}
            label={LANG.t('event.EventIncome')}
            value={LANG.l('currency', event.total)}
          />
        </View>
      )

    return (
      <TouchableOpacity key={rowId} onPress={() => this._nextPage(event)}>
        <View style={[styles.list.item, styles.list.borders]}>
          <Image
            style={styles.list.thumb}
            source={{uri: heroUri}}
          />
          <View style={styles.list.content}>
            <View style={[styles.list.title, {marginBottom: 5}]}>
              <TextView
                style={{fontWeight: '400', marginBottom: 2}}
                fontSize={'L'}
                text={event.title} 
              />
              <TextView
                fontSize={'SML'}
                textColor={Graphics.textColors.endnote}
                text={event.excerpt}
              />
              <TextView
                fontSize={'SML'}
                textColor={Graphics.textColors.endnote}
                text={'# ' + event.tags.join(', ')}
              />
            </View>
            {sub}
          </View>
        </View>
      </TouchableOpacity>
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
              LANG.t('mine.events.SubmittedEvents'),
              LANG.t('mine.events.EditingEvents')
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
  newEventActions: PropTypes.object.isRequired,
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
    eventsActions: bindActionCreators(eventsActions, dispatch),
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents)
