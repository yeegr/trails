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
import * as loginActions from '../redux/actions/loginActions'

import {
  LANG,
  UTIL
} from '../settings'

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
    return (
      <nav>
        <toolbar>
          <button id="menuBtn" onClick={this._showMenu}>
            轨迹
          </button>
          <menu style={{display: this.state.showMenu}}>
            <nav>
              <toolbar></toolbar>
              <title>菜单</title>
              <toolbar>
                <button onClick={this._hideMenu}>
                  关闭
                </button>
              </toolbar>              
            </nav>
            <ul>
              <li>
                <Link to={'/areas'}>
                  {LANG.t('trail.trail_plural')}
                </Link>
                <Link to={'/events'}>
                  {LANG.t('event.event_plural')}
                </Link>
                <Link to={'/posts'}>
                  {LANG.t('post.post_plural')}
                </Link>
              </li>
            </ul>
          </menu>
        </toolbar>
        <title>
          page title
        </title>
        <toolbar>
          <button onClick={this.props.loginActions.showLogin}>
            登录/注册
          </button>
        </toolbar>
      </nav>    
    )
  }
}

Nav.propTypes = {
  loginActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
