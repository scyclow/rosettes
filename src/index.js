svg = new SVG(8.5, 8.5)

const THEME = prb(0.1) ? 0 : 1


svg.svg.style.background = THEME === 1 ? '#fff' : '#000'

const C = svg.w/2




/////////
/*
color themes


  hot
    red
    orange
    yellow

  crisp
    blue
    teal
    lime

  __
    teal
    blue

  __
    teal
    blue
    red/organge


  tropical
    teal
    orrange
    lime

  $$$
    green
    red
    yellow


  sexy
    magenta
    purple
    blue


  soft
    pink
    teal
    light purple


  __
    yellow
    purple
    pink

  __
    blue
    lime
    purple

  RGB
    red
    green
    blue

  primary
    red
    blue
    yellow

  greenish
    green
    lime
    teal

  bluish
    teal
    blue
    light purple


  __
    pink
    yellow
    lime

  light
    pink
    teal
    lime

  __
    red
    lime
    yellow

  🔥
    red
    orange
    black

  __
    black
    pink
    (teal)

  __
    orange
    teal
    black


*/




// times(4, () => {
//   drawRibbedRosette(C, C, rndint(40, 200), 10, {
//     gears,
//     dist: rndint(15, 60),
//     strokeWidth: 8,
//     stroke: sample(usedPenColors)
//   })
// })


