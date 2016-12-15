'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newTrailActions from '../../redux/actions/newTrailActions'

import Icon from '../shared/Icon'
import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'
import TextView from '../shared/TextView'

import {
  CONSTANTS,
  AppSettings,
  Graphics
} from '../../settings'

class SelectTrailAreas extends Component {
  constructor(props) {
    super(props)
    this._selectArea = this._selectArea.bind(this)

    this.state = {
      selectedAreaIds: this.props.selectedAreaIds,
      selectedAreaNames: this.props.selectedAreaNames
    }
  }

  componentWillUnmount() {
    this.props.newTrailActions.setTrailAreas(this.state.selectedAreaIds, this.state.selectedAreaNames)
  }

  _selectArea(area) {
    let selectedAreaIds = this.state.selectedAreaIds.splice(0),
      selectedAreaNames = this.state.selectedAreaNames.splice(0),
      index = selectedAreaIds.indexOf(area._id)

    if (index > -1) {
      selectedAreaIds.splice(index, 1)
      selectedAreaNames.splice(index, 1)
    } else {
      if (selectedAreaIds.length < AppSettings.maxNumberOfAreasPerTrail) {
        selectedAreaIds.push(area._id)
        selectedAreaNames.push(area.name)
      }
    }

    this.setState({selectedAreaIds, selectedAreaNames})
  }

  render() {
    const {allAreas} = this.props,
      {selectedAreaIds} = this.state

    if (allAreas.length < 1) {
      return <Loading />
    }

    let marker = (
      <View style={{position: 'absolute', right: 5, top: 5}}>
        <Icon
          sideLength={24}
          type={'checkmark'}
        />
      </View>
    )

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.grid}>
        {
          allAreas.map((area, index) => {
            const url = ImagePath({type: 'hero', path: CONSTANTS.ASSET_FOLDERS.AREA + '/' + area.id + '/' + area.hero})

            return (
              <TouchableOpacity key={index} onPress={() => this._selectArea(area)}>
                <Image
                  style={styles.image}
                  source={{uri: url}}
                >
                  <View style={{backgroundColor: 'rgba(0,0,0,.5)', flex: 1}}>
                    {(selectedAreaIds.indexOf(area._id) > -1) ? marker : null}
                    <TextView
                      style={{paddingHorizontal: 20, position:'absolute', textAlign: 'center', top: 50, width: imageWidth}}
                      fontSize={'L'}
                      textColor={Graphics.textColors.overlay}
                      text={area.name}
                    />
                  </View>
                </Image>
              </TouchableOpacity>
            )
          })
        }
        </View>
      </ScrollView>
    )
  }
}

const {width} = Dimensions.get('window'),
  margin = 15,
  numberPerRow = 2,
  imageWidth = Math.round((width - margin * (numberPerRow + 1)) / numberPerRow),
  imageHeight = Math.round(imageWidth * 2 / 3),
  styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: Graphics.page.marginTop + margin
    },
    grid: {
      alignItems: 'flex-start',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    image: {
      flexDirection: 'column',
      height: imageHeight,
      justifyContent: 'flex-end',
      marginBottom: margin,
      width: imageWidth
    }
  })

SelectTrailAreas.propTypes = {
  navigator: PropTypes.object.isRequired,
  newTrailActions: PropTypes.object.isRequired,
  allAreas: PropTypes.array.isRequired,
  selectedAreaIds: PropTypes.array.isRequired,
  selectedAreaNames: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    selectedAreaIds: state.newTrail.areas,
    selectedAreaNames: state.newTrail.areaNames
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTrailAreas)