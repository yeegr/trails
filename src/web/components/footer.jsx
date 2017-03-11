'use strict'

import React, {
  PropTypes
} from 'react'

import {
  LANG
} from '../settings'

const Footer = (props) => {
  return (
    <footer>
      <div>
        <a target="_blank" href="http://www.miibeian.gov.cn/">
          {LANG.t('info.icp')}
        </a>
      </div>
      <div id="copyright">
        <span>
          {LANG.t('info.copyright')}
        </span>
      </div>
    </footer>    
  )
}

Footer.propTypes = {

}

export default Footer