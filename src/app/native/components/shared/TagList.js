'use strict'

import React, {
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {
  UTIL,
  Graphics
} from '../../../../common/__'

import TextView from './TextView'

const TagList = (props) => {
  if (props.tags.length < 1) {
    return null
  }

  const textColor = props.textColor || Graphics.textColors.overlay,
    backgroundColor = props.backgroundColor || 'transparent'

  if (UTIL.isNullOrUndefined(props.type)) {
    let txt = '# '

    props.tags.map((tag) => {
      txt += tag + ' '
    })

    return (
      <TextView
        textColor={textColor}
        text={txt}
      />
    )
  } else {
    let tagView = null

    switch (props.type) {
      case 'pill':
        tagView = (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            props.tags.map((tag, index) => {
              return (
                <TextView
                  style={{
                    backgroundColor,
                    borderRadius: 15,
                    height: 30,
                    overflow: 'hidden',
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    marginBottom: 8,
                    marginRight: 10
                  }}
                  fontWeight={'bold'}
                  fontSize={props.fontSize}
                  textColor={textColor}
                  key={index}
                  text={tag}
                />
              )
            })
          }
          </View>
        )
      break
    }

    return tagView
  }
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default TagList