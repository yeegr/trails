'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  hashHistory
} from 'react-router'

import {connect} from 'react-redux'

import CallToAction from '../shared/CallToAction'
import Card from '../shared/Card'
import Hero from '../shared/Hero'
import EventGroup from './EventGroup'

import {
  CONSTANTS,
  LANG,
  UTIL
} from '../../../../common/__'

class SelectOrderGroup extends Component {
  constructor(props) {
    super(props)
    this._nextStep = this._nextStep.bind(this)

    this.state = {
      selectedGroup: null
    }
  }

  _nextStep() {
    if (this.state.selectedGroup !== null) {
      hashHistory.push(`events/${this.props.event._id}/${this.state.selectedGroup}/order`)
    }
  }

  render() {
    const {event} = this.props,
      imagePath = (event.hero.indexOf('default/') === 0) ? event.hero : event._id + '/' + event.hero,
      imageUri = CONSTANTS.ASSET_FOLDERS.EVENT + '/' + imagePath

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
            <selectables>
              {
                event.groups.map((group, index) => {
                  return (
                    <EventGroup 
                      key={index}
                      index={index}
                      selected={this.state.selectedGroup}
                      deadline={group.deadline}
                      label={UTIL.formatEventGroupLabel(event, index)}
                      signUps={LANG.t('event.numberOfPeopleAlreadySignedUp', {count: group.signUps.length})}
                      onPress={(selectedGroup) => this.setState({selectedGroup})}
                    />
                  )
                })
              }
            </selectables>
          </section>
        </main>
        <CallToAction
          disabled={(this.state.selectedGroup === null)}
          label={LANG.t('glossary.NextStep')}
          onPress={this._nextStep}
        />
      </detail>
    )
  }
}

SelectOrderGroup.propTypes = {
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    event: state.events.event
  }
}

export default connect(mapStateToProps)(SelectOrderGroup)
