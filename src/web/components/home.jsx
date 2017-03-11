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
      <detail style={{backgroundImage: `url(${BACKGROUND})`, justifyContent: 'center'}}>
        <div style={{padding: '3rem', textAlign: 'center'}}>
          <img 
            src={LOGO}
            style={{width: '50%'}}
          />
          <div style={{textAlign: 'center', fontWeight: 'normal', marginTop: '1em', color: 'white'}}>
            <p>北京毅跑信息技术有限公司（以下简称为北京毅跑）致力于户外出行服务的互联网工具的开发，针对户外出行服务的刚性需求，综合运用GPS和北斗定位、大数据和SaaS等互联网技术手段，为户外出行领域的供应商和服务商构建相应场景，整合运营商业资源，提供技术和支付服务。</p>
            <p>北京毅跑开发的手机APP“识途”已经过上线测试，拥有轨迹、活动等多项功能，其中注册用户已经将自己的姓名、身份证号码、电话号码、户外经验等在注册时做了登记，为今后的投保录入个人信息提供了方便条件；轨迹运用于户外出行的路线记录和使用，影响保险定价的路线难度系数有明确载明，便于调用；活动版块记录了参与活动的投保人数、领队、日期、天气、交通工具等，为保险价格的计算直接提供了数据基础。</p>
            <p>北京毅跑由资深的户外玩家、知名的户外领队联合地理信息、保险、IT人士跨界组成，在户外圈拥有较高的知名度和影响力，这次户外出行服务工具的开发，基于领队组织户外旅行的基本需求，解决的每一个问题都是户外领队组织活动的痛点所在，已经受到绿野、磨房、三夫等国内主要户外机构的关注，结合这次全新保险产品的上线销售，将受到市场的狂热追捧。</p>
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