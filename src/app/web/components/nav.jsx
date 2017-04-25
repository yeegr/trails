'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Link
} from 'react-router'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../redux/actions/userActions'

import {
  LANG,
  UTIL
} from '../../../common/__'

class Nav extends Component {
  constructor(props) {
    super(props)
    this._showMenu = this._showMenu.bind(this)
    this._hideMenu = this._hideMenu.bind(this)

    window.addEventListener('resize', () => {
      this._toggleMenu()
    })

    window.addEventListener('orientationchange', () => {
      this._toggleMenu()
    })

    this.state = {
      showMenu: (UTIL.getScreenOrientation() === 'portrait') ? 'none' : 'block'
    }
  }

  _toggleMenu() {
    let showMenu = (UTIL.getScreenOrientation() === 'portrait') ? 'none' : 'block'
    this.setState({showMenu})
  }

  _showMenu() {
    if (UTIL.getScreenOrientation() === 'portrait') {
      this.setState({showMenu: 'block'})
    }
  }

  _hideMenu() {
    if (UTIL.getScreenOrientation() === 'portrait') {
      this.setState({showMenu: 'none'})
    }
  }

  render() {
    let loginButton = (this.props.user) ? (
      <Link to={'/'}>
        {LANG.t('navbar.menu.Mine')}
      </Link>
    ) : (
      <button onClick={this.props.userActions.showLogin}>
        {LANG.t('navbar.menu.LoginSignup')}
      </button>
    )

    return (
      <nav>
        <toolbar>
          <button id="menuBtn" onClick={this._showMenu}>
            {LANG.t('navbar.menu.Menu')}
          </button>
          <menu style={{display: this.state.showMenu}}>
            <nav>
              <toolbar />
              <title>{LANG.t('navbar.menu.Menu')}</title>
              <toolbar>
                <button onClick={this._hideMenu}>
                  {LANG.t('navbar.menu.Close')}
                </button>
              </toolbar>              
            </nav>
            <ul>
              <li>
                <Link to={'/'} onClick={this._hideMenu}>
                  {LANG.t('navbar.menu.Home')}
                </Link>
                <Link to={'/areas'} onClick={this._hideMenu}>
                  {LANG.t('trail.trail_plural')}
                </Link>
                <Link to={'/events'} onClick={this._hideMenu}>
                  {LANG.t('event.event_plural')}
                </Link>
                <Link to={'/posts'} onClick={this._hideMenu}>
                  {LANG.t('post.post_plural')}
                </Link>
                <Link to={'/about'} onClick={this._hideMenu}>
                  {LANG.t('navbar.menu.AboutUs')}
                </Link>
              </li>
            </ul>
          </menu>
        </toolbar>
        <title>
          {LANG.t('info.shitulv')}
        </title>
        <toolbar>
          {loginButton}
        </toolbar>
      </nav>    
    )
  }
}

Nav.propTypes = {
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
