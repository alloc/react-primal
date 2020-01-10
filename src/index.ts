import { ComponentProps } from 'react'
import { ViewProps, ViewStyle } from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

/**
 * The base `View` component, but style props can be passed like normal props.
 */
export const Box = maskProps<ViewProps, ViewStyle>(
  require('View'),
  createStyleMask(require('ViewStylePropTypes'))
)
Box.displayName = 'Box'
export interface BoxProps extends ComponentProps<typeof Box> {}

export * from './Text'
export * from './Image'

export { maskProps, createStyleMask }
export * from './types'
