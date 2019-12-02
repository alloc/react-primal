import {
  ComponentPropsWithRef,
  ElementType,
  MergeDefaults,
  MergeUnknown,
  Overwrite,
} from '@alloc/types'
import { ComponentProps, ComponentType, ReactNode, Ref } from 'react'
import { NativeMethodsMixin } from 'react-native'
import { AnimatedComponent } from 'react-spring'

export type MaskedView<
  Props extends object,
  T = NativeMethodsMixin
> = ComponentType<
  MergeUnknown<Props, { ref?: Ref<T>; children?: ReactNode }>
> & {
  masks?: PropMask[]
  viewType?: any
  displayName?: string
}

export type MaskedProps<
  View extends ElementType,
  ForcedProps extends object = {},
  DefaultProps extends object = {}
> = Overwrite<MergeDefaults<ComponentProps<View>, DefaultProps>, ForcedProps>

export interface MaskView<
  View extends ElementType,
  ForcedProps extends object = {},
  DefaultProps extends object = {}
> {
  (props: MaskedProps<View, ForcedProps, DefaultProps>): JSX.Element

  masks: PropMask[]
  viewType: View
  displayName?: string

  extend: ComponentMask<this>
  Animated: AnimatedComponent<this>
}

/** For manipulation of component props */
export type PropMask<Out = any> = <In = Out>(props: In) => Out

type MaskWithForce<
  View extends ElementType,
  ForcedProps extends object
> = View extends MaskView<infer T, infer FP, infer DP>
  ? MaskView<T, Overwrite<FP, ForcedProps>, DP>
  : MaskView<View, ForcedProps>

type MaskWithDefaults<
  View extends ElementType,
  DefaultProps extends Partial<ComponentPropsWithRef<View>>
> = View extends MaskView<infer T, infer FP, infer DP>
  ? MaskView<T, FP, Overwrite<DP, DefaultProps>>
  : MaskView<View, {}, DefaultProps>

export interface ComponentMask<View extends ElementType> {
  /** Provide new props and/or override existing props */
  <ForcedProps extends object>(
    mask: (props: MaskedProps<View, ForcedProps>) => ComponentPropsWithRef<View>
  ): MaskWithForce<View, ForcedProps>

  /** Provide default props */
  <DefaultProps extends Partial<ComponentPropsWithRef<View>>>(
    props: DefaultProps & Partial<ComponentPropsWithRef<View>>
  ): MaskWithDefaults<View, DefaultProps>
}
