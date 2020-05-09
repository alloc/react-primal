import {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  MergeDefaults,
  MergeUnknown,
  Overwrite,
  Pick,
} from '@alloc/types'
import {
  ComponentProps,
  FunctionComponent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
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
  (props: MaskedProps<View, ForcedProps, DefaultProps>): ReactElement | null

  masks: PropMask[]
  viewType: View
  displayName?: string

  extend: ExtendComponent<this>
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

export interface ExtendComponent<View extends ElementType> {
  /** Provide new props and/or override existing props */
  <ForcedProps extends object>(
    mask: (props: MaskedProps<View, ForcedProps>) => ComponentPropsWithRef<View>
  ): MaskView<View, ForcedProps>

  /** Provide default props */
  <DefaultProps extends Partial<ComponentPropsWithRef<View>>>(
    props: DefaultProps & Partial<ComponentPropsWithRef<View>>
  ): MaskView<View, {}, DefaultProps>
}

/**
 * Return a string union of the keys that exist in `B` and have a different
 * type than the same property in `A`.
 */
type DiffKeys<A, B> = {
  [P in keyof B]: P extends keyof A
    ? [B[P], A[P]] extends [A[P], B[P]]
      ? never
      : P
    : P
}[keyof B]

/**
 * Return an object type whose properties exist in `B` and have a different
 * type than the same property in `A`.
 */
export type DiffProps<A, B> = Pick<B, DiffKeys<A, B>>
