'user strict'

import {
  AppSettings,
  Graphics
} from '../settings'

import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: AppSettings.color.background,
    flex: 1,
    flexDirection: 'column',
  },
  hero: {
    height: 320,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  intro: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    padding: 15,
  },
  title: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.textOverlay,
    }),
  binder: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  sidebar: {
    backgroundColor: AppSettings.color.lightGray,
    flex: 0,
    flexDirection: 'column',
    left: 0,
    position: 'absolute',
    width: 80,
  },
  article: {
    flex: 1,
    backgroundColor: AppSettings.color.background,
  },
  section: {
    marginVertical: 15,
  },
  content: {
    flex: 1,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 5
  },
  hgroup: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  h2: {
    color: AppSettings.color.darkGray,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  h3: {
    color: AppSettings.color.midGray,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  user: {
    marginRight: 10,
  },
})