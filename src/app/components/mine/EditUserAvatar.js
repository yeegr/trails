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
import * as loginActions from '../../redux/actions/loginActions'

import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'

class EditUserAvatar extends Component {
  constructor(props) {
    super(props)
    this.selectPhoto = this.selectPhoto.bind(this)
    this.user = this.props.login.user

    this.state = {
      sourceUri: ImagePath({type: 'avatar', path: 'users/' + this.user._id + '/' + this.user.avatar}) 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.tmpAvatarUri === null) {
      this.props.navigator.pop()
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

        this.props.loginActions.updateAvatarUri(source.uri)

        this.setState({
          sourceUri: source.uri
        })
      }
    })
  }

  render() {
    const loader = (this.props.login.isFetching) ? (
      <Loading />
    ) : null

    var test = (
      <Loading />
    )

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.selectPhoto()}>
          <View style={[styles.image, {position: 'absolute'}]}>
            <Image style={styles.image} source={{uri: this.state.sourceUri}} />
            {test}
          </View>
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
      height: sideLength,
      width: sideLength,
    }
  })

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAvatar)
