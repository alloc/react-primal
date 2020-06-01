import { ComponentProps } from 'react'
import ReactNative from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

/**
 * The base `Text` component, but style props can be passed like normal props.
 */
export const Text = maskProps(
  ReactNative.Text,
  createStyleMask<ReactNative.TextStyle>(
    require('react-native/Libraries/DeprecatedPropTypes/DeprecatedTextStylePropTypes')
  )
)

export interface TextProps extends ComponentProps<typeof Text> {}
