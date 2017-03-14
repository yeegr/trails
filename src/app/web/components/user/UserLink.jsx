'use strict'

import React, {
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import Avatar from '../shared/Avatar'

import {
  LANG
} from '../../../../common/__'

const UserLink = (props) => {
  const {user} = props

  return (
    <Link className="user-link" to={`user/${user._id}`}>
      <row>
        <Avatar user={user} />
        <content>
          <pretitle>{LANG.t('user.levels.' + parseInt(user.level).toString())}</pretitle>
          <title>{user.handle}</title>
        </content>
      </row>
    </Link>
  )
}

UserLink.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserLink