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
  Image,
  SegmentedControlIOS,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import ListEditor from '../shared/ListEditor'
import Gear from '../shared/Gear'
import styles from '../../styles/main'

class EditEventGears extends Component {
  constructor(props) {
    super(props)
    this.selectGear = this.selectGear.bind(this)

    this.state = {
      selectedIndex: 0,
      images: this.props.images,
      tags: this.props.tags,
      notes: this.props.notes
    }
  }

  selectGear(value) {
    let gears = this.state.images

    if (gears.indexOf(value) < 0) {
      gears.push(value)
    } else {
      gears.splice(gears.indexOf(value), 1)
    }

    this.setState({
      images: gears
    })
  }

  componentWillUnmount() {
    this.props.newEventActions.setEventGears({
      images: this.state.images,
      tags: this.state.tags,
      notes: this.state.notes
    })
  }

  render() {
    var mainView = null,
    props = this.props,
    selectGear = this.selectGear,
    stateImages = this.state.images

    switch (this.state.selectedIndex) {
      case 0:
        mainView = (
          <View style={styles.detail.grid}>
          {
            AppSettings.gearList.map(function(value, index) {
              return (
                <TouchableOpacity key={index} onPress={() => selectGear(value)}>
                  <Gear number={value} selected={(stateImages.indexOf(value) > -1)} />
                </TouchableOpacity>
              )
            })
          }
          </View>
        )
        break

      case 1:
        mainView = (
          <ListEditor key='gearTags' list={this.state.tags} />
        )
      break

      case 2:
        mainView = (
          <ListEditor key='gearNotes' list={this.state.notes} />
        )
      break
    }

    return (
      <View style={styles.global.wrapper}>
        <View style={styles.editor.scroll}>
          <SegmentedControlIOS
            values={[Lang.SelectGear, Lang.OtherGears, Lang.GearNotes]}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex})
            }}
            style={{marginHorizontal: 15, marginBottom: 15}}
          />
          <View style={{flex: 1}}>
            {mainView}
          </View>
        </View>
      </View>
    )
  }
}

EditEventGears.propTypes = {
  images: PropTypes.array.isRequired,
  tags: PropTypes.array,
  notes: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    images: state.newEvent.gears.images,
    tags: state.newEvent.gears.tags,
    notes: state.newEvent.gears.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventGears)
