# react-primal

Extensible `<Box>` primitive with inline style props

**For React Native only**

&nbsp;

## `<Box>`

By default, the `<Box>` component takes `<View>` props (eg: `style={{height: 0}}`)
and `ViewStyle` props (eg: `height={0}`).

```tsx
<Box
  // <View> props
  pointerEvents="none"
  style={{ width: 25 }}
  // ViewStyle props
  height={50}
  backgroundColor="black"
/>
```

The `style` prop overrides any inline style props.

&nbsp;

## `Box.extend`

Bind props to the `<Box>` component. Think of it like [currying](https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe) or sub-classing.

```tsx
const Row = Box.extend({
  flexDirection: 'row',
})

<Row overflow="hidden">
  {children}
</Row>
```

When the first argument of `extend` is a function, you can transform the
props every time the returned component is used.

```tsx
const Circle = Box.extend(props => ({
  // Default background color
  backgroundColor: 'black',
  // User-provided props
  ...props,
  // Always ignore user-provided "borderRadius"
  style: [props.style, { borderRadius: 9999 }],
}))

<Circle width={100} height={100} />
```

The `extend` function can be used on any masked component.

```tsx
const BlueCircle = Circle.extend({
  backgroundColor: 'blue',
  color: 'white'
})

<BlueCircle>
  Much wow
</BlueCircle>
```

That's all folks!

&nbsp;

## Prior art

- [suchipi/react-boxxy](https://github.com/suchipi/react-boxxy)
- [segmentio/ui-box](https://github.com/segmentio/ui-box)
