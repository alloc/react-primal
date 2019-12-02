import { StyleSheet } from 'react-native'

export const createStyleMask = (styleTypes: any) => (props: any) => {
  const attrs: any = {}
  const style: any = {}

  let target: any
  for (const key in props) {
    target = styleTypes[key] ? style : attrs
    target[key] = props[key]
  }

  attrs.style = StyleSheet.flatten([style, attrs.style])
  return attrs
}
