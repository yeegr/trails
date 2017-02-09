'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'
import moment from 'moment'

import Card from '../shared/Card'
import Hero from '../shared/Hero'
import Header from '../shared/Header'
import ListItem from '../shared/ListItem'
import UserLink from '../user/UserLink'
import SimpleContact from '../shared/SimpleContact'
import OrderedList from '../shared/OrderedList'
import TagList from '../shared/TagList'
import GearList from '../shared/GearList'
import TrailList from '../trail/TrailList'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import {
  CONSTANTS,
  LANG,
  UTIL,
  AppSettings
} from '../../settings'

class EventDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'events/' + this.props.routeParams.id, (event) => {
      this.setState({
        event,
        loading: false
      })
    })
  }

  render() {
    if (this.state.loading === true) {
      return (
        <detail data-loading />
      )
    }

    let query = this.state.event.schedule.map((agenda) => {
      return agenda.trail
    })

    const {event} = this.state,
      imagePath = (event.hero.indexOf('default/') === 0) ? event.hero : event._id + '/' + event.hero,
      imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath,
      eventGroups = (event.groups.length > 1) ? (
        <ListItem
          glyph={'calendar'}
          label={LANG.t('event.EventDates') + ' ' + LANG.t('event.EventGroups', {count: event.groups.length})}
          value={moment(event.groups[0].startDate).format('LL') + '-' + moment(event.groups[event.groups.length-1].startDate).format('LL')}
        />
      ) : null,
      gatherTime = UTIL.formatMinutes(event.gatherTime),
      gatherDateTime = (event.groups.length > 1) ? gatherTime : moment(event.groups[0]).format('ll') + gatherTime,
      eventTrails = (event.schedule.length > 0) ? (
        <section>
          <Header
            text={LANG.t('event.EventTrails')}
          />
          <div>
            <TrailList
              query={'?in=[' + query.toString() + ']'}
            />
          </div>
        </section>
      ) : null,
      perHead = event.expenses.perHead,
      expensesDetail = (event.expenses.detail && event.expenses.detail.length > 0) ? (
        <sub-section>
          <h4>{LANG.t('event.ExpensesDetails')}</h4>
          <div>
            <OrderedList
              content={event.expenses.detail}
            />
          </div>
        </sub-section>
      ) : null,
      expensesIncludes = (event.expenses.includes && event.expenses.includes.length > 0) ? (
        <sub-section>
          <h4>{LANG.t('event.ExpensesIncludes')}</h4>
          <div>
            <OrderedList
              content={event.expenses.includes}
            />
          </div>
        </sub-section>
      ) : null,
      expensesExcludes = (event.expenses.excludes && event.expenses.excludes.length > 0) ? (
        <sub-section>
          <h4>{LANG.t('event.ExpensesExcludes')}</h4>
          <div>
            <OrderedList
              content={event.expenses.excludes}
            />
          </div>
        </sub-section>
      ) : null,
      eventDestination = (event.destination && event.destination.length > 0) ? (
        <section>
          <Header
            text={LANG.t('event.DestinationDescription')}
          />
          <div className="html-content">
            {event.destination}
          </div>
        </section>
      ) : null,
      gearImages = (event.gears.images && event.gears.images.length > 0) ? (
        <sub-section>
          <GearList
            list={event.gears.images}
          />
        </sub-section>
      ) : null,
      otherGears = (event.gears.tags && event.gears.tags.length > 0) ? (
        <sub-section>
          <h4>{LANG.t('event.OtherGears')}</h4>
          <TagList
            tags={event.gears.tags}
            type={'pill'}
          />
        </sub-section>
      ) : null,
      gearNotes = (event.gears.notes && event.gears.notes.length > 0) ? (
        <sub-section>
          <h4>{LANG.t('event.GearNotes')}</h4>
          <OrderedList
            content={event.gears.notes}
          />
        </sub-section>
      ) : null,
      eventGears = (event.gears.images.length > 0 || event.gears.tags.length > 0 || event.gears.notes.length > 0) ? (
        <section style={{paddingRight: 0}}>
          <Header
            text={LANG.t('event.GearsToBring')}
          />
          {gearImages}
          {otherGears}
          {gearNotes}
        </section>
      ) : null,
      eventNotes = (event.notes && event.notes.length > 0) ? (
        <section>
          <Header
            text={LANG.t('event.EventNotes')}
          />
          <div>
            <OrderedList
              content={event.notes}
            />
          </div>
        </section>
      ) : null,
      galleryPreview = (event.photos.length > 0) ? (
        <GalleryPreview
          title={LANG.t('event.Photos')}
          type={'event'}
          id={event._id}
          photos={event.photos}
        />
      ) : null,
      commentPreview = (event.comments.length > -1) ? (
        <CommentPreview
          type={'event'}
          id={event._id}
          comments={event.comments}
        />
      ) : null

    return (
      <detail>
        <Hero
          imageUri={imageUri}
          card={
            <Card
              title={event.title}
              excerpt={event.excerpt}
              tags={event.tags}
            />
          }
        />
        <main>
          <section>
            <Header
              text={LANG.t('event.EventInfo')}
            />
            <div>
              {eventGroups}
              <ListItem
                glyph={'clock'}
                label={LANG.t('event.GatherTime')}
                value={gatherDateTime}
              />
              <ListItem
                glyph={'pin'}
                label={LANG.t('event.GatherLocation')}
                value={event.gatherLocation.name}
              />
              <UserLink
                user={event.creator}
              />
              <ListItem
                glyph={'phone'}
                label={LANG.t('event.Contacts')}
                value={
                  <div>
                    {
                      event.contacts.map((contact, index) => {
                        return (
                          <SimpleContact
                            key={index}
                            label={contact.title}
                            number={contact.mobileNumber}
                            fontSize={'1.2rem'}
                          />
                        )
                      })
                    }
                  </div>
                }
              />
              <ListItem
                glyph={'group'}
                label={LANG.t('event.AttendeeLimits')}
                value={LANG.t('event.Attendees', {min: event.minAttendee.toString(), max: event.maxAttendee.toString()})}
              />
            </div>
          </section>
          {eventTrails}
          <section>
            <Header
              text={LANG.t('event.EventExpenses')}
            />
            <div>
              <ListItem
                glyph="yuan"
                label={LANG.t('event.FeePerHead')}
                value={(perHead > 0) ? LANG.t('number.web', {amount: perHead}) : LANG.t('event.ExpenseFree')}
              />
              {(perHead > 0) ? expensesDetail : null}
              {(perHead > 0) ? expensesIncludes : null}
              {(perHead > 0) ? expensesExcludes : null}
            </div>
          </section>
          {eventDestination}
          {galleryPreview}
          {eventGears}
          {eventNotes}
          {commentPreview}
        </main>
        <button className="callToAction">
          {LANG.t('order.SignUpNow')}
        </button>
      </detail>
    )
  }
}

EventDetail.propTypes = {
  id: PropTypes.string
}

export default EventDetail