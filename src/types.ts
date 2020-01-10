import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  MergeDefaults,
  MergeUnknown,
  Overwrite,
} from '@alloc/types'
import { ComponentProps, FunctionComponent, ReactNode, Ref } from 'react'
import { NativeMethodsMixin } from 'react-native'
import { AnimatedComponent } from 'react-spring'

/** The component type being masked. */
export type MaskedView<
  View extends ComponentType<any> = FunctionComponent<any>,
  Instance = NativeMethodsMixin
> = View extends PrimalType<infer T>
  ? T
  : FunctionComponent<
      MergeUnknown<
        ComponentProps<View>,
        { ref?: Ref<Instance>; children?: ReactNode }
      >
    > & {
      masks?: PropMask[]
      viewType?: any
      displayName?: string
      render?: Function
    }

export type MaskedProps<
  View extends ElementType,
  ForcedProps extends object = {},
  DefaultProps extends object = {}
> = Overwrite<MergeDefaults<ComponentProps<View>, DefaultProps>, ForcedProps>

export interface PrimalType<
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

export type MaskView<
  View extends ElementType,
  ForcedProps extends object = {},
  DefaultProps extends object = {}
> = View extends PrimalType<infer T, infer FP, infer DP>
  ? PrimalType<T, Overwrite<FP, ForcedProps>, Overwrite<DP, DefaultProps>>
  : PrimalType<View, ForcedProps, DefaultProps>

/** For manipulation of component props */
export type PropMask<Out = any> = <In = Out>(props: In) => Out

export interface ComponentMask<View extends ElementType> {
  /** Provide new props and/or override existing props */
  <ForcedProps extends object>(
    mask: (props: MaskedProps<View, ForcedProps>) => ComponentPropsWithRef<View>
  ): MaskView<View, ForcedProps>

  /** Provide default props */
  <DefaultProps extends Partial<ComponentPropsWithRef<View>>>(
    props: DefaultProps & Partial<ComponentPropsWithRef<View>>
  ): MaskView<View, {}, DefaultProps>
}
