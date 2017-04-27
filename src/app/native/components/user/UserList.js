'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  StyleSheet,
  View
} from 'react-native'

import Loading from '../shared/Loading'
import UserLink from './UserLink'

import {
  AppSettings
} from '../../../../common/__'

class UserList extends Component {
  constructor(props) {
    super(props)
    this._fetch = this._fetch.bind(this)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      loading: true,
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillMount() {
    if (this.props.data) {
      this.setState({
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows(this.props.data)
      })
    } else {
      this._fetch()
    }
  }

  _fetch() {
    fetch(AppSettings.apiUri + 'users/' + this.props.query)
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows(res)
      })
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View key={rowId} style={styles.row}>
        <UserLink 
          key={rowId} 
          navigator={this.props.navigator} 
          user={rowData}
        />
      </View>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }

    return (
      <ListView
        enableEmptySections={true}
        scrollEnabled={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})

UserList.propTypes = {
  navigator: PropTypes.object.isRequired,
  data: PropTypes.array,
  query: PropTypes.string
}

export default UserList
