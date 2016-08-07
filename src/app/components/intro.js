'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as introActions from '../containers/actions/introActions'

import AppIntro from 'react-native-app-intro'

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 15,
  },
  text: {
    color: Graphics.textColors.overlay,
    fontSize: 30,
    fontWeight: 'bold',
  },
}),

Intro = (props) => {
  const _exitIntro = () => {
    props.introActions.hideIntro()
  }
 
  return (
    <AppIntro skipBtnLabel={Lang.Skip} doneBtnLabel={Lang.Done} onSkipBtnClick={() => _exitIntro()} onDoneBtnClick={() => _exitIntro()}>
      <View style={[styles.slide, {backgroundColor: '#fa931d'}]}>
        <View level={10}><Text style={styles.text}>Page 1</Text></View>
        <View level={15}><Text style={styles.text}>Page 1</Text></View>
        <View level={8}><Text style={styles.text}>Page 1</Text></View>
      </View>
      <View style={[styles.slide, {backgroundColor: '#a4b602'}]}>
        <View level={-10}><Text style={styles.text}>Page 2</Text></View>
        <View level={5}><Text style={styles.text}>Page 2</Text></View>
        <View level={20}><Text style={styles.text}>Page 2</Text></View>
      </View>
      <View style={[styles.slide, {backgroundColor: '#fa931d'}]}>
        <View level={8}><Text style={styles.text}>Page 3</Text></View>
        <View level={0}><Text style={styles.text}>Page 3</Text></View>
        <View level={-10}><Text style={styles.text}>Page 3</Text></View>
      </View>
      <View style={[styles.slide, {backgroundColor: '#a4b602'}]}>
        <View level={5}><Text style={styles.text}>Page 4</Text></View>
        <View level={10}><Text style={styles.text}>Page 4</Text></View>
        <View level={15}><Text style={styles.text}>Page 4</Text></View>
      </View>
    </AppIntro>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    intro: state.intro
  }
}

function mapDispatchToProps(dispatch) {
  return {
    introActions: bindActionCreators(introActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)