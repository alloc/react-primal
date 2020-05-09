import { StyleSheet } from 'react-native'

export const createStyleMask = <T>(styleTypes: any) => (props: T) => {
  const attrs: any = {}
  const style: any = {}

  let target: any
  for (const [key, value] of Object.entries(props)) {
    target = key in styleTypes ? style : attrs
    target[key] = value
  }

  attrs.style = StyleSheet.flatten([style, attrs.style])
  return attrs
}
