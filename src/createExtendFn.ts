import { ComponentType } from 'react'
import { maskProps } from './maskProps'

export const createExtendFn = <T extends ComponentType>(Component: T): T =>
  (maskProps as any).bind(null, Component)
