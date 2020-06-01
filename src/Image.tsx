import { ComponentProps } from 'react'
import ReactNative from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

/**
 * The base `Image` component, but style props can be passed like normal props.
 */
export const Image = maskProps(
  ReactNative.Image,
  createStyleMask<ReactNative.ImageStyle>(
    require('react-native/Libraries/DeprecatedPropTypes/DeprecatedImageStylePropTypes')
  )
)

export interface ImageProps extends ComponentProps<typeof Image> {}
