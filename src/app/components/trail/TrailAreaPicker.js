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

import Loading from '../shared/Loading'
import ImagePath from '../shared/ImagePath'
import TextView from '../shared/TextView'
import {AppSettings, Graphics} from '../../settings'
import {ASSET_FOLDERS} from '../../../util/constants'

class TrailAreaPicker extends Component {
  constructor(props) {
    super(props)
    this._listAreas = this._listAreas.bind(this)
    this._selectArea = this._selectArea.bind(this)

    this.state = {
      areas: []
    }
  }

  _selectArea(id, name) {
    this.props.newTrailActions.setTrailAreas([id], [name])
    this.props.navigator.pop(0)
  }

  _listAreas(city) {
    fetch(AppSettings.apiUri + 'areas/?type=compact&city=' + city)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.error) {
        console.log(err)
      } else {
        this.setState({
          areas: res
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentWillMount() {
    this._listAreas(this.props.city)
  }

  render() {
    const {areas} = this.state

    if (areas.length < 1) {
      return <Loading />
    }

    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.grid}>
        {
          areas.map((area, index) => {
            const url = ImagePath({type: 'hero', path: ASSET_FOLDERS.Area + '/' + area.id + '/' + area.hero})

            return (
              <TouchableOpacity key={index} onPress={() => this._selectArea(area._id, area.name)}>
                <Image
                  style={styles.image}
                  source={{uri: url}}
                >
                  <TextView
                    style={{backgroundColor: 'rgba(0,0,0,.5)', flex: 1, lineHeight: imageHeight / 2 + 10, textAlign: 'center'}}
                    fontSize='L'
                    textColor={Graphics.textColors.overlay}
                    text={area.name}
                  />
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

const {width, height} = Dimensions.get('window'),
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

TrailAreaPicker.propTypes = {
  city: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    areas: state.newTrail.areas
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTrailActions: bindActionCreators(newTrailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailAreaPicker)