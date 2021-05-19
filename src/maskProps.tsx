import { StaticProps } from '@alloc/types'
import { ComponentPropsWithRef, ComponentType } from '@alloc/types/react'
import React, { ComponentProps, forwardRef } from 'react'
import { animated } from 'react-spring'
import { DiffProps, MaskedView, PrimalType, PropMask } from './types'

/** Provide new props and/or override existing props */
export function maskProps<
  T extends ComponentType<any>,
  Props extends object = {}
>(
  View: T,
  mask: (props: ComponentProps<T> & Props) => ComponentPropsWithRef<T>
): PrimalType<MaskedView<T>, DiffProps<ComponentProps<T>, Props>> &
  StaticProps<T>

/** Provide default props */
export function maskProps<
  T extends ComponentType<any>,
  DefaultProps extends Partial<ComponentProps<T>>
>(
  View: T,
  props: DefaultProps
): PrimalType<MaskedView<T>, {}, DefaultProps> & StaticProps<T>

export function maskProps(View: MaskedView, mask: any) {
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

  const AnimatedView = animated(View)
  const displayName =
    (View.render && getDisplayName(View.render)) ||
    getDisplayName(View) ||
    'Anonymous'

  Object.assign(MaskView, View, {
    masks,
    extend: (maskProps as any).bind(null, MaskView),
    render: MaskView.render,
    viewType: View,
    Animated: forwardRef<any, any>((props, ref) => {
      props = applyMasks(props, masks)
      return <AnimatedView {...props} ref={ref} />
    }),
  })

  MaskView.displayName = `Mask(${displayName})`
  MaskView.Animated.displayName = `AnimatedMask(${displayName})`
  return MaskView
}

const applyMask = (props: any, mask: PropMask) => mask(props)
const applyMasks = (props: any, masks: PropMask[]) =>
  masks.reduce(applyMask, props)

const getDisplayName = (elementType: { displayName?: string; name?: string }) =>
  elementType.displayName || elementType.name
