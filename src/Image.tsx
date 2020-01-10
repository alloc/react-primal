import { ComponentProps } from 'react'
import ReactNative from 'react-native'
import { createStyleMask } from './createStyleMask'
import { maskProps } from './maskProps'

type Props = ReactNative.ImageProps
type Style = ReactNative.ImageStyle
type Statics = typeof ReactNative.Image

/**
 * The base `Image` component, but style props can be passed like normal props.
 */
export const Image = maskProps<Props, Style, Statics>(
  require('Image'),
  createStyleMask(require('ImageStylePropTypes'))
)

Object.assign(Image, ReactNative.Image)
Image.displayName = 'Image'

export interface ImageProps extends ComponentProps<typeof Image> {}
