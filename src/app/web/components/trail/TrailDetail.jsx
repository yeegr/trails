'user strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import $ from 'jquery'

import TrailInfo from './TrailInfo'
import TrailData from './TrailData'
import TrailMap from './TrailMap'
import TrailChart from './TrailChart'
import UserLink from '../user/UserLink'
import Header from '../shared/Header'
import GalleryPreview from '../shared/GalleryPreview'
import CommentPreview from '../shared/CommentPreview'

import {
  LANG,
  UTIL,
  AppSettings
} from '../../settings'

class TrailDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    $.get(AppSettings.apiUri + 'trails/' + this.props.routeParams.id, (trail) => {
      this.setState({
        trail,
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

    const {trail} = this.state,
      galleryPreview = (trail.photos.length > 0) ? (
        <GalleryPreview
          title={LANG.t('trail.Photos')}
          type={'trails'}
          id={trail._id}
          photos={trail.photos}
        />
      ) : null,
      commentPreview = (trail.comments.length > -1) ? (
        <CommentPreview
          type={'trails'}
          id={trail._id}
          comments={trail.comments}
        />
      ) : null

    return (
      <detail>
        <main>
          <section>
            <list>
              <TrailInfo 
                type={trail.type}
                title={trail.title}
                date={trail.date}
              />
            </list>
          </section>
          <section>
            <TrailData
              difficultyLevel={trail.difficultyLevel}
              totalDuration={trail.totalDuration}
              totalDistance={trail.totalDistance}
              totalElevation={trail.totalElevation}
              maximumAltitude={trail.maximumAltitude}
              averageSpeed={trail.averageSpeed}
            />
          </section>
          <section>
            <TrailMap
              id={trail._id}
              points={trail.points}
            />
          </section>
          <section>
            <list>
              <TrailChart
                points={trail.points}
              />
            </list>
          </section>
          <section>
            <list>
              <UserLink
                user={trail.creator}
              />
            </list>
          </section>
          <section>
            <Header text={LANG.t('trail.TrailDescription')} />
            <div
              className="html-content"
              dangerouslySetInnerHTML={UTIL.createMarkup(trail.description)}
            />
          </section>
          {galleryPreview}
          {commentPreview}
        </main>
      </detail>
    )
  }
}

TrailDetail.propTypes = {
  id: PropTypes.string
}

export default TrailDetail