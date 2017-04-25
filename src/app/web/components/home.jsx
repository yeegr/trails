'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showLogin} from '../../redux/actions/userActions'

import QR_iPhone from '../../../../assets/qr_code-iPhone.png'
import BACKGROUND from '../../../../assets/Heroes/007.jpg'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <detail style={{backgroundImage: `url(${BACKGROUND})`, justifyContent: 'center'}}>
        <div style={{padding: '3rem', textAlign: 'center'}}>
          <div style={{textAlign: 'center', fontWeight: 'normal', marginTop: '1em', color: 'white'}}>
            <p>户外的保险，保险的户外</p>
          </div>
          <img 
            src={QR_iPhone}
            style={{maxWidth: '200px', width: '50%'}}
          />
          <div style={{textAlign: 'center', fontWeight: 'normal', marginTop: '1em', color: 'white'}}>
            <p>iPhone 测试版</p>
          </div>
        </div>
      </detail>
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