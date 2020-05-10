import { ComponentProps } from 'react'
import ReactNative from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

/**
 * The base `View` component, but style props can be passed like normal props.
 */
export const Box = maskProps(
  ReactNative.View,
  createStyleMask<ReactNative.ViewStyle>(require('ViewStylePropTypes'))
)
Box.displayName = 'Box'
export interface BoxProps extends ComponentProps<typeof Box> {}
