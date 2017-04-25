'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import ImagePicker from 'react-native-image-picker'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../../redux/actions/userActions'

import ImagePath from '../shared/ImagePath'
import Loading from '../shared/Loading'

import {
  LANG,
  AppSettings
} from '../../../../common/__'

class EditUserAvatar extends Component {
  constructor(props) {
    super(props)
    this._selectPhoto = this._selectPhoto.bind(this)

    let {user} = this.props.login,
      path = (user.avatar === AppSettings.defaultUserAvatar) ? AppSettings.defaultUserAvatar : (user._id + '/' + user.avatar)

    this.state = {
      sourceUri: ImagePath({type: 'avatar', path: 'users/' + path}) 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.login.tmpAvatarUri) {
      this.props.navigator.pop(0)
    }
  }

  _selectPhoto() {
    let options = {
      title: LANG.t('mine.edit.SelectPhoto'),
      storageOptions: { 
        skipBackup: true, 
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      else {
        let source = null

        if (Platform.OS === 'ios') {
          source = {uri: res.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: res.uri, isStatic: true};
        }

        this.props.userActions.updateAvatarUri(source.uri)

        this.setState({
          sourceUri: source.uri
        })
      }
    })
  }

  render() {
    const loader = (this.props.login.isFetching) ? (
      <View style={styles.image}>
        <Loading />
      </View>
    ) : null

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this._selectPhoto}>
          <View style={styles.box}>
            <Image style={styles.image} source={{uri: this.state.sourceUri}} />
              {loader}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

EditUserAvatar.propTypes = {
  navigator: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired
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
    box: {
      height: sideLength,
      width: sideLength,
    },
    image: {
      position: 'absolute',
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
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAvatar)
