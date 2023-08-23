

const pen = {
  black: '#000',
  white: '#fff',
  red: '#f32e14',
  blue: '#1f1dcb',
  pink: '#f36ee8',
  orange: '#fa6405',
  green: '#007344',
  teal: '#00b0d9'
}

const penColorsDark = [
  pen.blue,
  pen.green,
  pen.teal,
  pen.red,
]

const penColorsLight = [
  pen.pink,
  pen.orange,
]

const penColors = [...penColorsDark, ...penColorsLight]
const penColorsAll = [pen.black, ...penColors]
const penBase = chance(
  [80, pen.black],
  [5, pen.blue],
  [5, pen.green],
  [5, pen.teal],
  [5, pen.red],
)
