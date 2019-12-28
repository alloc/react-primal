import { ComponentProps } from 'react'
import {
  ImageProps as NativeImageProps,
  ImageStyle,
  TextProps as NativeTextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
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

/**
 * The base `Text` component, but style props can be passed like normal props.
 */
export const Text = maskProps<NativeTextProps, TextStyle>(
  require('Text'),
  createStyleMask(require('TextStylePropTypes'))
)
Text.displayName = 'Text'
export interface TextProps extends ComponentProps<typeof Text> {}

/**
 * The base `Image` component, but style props can be passed like normal props.
 */
export const Image = maskProps<NativeImageProps, ImageStyle>(
  require('Image'),
  createStyleMask(require('ImageStylePropTypes'))
)
Image.displayName = 'Image'
export interface ImageProps extends ComponentProps<typeof Image> {}

export { maskProps, createStyleMask }
export * from './types'
