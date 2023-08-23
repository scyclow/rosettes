svg = new SVG(8.5, 8.5)

const THEME = prb(0.5) ? 0 : 1


const usedPenColors =
  THEME === 1
    ? times(3, () => sample([pen.blue, pen.teal, pen.red, pen.black, pen.orange]))
    : times(3, () => sample([pen.blue, pen.teal, pen.red, pen.white, pen.orange]))


svg.svg.style.background = THEME === 1 ? '#fff' : '#000'

const C = svg.w/2

const gearStartFn = chance(
  [70, returnOne],
  [25, evenStart],
  [5, wonkyStart],
)

const gears = generateGears(8, 15, .1, gearStartFn)
const gears2 = generateGears(8, 15, .1, gearStartFn)



/////////
/*
types

  normal
    rotating
    fragmented
    grid
    shadow


  evolving
    rotating
    fragmented
    shadow

  numismatic
    shadow

  wonky
    shadoe

  lines only
    shadow

  exagerated


Overlays
  1
  2
*/


const rosetteStyle = chance(
  [1, 1], // normal
  [1, 2], // evolving
  // [1, 1], // numismatic
)

const rosetteStrategy = chance(
  [5, 1], // standard
  [1, 2], // lines
  [1, 3], // grid
  [1, 4], // fragmented
  [1, 4], // spiral
)

const hasShadows = prb(0.3)
const multiple = !hasShadows && prb(0.1)
const spiralFn = chance(
  [20, () => 0],
  [5, t => t*-1.5],
  [1, t => t*sin(t/4)*-0.25]
)

const gearModifier = chance(
  [10, gears => gears],
  [1, (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*0.00025)}))],
  [1, (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*0.005)}))],
)



// times(4, () => {
//   drawRibbedRosette(C, C, rndint(40, 200), 10, {
//     gears,
//     dist: rndint(15, 60),
//     strokeWidth: 8,
//     stroke: sample(usedPenColors)
//   })
// })


function drawRosette(x, y, strategy, gears, aura, colorFn) {
  // STANDARD RIBBED
  if (strategy === 1) {
    times(20, t => {
      const rad = t*40 + 40
      const rosettePath = getRosettePath(
        rad,
        gearModifier(gears, 1)
      )

      svg.drawPath(x, y, rosettePath, {
        strokeWidth: 8,
        stroke: colorFn(),
        rotation: spiralFn(t),
      })
    })

  ///// LINES
  } else if (strategy === 2) {
    const lineMin = 40
    const dashPadding = 61

    drawLineRosette(x, y, lineMin, lineMin*30, gears, {
      strokeWidth: 8,
      stroke: colorFn(),
      pointCount: 100 * rndint(9)
    })

  ///// GRID
  } else if (strategy === 3) {
    const lineMin = 40
    const dashPadding = 61

    drawLineRosette(x, y, lineMin, lineMin*30, gears, {
      strokeWidth: 8,
      stroke: colorFn()
    })

    times(20, t => {
      const rad = t*40 + 40
      const rosettePath = getRosettePath(
        rad,
        gears
      )

      svg.drawPath(x, y, rosettePath, {
        strokeWidth: 8,
        stroke: colorFn(),
      })
    })

  ///// FRAGMENTED
  } else if (strategy === 4) {
    times(800, t => {
      const rad = t*40 + 40
      const rosettePath = getRosettePath(
        rndint(30, 800),
        gears,
        rnd(0.01, 0.1),
        0,
        rnd()
      )

      svg.drawPath(x, y, rosettePath, {
        strokeWidth: 8,
        stroke: colorFn()
      })
    })

  ///// SPIRAL
  } else if (strategy === 5) {
    times(4, t => {
      const rosettePath = getRosettePath(
        30 + rnd(15),
        gears,
        2 + rnd(4),
        rnd(0.001, 0.002)
      )

      const stroke = sample(usedPenColors)

      const p = svg.drawPath(x, y, rosettePath, {stroke, strokeWidth: 8})
    })
  }



  if (aura) {
    drawLineRosette(x, y, 900, 1100, gears.map(g => ({ ...g, radia: g.radia - 0.2})), {
      strokeWidth: 8,
      stroke: colorFn()
    })

  }
}


const color1 = sample(usedPenColors)
let colorFn = (hasShadows||multiple) ? () => color1 : () => sample(usedPenColors)
const hasAura = prb(0.1)

drawRosette(C, C, rosetteStrategy, gears, hasAura, colorFn)

if (rosetteStrategy === 1) {
  if (hasShadows) {
    const color2 = sample(usedPenColors)
    drawRosette(C+10, C+10, rosetteStrategy, gears, false, () => color2)
  }

  if (multiple) {
    const color2 = sample(usedPenColors)
    drawRosette(C, C, rosetteStrategy, gears2, false, () => color2)
  }
}






///// RIBBON
// times(20, i => {
//   if (i%2===0) {
//     drawLineRosette(C, C, lineMin + i*dashPadding+2, lineMin + (i+1)*dashPadding, gears, {
//       stroke: sample(usedPenColors)
//     })
//   }
// })


  // drawLineRosette(x, y, lineMin, lineMax, gears, {shadow, stroke: lineStroke})



///// FRAGMENTED







//// EVOLVING
// times(20, t => {
//   const rad = t*40 + 40
//   const rosettePath = getRosettePath(
//     rad,
//     gears.map(g => ({ ...g, radia: g.radia - (t*0.005)}))
//   )

//   svg.drawPath(C, C, rosettePath, {
//     strokeWidth: 8,
//     stroke: sample(usedPenColors),
//     // gClass: 'shrinkGrow',
//     // gStyle: `animation-delay: -${t*500}ms`
//   })
// })





////// SPIRAL
// times(4, t => {
//   const rosettePath = getRosettePath(
//     10 + rnd(15),
//     gears,
//     3 + rnd(4),
//     rnd(0.001, 0.002)
//   )

//   const stroke = sample(usedPenColors)

//   const p = svg.drawPath(C, C, rosettePath, {stroke, strokeWidth: 8, className: 'stroke'})
// })



///// ROTATING
// times(40, t => {
//   const rad = (t*24 +1)
//   const rosettePath = getRosettePath(
//     rad,
//     gears.map(g => ({ ...g, radia: g.radia - (t*0.00025)}))
//     // gears
//   )
//   svg.drawPath(C, C, rosettePath, {
//     stroke: sample(usedPenColors),
//     strokeWidth: 8,
//     // rotation: t*sin(t/4)*-0.25,
//     rotation: t*-1.5,
//     fill: `none`,
//     className: 'stroke'
//   })
// })


svg.mount()