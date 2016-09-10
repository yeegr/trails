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
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import ImagePicker from 'react-native-image-picker'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../redux/actions/newEventActions'

import ImagePath from '../shared/ImagePath'

class EditEventHero extends Component {
  constructor(props) {
    super(props)
    this.selectPhoto = this.selectPhoto.bind(this)

    this.state = {
      imageUri: (this.props.heroUri.substring(0, 1) === '/') ? this.props.heroUri : ImagePath({type: 'background', path: this.props.heroUri})
    }
  }

  componentWillUnmount() {
    var path

    if (this.state.imageUri.substring(0, 4) === 'http') {
      let arr = this.state.imageUri.split('&')

      arr.map((tmp) => {
        if (tmp.substring(0, 5) === 'path=') {
          path = tmp.substring(5)
        }
      })
    } else {
      path = this.state.imageUri
    }

    if (path !== this.props.heroUri) {
      this.props.newEventActions.setEventHero(path)
    }
  }

  selectPhoto() {
    var options = {
      title: Lang.SelectPhoto,
      storageOptions: { 
        skipBackup: true, 
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        const source = null

        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        console.log(source)

        this.setState({
          imageUri: source.uri
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.selectPhoto()}>
          <Image style={styles.image} source={{uri: this.state.imageUri}} />
        </TouchableOpacity>
      </View>
    )
  }
}

const {height, width} = Dimensions.get('window'),
styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    height: width * .75,
    width: width,
  }
})

function mapStateToProps(state, ownProps) {
  return {
    heroUri: state.newEvent.hero
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventHero)
