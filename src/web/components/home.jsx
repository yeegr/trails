'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showLogin} from '../redux/actions/loginActions'

import LOGO from '../../../assets/AppIcon/512_transparent.png'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <img 
          src={LOGO}
          style={{width: '100%'}}
        />
        <div style={{width: '100%', textAlign: 'center', fontSize: '2em', marginTop: '1em'}}>
          即将开通，敬请期待
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  showLogin: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLogin: bindActionCreators(showLogin, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)