function drawRosette(x, y, maxRad, strategy, gears, { gearModifier, spiralFn, colorFn}) {
  const lineMin = 40

  // STANDARD RIBBED
  if (strategy === 1) {
    times(2*maxRad/lineMin, t => {
      const rad = t*lineMin/2 + lineMin
      const rosettePath = getRosettePath(
        rad,
        gearModifier(gears, t)
      )

      svg.drawPath(x, y, rosettePath, {
        stroke: colorFn(t),
        rotation: spiralFn(t),
      })
    })

  ///// LINES
  } else if (strategy === 2) {
    const dashPadding = 61

    drawLineRosette(x, y, lineMin, maxRad*1.5, gears, {
      stroke: colorFn(),
      pointCount: 100 * rndint(maxRad/100)
    })

  ///// GRID
  } else if (strategy === 3) {
    const dashPadding = 61

    drawLineRosette(x, y, lineMin, maxRad*1.5, gears, {
      stroke: colorFn(),
      pointCount: 100 * rndint(1, 4)
    })

    times(Math.floor(2*maxRad/lineMin) - 1, t => {
      const rad = t*lineMin/2 + lineMin
      const rosettePath = getRosettePath(
        rad,
        gears
      )

      svg.drawPath(x, y, rosettePath, {
        stroke: colorFn(t),
      })
    })

  ///// FRAGMENTED
  } else if (strategy === 4) {
    times(maxRad*1.5, t => {
      const rad = rndint(lineMin, maxRad)
      const rosettePath = getRosettePath(
        rad,
        gears,
        rnd(0.01, 0.1),
        0,
        rnd()
      )

      svg.drawPath(x, y, rosettePath, {
        stroke: colorFn(t),
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

      const p = svg.drawPath(x, y, rosettePath, {stroke: colorFn()})
    })

  } else if ([6, 7].includes(strategy)) {
    const basePoints = 28
    const repeats = 1
    const layers = maxRad/32
    const layerSpace = lineMin*0.75

    console.log(layers, maxRad)

    drawCurveyRosette(
      x, y, layerSpace,
      gears,
      1,
      {basePoints, repeats, layers, outwardSpikes: strategy === 6, outwardSpikeParam: rnd(0.7, 0.9)},
      {gearModifier, colorFn}
    )

  } else if ([8, 9].includes(strategy)) {
    const basePoints = 102
    const repeats = strategy === 8 ? 1 : 3
    const layers = maxRad/50
    const layerSpace = lineMin*1.2

    drawCurveyRosette(
      x, y, layerSpace,
      gears,
      2,
      {basePoints, repeats, layers},
      {gearModifier, colorFn}
    )

      // const rosettePath0 = getRosettePath(
      //   maxRad,
      //   gearModifier(gears, 1)
      // )

      // svg.drawPath(x, y, rosettePath0, {
      //   stroke: colorFn(1),
      //   rotation: spiralFn(0),
      // })

      // const rosettePath = getRosettePath(
      //   maxRad + 15,
      //   gearModifier(gears, 1)
      // )

      // svg.drawPath(x, y, rosettePath, {
      //   stroke: colorFn(1),
      //   rotation: spiralFn(0),
      // })

      // const rosettePath2 = getRosettePath(
      //   maxRad + 30,
      //   gearModifier(gears, 1)
      // )

      // svg.drawPath(x, y, rosettePath2, {
      //   stroke: colorFn(1),
      //   rotation: spiralFn(0),
      // })
  } else if ([10, 11].includes(strategy)) {
    let pointMult = rnd(1, 4)

    times(2*maxRad/lineMin, t => {
      const rad = t*lineMin/2 + lineMin

      if (strategy == 11) pointMult = rnd(1, 5)

      const pointCount = (28 + t*10)/pointMult
      const points = getRosettePoints(rad*1.5, gears, 1, 0, 0, pointCount/2)

      points.forEach(([_x, _y]) => svg.drawCircle(x+_x, y+_y, 5*pointMult, {stroke: colorFn(t)}))
      // points.forEach(([_x, _y]) => svg.drawRect(x+_x, y+_y, 5*pointMult*2, 5*pointMult*2, {stroke: colorFn(t)}))
    })

  }

}


function drawNewRosetteWithFeatures(x, y, maxRad) {
  const usedPenColors =
  THEME === 1
    ? times(3, () => sample([pen.black, pen.blue, pen.teal, pen.red, pen.orange, pen.green, pen.lime, pen.yellow, pen.magenta, pen.purple, pen.pink, ]))
    : times(3, () => sample([pen.white, pen.blue, pen.teal, pen.red, pen.orange, pen.green, pen.lime, pen.yellow, pen.magenta, pen.purple, pen.pink, ]))


  const gearStartFn = chance(
    [50, returnOne],
    [45, evenStart],
    [5, wonkyStart],
  )

  const gears = generateGears(8, 15, .1, gearStartFn)
  const gears2 = generateGears(8, 15, .1, gearStartFn)


  const rosetteStrategy = chance(
    [30, 1], // standard
    [2, 2], // lines
    [15, 3], // grid
    [15, 4], // fragmented
    [0, 5], // spiral
    [10, 6], // outterSpikey
    [10, 7], // innerSpikey
    [10, 8], // wavy
    [10, 9], // numismatic
    [2, 10], // circles
    [1, 11], // heterocircles
  )

  const hasShadows = prb(0.3)
  const multiple = !hasShadows && prb(0.1)
  const spiralDirection = posOrNeg()
  const spiralFn = chance(
    [1, () => 0],
    [1, t => t*1.5*spiralDirection],
    [1, t => t*sin(t/4)*0.25*spiralDirection]
  )

  chance(
    [20, () => 0],
    [5, t => t*1.5*spiralDirection],
    [1, t => t*sin(t/4)*0.25*spiralDirection]
  )

  const radiaChange = rnd(0.00025, 0.005)
  const gearModifier = chance(
    [4, gears => gears],
    // [1, (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*0.00025)}))],
    // [1, (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*0.005)}))],
    [1, (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*radiaChange)}))],
  )
  const color1 = sample(usedPenColors)
  let colorFn = (hasShadows||multiple) ? () => color1 : () => sample(usedPenColors)
  const hasAura = prb(0.1)

  drawRosette(x, y, maxRad, rosetteStrategy, gears, {gearModifier, spiralFn, colorFn})

  if (rosetteStrategy === 1) {
    if (hasShadows) {
      const color2 = sample(usedPenColors)
      drawRosette(x+10, y+10, maxRad, rosetteStrategy, gears, {gearModifier, spiralFn, colorFn: () => color2})
    }

    if (multiple) {
      const color2 = sample(usedPenColors)
      drawRosette(x, y, maxRad, rosetteStrategy, gears2, {gearModifier, spiralFn, colorFn: () => color2})
    }
  }

  if (hasAura) {
    drawLineRosette(x, y, maxRad, maxRad * 1.4, gears.map(g => ({ ...g, radia: g.radia - 0.2})), {
      stroke: colorFn()
    })
  }
}



