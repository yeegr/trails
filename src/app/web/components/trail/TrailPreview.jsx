'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

import Header from '../shared/Header'
import TrailList from './TrailList'

const TrailPreview = (props) => {
  const {query, trails} = props,
    previews = trails.slice(0, AppSettings.maxTrailPreviewsPerArea),
    more = (trails.length > AppSettings.maxTrailPreviewsPerArea) ? {
      text: LANG.t('area.MoreTrails'),
      path: 'trails/' + query,
      data: trails
    } : null

  return (
    <section>
      <Header
        text={props.title || LANG.t('area.RecommandedTrails')}
        more={more}
      />
      <TrailList
        trails={previews}
            query={props.query}
      />
    </section>
  )
}

TrailPreview.propTypes = {
  trails: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  query: PropTypes.string,
}

export default TrailPreview