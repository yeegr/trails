'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import ParallaxView from 'react-native-parallax-view'

import moment from 'moment'

import Card from '../shared/Card'
import EditLink from '../shared/EditLink'
import ImagePath from '../shared/ImagePath'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../../../common/__'

class EventManager extends Component {
  constructor(props) {
    super(props)

    this._nextPage = this._nextPage.bind(this)
  }

  _nextPage(type) {
    let id = null,
      title = null,
      passProps = {}

    switch (type) {
      case 'signups':
        id = 'SignUpList',
        title = LANG.t('mine.SignUpList'),
        passProps = {
          event: this.props.event
        }
      break

      case 'review':
        id = 'EventDetail',
        title = LANG.t('event.EventDetail'),
        passProps = {
          id: this.props.event._id,
          isReview: true
        }
      break

      case 'equipment':
        id = 'Upcoming',
        title = LANG.t('mine.EquipmentRental'),
        passProps = {
          id: this.props.event._id,
          isReview: true
        }
      break

      case 'transportation':
        id = 'Upcoming',
        title = LANG.t('mine.Transportation'),
        passProps = {
          id: this.props.event._id,
          isReview: true
        }
      break
    }

    if (id !== null && title !== null) {
      this.props.navigator.push({
        id,
        title,
        passProps
      })
    }
  }

  render() {
    const {event} = this.props,
      uri = ImagePath({type: 'background', path: UTIL.getEventHeroPath(event)})

    return (
      <View style={styles.global.wrapper}>
        <ParallaxView
          backgroundSource={{uri}}
          windowHeight={Graphics.heroImage.height}
          header={(
            <Card
              align={'bottom'}
              title={event.title}
              excerpt={event.excerpt}
            />
          )}>
          <View style={styles.detail.article}>
            <TextView
              class={'h3'}
              text={LANG.t('mine.SignUpList')}
            />
            <View style={styles.editor.group}>
              {
                event.groups.map((group, index) => {
                  return (
                    <EditLink
                      key={index}
                      label={moment(group.startDate).format('LL')}
                      value={group.signUps.length.toString()}
                      onPress={() => this._nextPage('signups')}
                    />
                  )
                })
              }
            </View>
            <View style={styles.editor.group}>
              <EditLink
                label={LANG.t('mine.EquipmentRental')}
                onPress={() => this._nextPage('equipment')}
              />
              <EditLink
                label={LANG.t('mine.Transportation')}
                onPress={() => this._nextPage('transportation')}
              />
              <EditLink
                label={LANG.t('event.EventDetail')}
                onPress={() => this._nextPage('review')}
              />
            </View>
          </View>
        </ParallaxView>
      </View>
    )
  }
}

EventManager.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
}

export default EventManager
