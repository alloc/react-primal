import React, { ComponentPropsWithRef, ComponentType, forwardRef } from 'react'
import { animated } from 'react-spring'
import { MaskedProps, MaskedView, MaskView, PropMask } from './types'

/** Provide new props and/or override existing props */
export function maskProps<
  Props extends object,
  ForcedProps extends object,
  Statics = unknown
>(
  View: ComponentType<Props>,
  mask: (
    props: MaskedProps<typeof View, ForcedProps>
  ) => ComponentPropsWithRef<typeof View>
): MaskView<MaskedView<Props>, ForcedProps> & Statics

/** Provide default props */
export function maskProps<
  Props extends object,
  DefaultProps extends Partial<Props>,
  Statics = unknown
>(
  View: ComponentType<Props>,
  props: DefaultProps
): MaskView<MaskedView<Props>, {}, DefaultProps> & Statics

export function maskProps(View: MaskedView<any, any>, mask: any) {
  const masks: PropMask[] = [
    typeof mask === 'function' ? mask : (props: any) => ({ ...mask, ...props }),
  ]

  // Masked components can be built upon.
  if (View.masks) {
    masks.push(...View.masks)
    View = View.viewType
  }

  const MaskView: any = forwardRef<any, any>((props, ref) => {
    props = applyMasks(props, masks)
    return <View {...props} ref={ref} />
  })

  MaskView.masks = masks
  MaskView.extend = maskProps.bind(null, MaskView)
  MaskView.viewType = View

  const AnimatedView = animated(View)
  MaskView.Animated = forwardRef<any, any>((props, ref) => {
    props = applyMasks(props, masks)
    return <AnimatedView {...props} ref={ref} />
  })

  MaskView.displayName = `Mask(${View.displayName || View.name || 'Anonymous'})`
  MaskView.Animated.displayName = MaskView.displayName
  return MaskView
}

const applyMask = (props: any, mask: PropMask) => mask(props)
const applyMasks = (props: any, masks: PropMask[]) =>
  masks.reduce(applyMask, props)
