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

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginActions from '../../containers/actions/loginActions'

class EditUserAvatar extends Component {
  constructor(props) {
    super(props)
    this.selectPhoto = this.selectPhoto.bind(this)

    this.state = {
      initSourceUri: AppSettings.assetUri + 'users/' + this.props.user.avatar,
      avatarSource: {uri: AppSettings.assetUri + 'users/' + this.props.user.avatar}
    }
  }

  componentWillUnmount() {
    if (this.state.avatarSource.uri !== this.state.initSourceUri) {
      this.props.loginActions.updateUserAvatar(this.props.user.id, this.state.avatarSource.uri)
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
        // You can display the image using either data...
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        console.log(response)

        // or a reference to the platform specific asset location
        const source = null

        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.selectPhoto()}>
          <Image style={styles.image} source={this.state.avatarSource} />
        </TouchableOpacity>
      </View>
    )
  }
}

const {height, width} = Dimensions.get('window'),
  sideLength = Math.min(height, width),
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
      height: sideLength,
      width: sideLength,
    }
  })

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAvatar)
