'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showLogin} from '../redux/actions/loginActions'

import LOGO from '../../../assets/AppIcon/512_transparent.png'
import BACKGROUND from '../../../assets/Heroes/007.jpg'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${BACKGROUND})`, backgroundSize: 'cover', display: 'flex', height: '100%', justifyContent: 'center'}}>
        <div style={{width: '80%', marginTop: '20%', textAlign: 'center'}}>
          <img 
            src={LOGO}
            style={{width: '50%'}}
          />
          <div style={{width: '100%', textAlign: 'center', fontSize: '1.2em', marginTop: '1em', color: 'white'}}>
            即将开通，敬请期待
          </div>
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