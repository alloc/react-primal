import React from 'react'
import { _, assert, test } from 'spec.ts'

import { Box, MaskedProps, MaskView } from 'react-primal'

// @ts-ignore
let elem: JSX.Element

test('Box.extend(mask: Function)', () => {
  test('explicit type parameter', () => {
    type AProps = { a: number }
    const ABox = Box.extend<AProps>(props => {
      assert(props, _ as MaskedProps<typeof Box, AProps>)
      assert(props.a, _ as number)
      return { ...props }
    })

    elem = <ABox a={1} flex={1} />
    elem = <ABox.Animated a={1} flex={1} />

    type BProps = { b: number }
    const BBox = ABox.extend<BProps>(props => {
      assert(props, _ as MaskedProps<typeof ABox, BProps>)
      assert(props.a, _ as number)
      assert(props.b, _ as number)
      return { ...props }
    })

    elem = <BBox a={1} b={1} flex={1} />
    elem = <BBox.Animated a={1} b={1} flex={1} />
  })
})

test('Box.extend(props: object)', () => {
  test('inferred type parameter', () => {
    const ABox = Box.extend({
      flex: 1,
    })

    assert(ABox, _ as MaskView<typeof Box, {}, { flex: number }>)

    elem = <ABox flex={1} />
    elem = <ABox.Animated flex={1} />

    const BBox = ABox.extend({
      width: 0,
    })

    assert(BBox, _ as MaskView<typeof ABox, {}, { width: number }>)

    elem = <BBox width={1} />
    elem = <BBox.Animated width={1} />
  })
})
