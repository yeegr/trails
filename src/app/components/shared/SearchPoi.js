'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  ListView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import MapView from 'react-native-maps'
import CallToAction from './CallToAction'
import {setRegion, hex2rgb} from '../../../util/common'

import Icon from './Icon'
import Loading from './Loading'
import NavbarButton from './NavbarButton'

class SearchPoi extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.selectPoi = this.selectPoi.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    let initPoi = {
      latitude: 39.986127,
      longitude: 116.26193,
      altitude: 1,
    }

    this.state = {
      region: setRegion(initPoi, ASPECT_RATIO),
      keywords: '',
      isFetching: false,
      poiList: null,
      selectedPoi: null
    }
  }

  onConfirm() {
    this.props.onConfirm(this.state.selectedPoi)
    this.props.onCancel()
  }

  onCancel() {
    this.props.onCancel()
  }

  submit() {
    this.setState({
      isFetching: true,
      poiList: null,
      selectedPoi: null
    })

    const url = 'http://restapi.amap.com/v3/place/text?key=' + AppSettings.sdks.amap + '&city=010&offset=10&page=1&extensions=all&keywords=' + this.state.keywords

    fetch(url)
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        poiList: response.pois
      })
    })
    .catch((error) => {
      console.warn(error)
    })
  }

  selectPoi(data, index) {
    const coord = data.location.split(','),
    poi = {
      name: data.name,
      city: data.citycode,
      address: data.adname + data.address,
      latitude: parseFloat(coord[1]),
      longitude: parseFloat(coord[0]),
      altitude: parseFloat(coord[2]) || 0
    }

    this.setState({
      keywords: poi.name,
      selectedPoi: poi,
      selectedIndex: index,
      region: setRegion(poi, ASPECT_RATIO)
    })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={() => this.selectPoi(rowData, rowId)}>
        <View key={rowId} style={[styles.searchResult, (this.state.selectedIndex === rowId) ? styles.selectedItem : null]}>
          <View style={global.corner}>
            <Text style={[styles.title, styles.index]}>{(parseInt(rowId) + 1).toString()}.</Text>
          </View>
          <View>
            <Text style={styles.title}>{rowData.name}</Text>
            <Text style={styles.subtitle}>{rowData.cityname + rowData.adname + rowData.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let list = null,
      marker = null,
      actionBar = null

    if (this.state.isFetching) {
      list = <Loading />

      if (this.state.poiList) {
        list = (
          <ListView
            enableEmptySections={true}
            scrollEnabled={true}
            style={{flex: 1}}
            dataSource={this.dataSource.cloneWithRows(this.state.poiList)}
            renderRow={this.renderRow}
          />
        )

        actionBar = (
          <CallToAction 
            onPress={this.onConfirm} 
            label={Lang.Confirm} 
            backgroundColor={Graphics.colors.primary}
            disabled={(this.state.selectedPoi === null)}
          />
        )
      }
    }

    if (this.state.selectedPoi) {
      marker = (
        <MapView.Marker
          coordinate={this.state.selectedPoi}
          title={this.state.selectedPoi.name}
          description={this.state.selectedPoi.address}
        />        
      )
    }

    return (
      <Modal animationType={'slide'} transparent={false} visible={this.props.showPicker}>
        <View style={styles.wrapper}>
          <View style={styles.titleBar}>
            <NavbarButton
              onPress={this.onCancel}
              icon={Graphics.titlebar.prev}
              label={Lang.Cancel}
              showLabel={false}
            />
            <View style={styles.searchBar}>
              <TextInput
                autoCorrect={false}
                autoFocus={true}
                blurOnSubmit={true}
                maxLength={100}
                placeholder={Lang.SearchPoiPlaceholder}
                returnKeyType="search"
                style={styles.searchInput}
                value={this.state.keywords}
                onChangeText={(keywords) => this.setState({keywords})}
                onSubmitEditing={(event) => this.submit()}
              />
              <TouchableOpacity onPress={() => this.setState({keywords: ''})}>
                <Icon
                  backgroundColor={Graphics.colors.transparent}
                  fillColor={Graphics.colors.lightGray}
                  sideLength={24}
                  type={'cancel'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <MapView
              style={styles.map}
              mapType="satellite"
              showsCompass={true}
              showsScale={true}
              showsBuildings={false}
              showsTraffic={false}
              zoomEnabled={true}
              rotateEnabled={true}
              pitchEnabled={true}
              scrollEnabled={true}
              region={this.state.region}
              onRegionChange={(region) => this.setState({region})}
            >
            {marker}
            </MapView>
            {list}
            {actionBar}
          </View>
        </View>
      </Modal>
    )
  }
}

SearchPoi.propTypes = {
  showPicker: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

const {height, width} = Dimensions.get('window'),
ASPECT_RATIO = width / height,
styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: height,
    width: width
  },
  titleBar: {
    backgroundColor: Graphics.colors.primary,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 30
  },
  content: {
    flex: 1
  },
  map: {
    flex: 1
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: Graphics.colors.border,
    borderRadius: 3,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    height: 30,
    marginRight: 10
  },
  searchResult: {
    borderBottomColor: Graphics.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  selectedItem: {
    backgroundColor: hex2rgb(Graphics.colors.primary, .5)
  },
  list: {
    flex: 0,
    marginRight: 5,
    width: 25
  },
  index: {
    flex: 1,
    flexWrap: 'nowrap',
    textAlign: 'right',
  },
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4
  },
})

export default SearchPoi