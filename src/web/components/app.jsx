'use strict'  

import React, {
  Component
} from 'react'

class App extends Component {
  constructor(props) {
    super(props)  
  }
  
  render() {
    return (
      <app>
        <page>
        {
          this.props.children
        }
        </page>
      </app>
    )
  }
}

export default App
