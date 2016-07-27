'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  hero: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  heroItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userAvatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100
  },
  avatarRing: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 48,
    padding: 6,
    height: 96,
    width: 96,
  },
  avatar: {
    borderRadius: 42,
    left: 0,
    top: 0,
    height: 84,
    width: 84,
  },
  userTags: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userHandle: {
    color: AppSettings.color.textOverlay,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    color: AppSettings.color.textOverlay,
  }
})