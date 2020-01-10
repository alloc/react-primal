import { ComponentProps } from 'react'
import ReactNative from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

type Props = ReactNative.TextProps
type Style = ReactNative.TextStyle

/**
 * The base `Text` component, but style props can be passed like normal props.
 */
export const Text = maskProps<Props, Style>(
  require('Text'),
  createStyleMask(require('TextStylePropTypes'))
)

Text.displayName = 'Text'

export interface TextProps extends ComponentProps<typeof Text> {}
