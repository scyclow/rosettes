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


function drawRosette(x, y, minRad, maxRad, lineMin, strategy, gears, { gearModifier, spiralFn, colorFn}) {

  // STANDARD RIBBED
  if (strategy === 1) {
    times(2*maxRad/lineMin, t => {
      const rad = t*lineMin/2 + minRad
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

    drawLineRosette(x, y, minRad, maxRad*1.5, gears, {
      stroke: colorFn(),
      pointCount: 100 * rndint(maxRad/100)
    })

  ///// GRID
  } else if (strategy === 3) {

    drawLineRosette(x, y, minRad*1.5, maxRad*1.5, gears, {
      stroke: colorFn(),
      pointCount: 100 * rndint(1, 4)
    })

    times(Math.floor(2*maxRad/lineMin) - 1, t => {
      const rad = t*lineMin/2 + minRad
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
      const rad = rndint(minRad, maxRad)
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

  /// POINTY IN/OUT
  } else if ([6, 7].includes(strategy)) {
    const basePoints = 28
    const repeats = 1
    const layers = maxRad/32
    const layerSpace = lineMin*0.75

    drawCurveyRosette(
      x, y, layerSpace,
      gears,
      1,
      minRad,
      {basePoints, repeats, layers, outwardSpikes: strategy === 6, outwardSpikeParam: rnd(0.7, 0.9)},
      {gearModifier, colorFn}
    )

  /// CURVEY/NUMISMATIC
  } else if ([8, 9].includes(strategy)) {
    const basePoints = 102
    const repeats = strategy === 8 ? 1 : 3
    const layers = maxRad/50
    const layerSpace = lineMin*1.2

    drawCurveyRosette(
      x, y, layerSpace,
      gears,
      2,
      minRad,
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

  /// SHAPES
  } else if ([10, 11].includes(strategy)) {
    let pointMult = prb(0.5) ? rnd(1, 4) : 1
    const drawFn = sample([
      (_x, _y, pm, t) => svg.drawCircle(x+_x, y+_y, 5*pm, {stroke: colorFn(t)}),
      (_x, _y, pm, t) => svg.drawRect(x+_x-5*pm, y+_y-5*pm, 5*pm*2, 5*pm*2, {stroke: colorFn(t)}),
      (_x, _y, pm, t) => drawSingleSymbol(_x+x, _y+y, 'rosette', 0.75),
      // (_x, _y, pm, t) => drawSingleSymbol(_x+x, _y+y, 'star', 0.75),
      // (_x, _y, pm, t) => drawSingleSymbol(_x+x, _y+y, 'heart', 0.75),
    ])

    times(2*maxRad/lineMin, t => {
      const rad = t*lineMin/2 + minRad

      if (strategy == 11) pointMult = rnd(1, 5)

      const pointCount = (28 + t*10)/pointMult
      const points = getRosettePoints(rad*1.5, gears, 1, 0, 0, pointCount/2)

      points.forEach(([_x, _y]) => drawFn(_x, _y, pointMult, t))
    })

  /// RIBBONS
  } else if (strategy === 12) {
    const pointCount = 100 * rndint(1, 4)

    const strokes = []

    times(Math.floor(2*maxRad/lineMin), t => {
      const rad = t*lineMin/2 + minRad
      const prevRad = (t-1)*lineMin/2 + minRad

      let stroke = colorFn()
      strokes.push(stroke)



      if (t%2) {
        stroke = strokes[t-1]
        drawLineRosette(x, y, prevRad*1.5, rad*1.5, gears, {
          stroke,
          pointCount
        })
      }

      const rosettePath = getRosettePath(
        rad,
        gears
      )

      svg.drawPath(x, y, rosettePath, {
        stroke,
      })
    })

  /// BLOCKS
  } else if (strategy === 13) {
    // const pointMult = 1//rndint(1, 4)
    const pointCount = 300


    times(Math.floor(2*maxRad/lineMin), t => {

      // const pointCount = (t%2 ? (28 + t*10)/pointMult : (28 + (t+1)*10)/pointMult)+1

      const rad = t*lineMin/2 + lineMin
      const prevRad = (t-1)*lineMin/2 + lineMin

      const points = getRosettePoints(rad*1.5, gears, 1, 0, 0, pointCount/2)
      const prevPoints = getRosettePoints(prevRad*1.5, gears, 1, 0, 0, pointCount/2)

      points.forEach((p, i) => {
        if (t%2) {
          svg.drawLine(p[0]+x, p[1]+y, prevPoints[i][0]+x, prevPoints[i][1]+y)
        }

        if (i%2==0 && points[i+1]) {
          svg.drawLine(p[0]+x, p[1]+y, points[i+1][0]+x, points[i+1][1]+y)
        }
      })
    })

  ///// DASHED
  } else if (strategy === 14) {
    times(Math.floor(2*maxRad/lineMin), t => {

      const pointCount = (32 + t*10)
      // const pointCount = (t%2 ? (28 + t*10)/pointMult : (28 + (t+1)*10)/pointMult)+1

      const rad = t*lineMin/2 + lineMin
      const prevRad = (t-1)*lineMin/2 + lineMin

      const points = getRosettePoints(rad*1.5, gears, 1, 0, 0, pointCount)
      const prevPoints = getRosettePoints(prevRad*1.5, gears, 1, 0, 0, pointCount)

      points.forEach((p, i) => {
        // if (t%2) {
        //   svg.drawLine(p[0]+x, p[1]+y, prevPoints[i][0]+x, prevPoints[i][1]+y)
        // }

        if (i%2==0 && points[i+1]) {
          svg.drawLine(p[0]+x, p[1]+y, points[i+1][0]+x, points[i+1][1]+y)
        }
      })
    })



    /////// TEST
  } else if (strategy === 15) {
    const basePoints = 102
    const repeats = 1
    const layers = maxRad/50
    const layerSpace = lineMin*1.2

    drawCurveyRosette(
      x, y, layerSpace,
      gears,
      2,
      minRad,
      {basePoints, repeats, layers},
      {gearModifier, colorFn}
    )



    let pointMult = 1
    const drawFn = (_x, _y, pm, t) => svg.drawCircle(x+_x, y+_y, 5*pm, {stroke: colorFn(t)})

    times(2*maxRad/lineMin-2, t => {
      const rad = t*lineMin/2 + minRad

      const pointCount = basePoints + t

      const points = getRosettePoints(rad*1.5, gears, 1, 0, 0, pointCount)

      points.forEach(([_x, _y]) => drawFn(_x, _y, pointMult, t))
    })
  }

}


function generateRosetteFeatures() {
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


  const rosetteStrategy =
  chance(
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
    [5, 12], // ribbons
    [5, 13], // blocks
    [5, 14], // dashed
    [0, 15], // dashed
  )

  const hasShadows = prb(0.3)
  const multiple = !hasShadows && prb(0.1)
  const spiralDirection = posOrNeg()
  const spiralFn = chance(
    [1, () => 0],
    [1, t => t*1.5*spiralDirection],
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

  return [rosetteStrategy, gears, usedPenColors, gearStartFn, multiple, hasAura, hasShadows, {gearModifier, spiralFn, colorFn}]
}

function drawNewRosetteWithFeatures(x, y, minRad, maxRad, lineMin, features) {
  const [rosetteStrategy, gears, usedPenColors, gearStartFn, multiple, hasAura, hasShadows, {gearModifier, spiralFn, colorFn}] = features

  drawRosette(x, y, minRad, maxRad, lineMin, rosetteStrategy, gears, {gearModifier, spiralFn, colorFn})

  if (rosetteStrategy === 1) {
    if (hasShadows) {
      const color2 = sample(usedPenColors)
      drawRosette(
        x+posOrNeg(10),
        y+posOrNeg(10),

        minRad,
        maxRad,

        lineMin,

        rosetteStrategy,
        gears,
        {gearModifier, spiralFn, colorFn: () => color2}
      )
    }

    if (multiple) {
      const color2 = sample(usedPenColors)
      const gears2 = generateGears(8, 15, .1, gearStartFn)
      drawRosette(x, y, minRad, maxRad, lineMin, rosetteStrategy, gears2, {gearModifier, spiralFn, colorFn: () => color2})
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

    // times(40, t => {
    //   const rad = t*lineMin + lineMin
    //   const rosettePath = getRosettePath(
    //     rad,
    //     gears,
    //     0.25,
    //     0,
    //     1-0.265
    //   )

    //   svg.drawPath(C*2, 0, rosettePath, {
    //     stroke: '#f00',
    //   })
    // })

    // times(40, t => {
    //   const rad = t*lineMin + lineMin
    //   const rosettePath = getRosettePath(
    //     rad,
    //     gears,
    //     0.25,
    //     0,
    //     0.25
    //   )

    //   svg.drawPath(0, C*2, rosettePath, {
    //     stroke: '#f00',
    //   })
    // })
    // times(svg.w/40, x => svg.drawLine((x+1)*40, 0, 0, (x+1)*40, {stroke: pen.yellow}))
    // times(svg.w/40, x => svg.drawLine((x+1)*40, svg.h, svg.w, (x+1)*40, {stroke: pen.yellow}))


    const features = generateRosetteFeatures()

    // const borderStroke = features[2][0]

    // const borderSize = 20
    // const edgePadding = 5

    // const borders = (svg.w - edgePadding*2)/(borderSize*2)




    // times(6, b => {
    //   const offset = edgePadding + b * borderSize
    //   const size = offset * 2
    //   svg.drawRect(offset, offset, svg.w - size, svg.h - size, {stroke: borderStroke})

    // })

    drawNewRosetteWithFeatures(x, y, 40, 800/grid - ((grid-1) * 10 ), 40, features )





    // const gears = generateGears(8, 15, .1, evenStart)

    // const basePoints = 102


  })
})


// const features = generateRosetteFeatures()
// const features2 = generateRosetteFeatures()

// const borderStroke = features[2][0]


// svg.drawRect(420, 420, svg.w-840, svg.h-840, {stroke: borderStroke})

// drawNewRosetteWithFeatures(420, 420, 40, 200, 40, features )
// drawNewRosetteWithFeatures(svg.w-420, svg.h-420, 40, 200, 40, features )
// drawNewRosetteWithFeatures(420, svg.h-420, 40, 200, 40, features )
// drawNewRosetteWithFeatures(svg.w-420, 420, 40, 200, 40, features )



// drawNewRosetteWithFeatures(C, C, 40, 160, 40, features )
// drawNewRosetteWithFeatures(C, C, 320, 380, 40, features )
// drawNewRosetteWithFeatures(C, C, 480, 680, 40, features )













function drawCurveyRosette(
  x, y, layerSpace, gears, textureType, minRad,
  {basePoints, repeats, layers, outwardSpikes, outwardSpikeParam},
  {gearModifier, colorFn}
) {
    times(layers, t => {
      const stroke = colorFn(t)
      times(repeats, r => {


        const _points = basePoints + t*20
        const outterRad = (t*layerSpace + minRad)
        const innerRad = ((t-1)*layerSpace + minRad)
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