// const gearModifier =  (gears, t) => gears.map(g => ({ ...g, radia: g.radia - (t*0.00025)}))








const grid = 1//rndint(1, 5)

times(grid, i => {
  const row = i+1
  times(grid, j => {
    const col = j+1

    const offset = C/(grid)
    const x = (2*col * C / grid) - offset
    const y = (2*row * C / grid) - offset


  // const gears = generateGears(8, 15, .1)

  //   const lineMin = 40
  //   times(40, t => {
  //     const rad = t*lineMin + lineMin
  //     const rosettePath = getRosettePath(
  //       rad,
  //       gears,
  //       0.25,
  //       0,
  //       0
  //     )

  //     svg.drawPath(0, 0, rosettePath, {
  //       stroke: '#f00',
  //     })
  //   })

  //   times(40, t => {
  //     const rad = t*lineMin + lineMin
  //     const rosettePath = getRosettePath(
  //       rad,
  //       gears,
  //       0.25,
  //       0,
  //       0.5
  //     )

  //     svg.drawPath(C*2, C*2, rosettePath, {
  //       stroke: '#f00',
  //     })
  //   })

  //   times(40, t => {
  //     const rad = t*lineMin + lineMin
  //     const rosettePath = getRosettePath(
  //       rad,
  //       gears,
  //       0.25,
  //       0,
  //       1-0.265
  //     )

  //     svg.drawPath(C*2, 0, rosettePath, {
  //       stroke: '#f00',
  //     })
  //   })

  //   times(40, t => {
  //     const rad = t*lineMin + lineMin
  //     const rosettePath = getRosettePath(
  //       rad,
  //       gears,
  //       0.25,
  //       0,
  //       0.25
  //     )

  //     svg.drawPath(0, C*2, rosettePath, {
  //       stroke: '#f00',
  //     })
  //   })

    drawNewRosetteWithFeatures(x, y, 800/grid - ((grid-1) * 10 ) )



    // const gears = generateGears(8, 15, .1, evenStart)

    // const basePoints = 102


  })
})
















function drawCurveyRosette(
  x, y, layerSpace, gears, textureType,
  {basePoints, repeats, layers, outwardSpikes, outwardSpikeParam},
  {gearModifier, colorFn}
) {
    times(layers, t => {
      const stroke = colorFn(t)
      times(repeats, r => {


        const _points = basePoints + t*20
        const outterRad = (t*layerSpace + layerSpace)
        const innerRad = ((t-1)*layerSpace + layerSpace)
        const emph = 0.5

        const textureFn = textureType === 1
          ? (g, t) => ({
              radiaStart: g.radiaStart + (r/repeats) * (2/_points),
              radiaAdj: (p, i) => {
                const spikeParam = outwardSpikes
                  ? outwardSpikeParam
                  : max(20, innerRad + 100)/outterRad

                return (i || p%2) ? 1 : spikeParam
              }
            })
          : g => ({
              radiaStart: g.radiaStart + (r/repeats) * (4/_points),
              radiaAdj: (p, i) => {
                return i ? 1 : (
                  p % 2
                    ? 1
                    : (p)/2 % 2
                      ? max(20, innerRad + layerSpace*(2+emph))/outterRad
                      : max(20, innerRad - layerSpace*emph)/outterRad
                )
              }
            })



        const rosettePath = getRosettePath(
          outterRad,
          gearModifier(
            gears.map(g => ({
              ...g,
              ...textureFn(g, t),
            })),
            t
          ),
          1,
          0,
          0,
          _points,
          true,
        )

        svg.drawPath(x, y, rosettePath, {
          stroke,
        })
      })
    })
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