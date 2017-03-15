'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../../redux/actions/newEventActions'

import Gear from '../shared/Gear'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  AppSettings,
  Graphics
} from '../../../../common/__'

class EditGearImages extends Component {
  constructor(props) {
    super(props)
    this._select = this._select.bind(this)
    this._remove = this._remove.bind(this)

    this.state = {
      selected: this.props.images
    }
  }

  componentWillUnmount() {
    this.props.newEventActions.setGearImages(this.state.selected)
  }

  _select(value) {
    let selected = this.state.selected.splice(0)

    if (selected.indexOf(value) < 0) {
      selected.push(value)
    }

    this.setState({selected})
  }

  _remove(value) {
    let selected = this.state.selected.splice(0)

    if (selected.indexOf(value) > -1) {
      selected.splice(selected.indexOf(value), 1)
    }

    this.setState({selected})
  }

  render() {
    const {selected} = this.state,
      margin = 15,
      sideLength = UTIL.calculateGridLength(AppSettings.device.width, 5, margin)

    return (
      <View style={styles.editor.list}>
        <View style={styles.editor.section}>
          <View style={styles.editor.separator}>
            <TextView
              textColor={Graphics.textColors.overlay}
              text={LANG.t('event.edit.SelectedGears')}
            />
          </View>
          <View style={styles.detail.grid}>
          {
            selected.map((value, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => this._remove(value)}>
                  <Gear
                    number={value}
                    sideLength={sideLength}
                    margin={margin}
                  />
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>
        <View style={styles.editor.section}>
          <View style={styles.editor.separator}>
            <TextView
              textColor={Graphics.textColors.overlay}
              text={LANG.t('event.edit.RemainingGears')}
            />
          </View>
          <ScrollView>
            <View style={styles.detail.grid}>
            {
              AppSettings.gearList.map((value, index) => {
                return (selected.indexOf(value) < 0) ? (
                  <TouchableOpacity key={index} onPress={() => this._select(value)}>
                    <Gear
                      number={value}
                      sideLength={sideLength}
                      margin={margin}
                    />
                  </TouchableOpacity>
                ) : null
              })
            }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

EditGearImages.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    images: state.newEvent.gears.images
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGearImages)
