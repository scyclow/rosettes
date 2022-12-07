


function layout() {
  const leftRosette = prb(0.7)
  const rightRosette = prb(0.7)
  const randomSymbols = prb(0.01)
  const drawGrid = prb(0.025)
  const drawBoner = prb(0.04)
  const doodleHereRight = !rightRosette && prb(0.04)
  const doodleHereLeft = !leftRosette && prb(0.04)
  const isWorthless = !doodleHereRight && !doodleHereLeft && prb(0.025)
  const isHawaii = !isWorthless && !doodleHereRight && !doodleHereLeft && prb(0.005)
  const usaHighlights = prb(0.5)
  const showAura = prb(0.05)

  const centerPattern = chance(
    [95, 0],
    [5, 1],
    [.5, 2],
  )

  const leftBurnHere = !leftRosette && !doodleHereLeft && prb(0.08)
  const rightBurnHere = !rightRosette && !doodleHereRight && prb(0.08)
  const sectionFeatures = {
    leftBurnHere,
    rightBurnHere,
    isStarNote: prb(0.03),
    isBizCard: prb(0.05),
    wheresGeorgeOverride: !leftBurnHere && !leftRosette && prb(0.1),
    showHash: prb(0.1),
    cutHere: prb(0.1),
  }

  const rosetteLines = chance(
    [40, 0], // ribbed
    [20, 1], // checkered or ribbon
    [10, 2], // lines straight or lines dashed
    [10, 3], // spiral
    [10, 4], // fragments
    [10, 5], // double
  )

  const rosetteLinesDashed = prb(0.25)

  const hasLines = [1,2].includes(rosetteLines)


  const variation =
    rosetteLines === 1
      ? 0
      : chance(
        [5, 0], // none
        [1, 1], // exagerated
        [2, 2], // ornate
        [2, 3], // rotating
      )
  const rosetteRadia = variation === 1 ? rnd(0.1, 0.4) : 0.08

  const rosetteRadiaChange = variation === 2 ? chance(
    [1, 0.01],
    [1, 0.005]
  ) : 0

  const rosetteRotation = variation === 3 ? rndint(3, 11) : 0


  const gearStartFn = chance(
    [7, returnOne],
    [2, evenStart],
    [1, wonkyStart],
  )

  const shadow = !rosetteLinesDashed && ![4, 5].includes(rosetteLines) ? prb(0.15) : 0

  const strokeAlt = sample(penColors)
  const lineStroke = prb(0.4) ? penBase : strokeAlt



  // FEATURES.Left = leftRosette ? 'Rosette' : 'Symbols'
  // FEATURES.Right = rightRosette ? 'Rosette' : 'Symbols'
  // FEATURES.George =
  //   centerPattern === 0 ? 'Accessories'
  //   : centerPattern === 1 ? 'Rosette'
  //   : 'Baldessari'

  // FEATURES['Rosette Style'] =
  //   rosetteLines === 0 ? 'Ribbed'
  //   : rosetteLines === 1 && !rosetteLinesDashed ? 'Checkered'
  //   : rosetteLines === 1 && rosetteLinesDashed ? 'Ribbon'
  //   : rosetteLines === 2 && !rosetteLinesDashed ? 'Lines (Straight)'
  //   : rosetteLines === 2 && rosetteLinesDashed ? 'Lines (Dashed)'
  //   : rosetteLines === 3 ? 'Spiral'
  //   : rosetteLines === 4 ? 'Fragmented'
  //   : 'Double'

  // FEATURES['Rosette Pattern'] =
  //   variation === 0 ? 'Normal'
  //   : variation === 1 ? 'Exaggerated'
  //   : variation === 2 ? 'Ornate'
  //   : 'Rotating'

  // FEATURES['Rosette Shadow'] = shadow
  // FEATURES['Wonky Rosettes'] = gearStartFn === wonkyStart
  // FEATURES.Burn = sectionFeatures.leftBurnHere || sectionFeatures.rightBurnHere
  // FEATURES.Worthless = isWorthless
  // FEATURES.Boner = drawBoner
  // FEATURES.Grid = drawGrid
  // FEATURES.Doodle = doodleHereLeft || doodleHereRight
  // FEATURES.Aura = showAura
  // FEATURES['Token Hash'] = sectionFeatures.showHash
  // FEATURES["Where's George?"] = sectionFeatures.wheresGeorgeOverride
  // FEATURES['Biz Card'] = sectionFeatures.isBizCard
  // FEATURES['Star Note'] = sectionFeatures.isStarNote
  // FEATURES['USA Shadow'] = usaHighlights
  // FEATURES['Hawaii Bill'] = isHawaii

  function drawLargeRosette(x, y, {minRad, lineMin, lineMax, layers, dashPadding, fragmentMin, fragmentMax, lineStroke, strokeAlt, }) {
    const gears = generateGears(8, 15, rosetteRadia, gearStartFn)
    if ([0,1,5].includes(rosetteLines)) {
      drawRibbedRosette(x, y, minRad, layers, {gears, rosetteRadiaChange, rosetteRotation: rosetteRotation*(prb(0.5)?1:-1), shadow})
    }

    if (hasLines) {
      if (rosetteLinesDashed) {
        times(layers, i => {
          if (i%2===0) {
            drawLineRosette(x, y, lineMin + i*dashPadding, lineMin + (i+1)*dashPadding-4, gears, {
              shadow,
              stroke: lineStroke
            })
          }
        })
      } else {
        drawLineRosette(x, y, lineMin, lineMax, gears, {shadow, stroke: lineStroke})
      }
    }
    if (rosetteLines === 3) {
      const rosettePath = getRosettePath(
        40,
        gears,
        6,
        0.0002
      )
      svg.drawPath(x, y, rosettePath)
    }

    if (rosetteLines === 4) {
      times(200, t => {

        const rosettePath = getRosettePath(
          rndint(fragmentMin, fragmentMax),
          gears,
          rnd(0.01, 0.1),
          0,
          rnd()
        )
        svg.drawPath(x, y, rosettePath, {
          stroke: prb(0.5) ? penBase : lineStroke,
        })
      })
    }

    if (rosetteLines === 5) {
      drawRibbedRosette(x, y, minRad, layers-2, {
        gears: generateGears(4, 15, rosetteRadia, gearStartFn),
        rosetteRadiaChange,
        rosetteRotation,
        shadow,
        stroke: strokeAlt
      })
    }
  }

  if (doodleHereLeft) {
    svg.drawRect(120, 137, 545, 414)
    svg.text('DOODLE HERE', 280, 144, {size: 0.27})

    drawSections([9], sectionFeatures)

  } else if (leftRosette) {
    drawLargeRosette(413, 350, {
      minRad: 40,
      layers: 10,
      lineMin: 60,
      lineMax: 260,
      dashPadding: 23,
      fragmentMin: 30,
      fragmentMax: 150,
      lineStroke,
      strokeAlt
    })

    if (!variation && !rosetteLines) drawSections([1, 6, 9], sectionFeatures)
  } else {
    drawSections([1, 2, 3, 4, 5, 6, 7, 8, 9], sectionFeatures)
  }


  if (doodleHereRight) {
    svg.drawRect(1080, 235, 540, 350)
    svg.text('DOODLE HERE', 1090, 247, {size: 0.3})

    drawSections([!sectionFeatures.cutHere && 10, 11, 19], sectionFeatures)

  } else if (rightRosette) {
    drawLargeRosette(1305, 404, {
      minRad: 60,
      layers: 8,
      lineMin: 95,
      lineMax: 245,
      dashPadding: 22,
      fragmentMin: 50,
      fragmentMax: 170,
      lineStroke,
      strokeAlt
    })

    if (!variation && !rosetteLines) drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 16, 19], sectionFeatures)

  } else {
    drawSections([!sectionFeatures.cutHere && 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], sectionFeatures)
  }


  if (centerPattern === 1) {
    const gears = generateGears(8, 15, rosetteRadia)
    drawRibbedRosette(880, 316, 14, 6, {gears, rosetteRadiaChange: 0, rosetteRotation: 0})

  } else if (centerPattern === 2) {
    const baldessariColor = sample(penColors)
    times(22, t => svg.drawCircle(905, 336, t*4+1, {stroke: baldessariColor}))

  } else {
    const gears = generateGears(8, 15, rosetteRadia)
    drawFace()
  }

  if (showAura) {
    const gears = generateGears(8, 15, rosetteRadia)
    times(3, i => {
      if (i%2===0) {
        drawLineRosette(872, 329, 206 + i*22, 206 + (i+1)*22-4, gears, {
          shadow,
          stroke: lineStroke
        })
      }
    })
  }



  if (sectionFeatures.isStarNote) {
    svg.drawPath(580, 463, star, {size: 0.4, stroke: pen.green})
    svg.drawPath(1476, 198, star, {size: 0.4, stroke: pen.green})
  }

  if (sectionFeatures.isBizCard) {
    const fill = rndHighlighter()
    svg.drawRect(206, 583, 280, 40, {fill, stroke: 'none'})
    svg.drawRect(1290, 590, 230, 40, {fill, stroke: 'none'})
    svg.text('STEVE PIKELNY', 215, 590, {size: 0.35})
    svg.text('STEVIEP.XYZ', 1300, 600, {size: 0.35})
  }

  if (sectionFeatures.wheresGeorgeOverride) {
    svg.drawRect(506, 215, 153, 235, {stroke: pen.red})
    svg.text('TRACK', 533, 228, {size: 0.35, stroke: pen.red})
    svg.text('ME AT', 533, 266, {size: 0.35, stroke: pen.red})
    svg.text('WWW.', 533, 304, {size: 0.35, stroke: pen.red})
    svg.text('WHERES', 515, 344, {size: 0.35, stroke: pen.red})
    svg.text('GEORGE', 515, 380, {size: 0.35, stroke: pen.red})
    svg.text('.COM', 533, 418, {size: 0.35, stroke: pen.red})
  }

  if (sectionFeatures.leftBurnHere) {
    if (prb(0.5)) {
      svg.drawRect(506, 265, 153, 185)
      svg.text('BURN', 550, 275)
      bullseye(583, 356, 6)
      svg.text('HERE', 550, 418)
    } else {
      const tb = prb(0.5)
      const mid = !tb || prb(0.5)
      if (prb(0.5)) {
        tb && arrowWest(505, 280, 0.7)
        svg.text('BURN', 550, 322)
        mid && arrowWest(505, 335, 0.7)
        svg.text('HERE', 550, 375)
        tb && arrowWest(505, 390, 0.7)
      } else {
        tb && arrowEast(665, 323, 0.7)
        svg.text('BURN', 550, 322)
        mid && arrowEast(665, 378, 0.7)
        svg.text('HERE', 550, 375)
        tb && arrowEast(665, 433, 0.7)
      }
    }
  }

  if (sectionFeatures.rightBurnHere) {
    svg.text('BURN', 1090, 294)
    svg.text('HERE', 1090, 340)
    prb(0.5)
      ? arrowWest(1090, 380, 0.35)
      : arrowEast(1155, 400, 0.35)

  }


  if (sectionFeatures.cutHere) verticalCut()

  if (sectionFeatures.showHash)
    svg.text(tokenData.hash.toUpperCase(), 480, 57, {size: 0.2})


  if (isWorthless)
    worthless()

  if (isHawaii)
    hawaii()

  if (usaHighlights)
    usaText(sample([pen.red, pen.orange, pen.teal, pen.pink]))



  const topHighlight = prb(0.5)
  const bottomHiglight = prb(0.5)
  const highlightColor1 = rndHighlighter()
  const highlightColor2 = rndHighlighter()

  if (topHighlight) {
    bigOne(81, 98, highlightColor1)
    bigOne(1604, 88, highlightColor1)
  }
  if (bottomHiglight) {
    smallOne(1618, 553, highlightColor1)
    smallOne(77, 548, highlightColor1)
  }

  if (!drawBoner && prb(0.05)) {
    bottomTxt(544, 632, prb(0.5) ? highlightColor1 : highlightColor2)
  }
  if (prb(0.05)) {
    topTxt(413, 7, prb(0.5) ? highlightColor1 : highlightColor2)
  }

  if (!doodleHereLeft && !doodleHereRight && prb(0.333)) {
    svg.drawCircle(412, 351, 50, {stroke: 'none', fill: highlightColor2})
    svg.drawPath(1260, 354, shield, {stroke: 'none', fill: highlightColor2})
  }

  if (drawBoner) {
   boner()
  }

  if (randomSymbols) times(45, i => {
    prb(0.1)
      ? svg.text("$", rnd(50, 1700), rnd(50, 650))
      : drawSingleSymbol(rnd(50, 1700), rnd(50, 650), rndSymbolName())
  })


  if (drawGrid) {
    const xBars = rndint(15, 30)
    const stroke = sample(penColorsAll)
    times(xBars, t => {
      const x = (t+1)*svg.w/(xBars+1)

      svg.drawLine(x, 0, x, svg.h, {stroke})
    })

    const yBars = rndint(5, 10)
    times(yBars, t => {
      const y = (t+1)*svg.h/(yBars+1)

      svg.drawLine(0, y, svg.w, y, {stroke})
    })
  }
}






const rndText = (x, y) => {
  // FEATURES['Has Message'] = true
  chance(
    [1, () => svg.text("LOSER", x+115, y, {size: 0.45})],
    [1, () => svg.text("WINNER", x+115, y, {size: 0.45})],
    [1, () => svg.text("TIME = MONEY", x+35, y, {size: 0.45})],
    [1, () => svg.text("MONEY = SLAVERY", x+5, y, {size: 0.45})],
    [1, () => svg.text("LUCKY DOLLAR", x+45, y, {size: 0.45})],
    [1, () => svg.text("GOOD LUCK!", x+65, y, {size: 0.45})],
    [1, () => {
      svg.text("MONEY MAKES THE", x+55, y-5)
      svg.text("WORLD GO ROUND", x+60, y+20)
    }],
    [1, () => {
      svg.text("DON'T BELIEVE", x+90, y-5)
      svg.text("THE LIBERAL MEDIA", x+55, y+22)
    }],
    [1, () => {
      svg.text("ANOTHER DAY", x+100, y-5)
      svg.text("ANOTHER DOLLAR", x+75, y+22)
    }],
    [1, () => svg.text("ABOLISH THE FED", x+10, y, {size: 0.45})],
    [1, () => {
      svg.text("ACCEPT JESUS CHRIST AS", x+2, y-5)
      svg.text("YOUR LORD AND SAVIOUR", x+7, y+20)
    }],
    [1, () => svg.text("SEEK FINANCIAL FREEDOM", x+5, y)],
    [1, () => svg.text("FOLLOW THE INSTRUCTIONS", x+5, y)],
    [1, () => svg.text("666", x+110, y, {size: 0.65})],
    [1, () => svg.text("$$$$$$$$$$$$$$", x+10, y, {size: 0.45})],
    [1, () => svg.text("DO NOT SPEND", x+35, y, {size: 0.45})],
    [1, () => svg.text("SPEND WISELY", x+35, y, {size: 0.45})],
    [1, () => svg.text("SPEND ME", x+105, y, {size: 0.45})],
    [1, () => svg.text("SELL ME", x+105, y, {size: 0.45})],
    [1, () => svg.text("RETURN TO CIRCULATION", x+5, y,)],
    [1, () => svg.text("DON'T GO TO JAIL", x+5, y, {size: 0.45})],
    [1, () => svg.text("BURN AFTER READING", x+55, y+10,)],
    [1, () => svg.text("BUY BITCOIN", x+65, y, {size: 0.45})],
    [1, () => svg.text("PUNCH A NAZI", x+10, y, {size: 0.45})],
    [1, () => {
      svg.text("TAKE THE MONEY", x+70, y-5)
      svg.text("AND RUN", x+70, y+20)
    }],
    [1, () => {
      svg.text("STOP THROWING", x+100, y-5)
      svg.text("YOUR MONEY AWAY", x+70, y+20)
    }],
    [1, () => svg.text("DO YOUR OWN RESEARCH", x+10, y)],
    [1, () => {
      svg.text("MAKE CASH FAST AT", x+50, y-10, {size: 0.3})
      svg.text("WWW.FASTCASHMONEYPLUS.BIZ", x-20, y+20, {size: 0.3})
    }],
    [1, () => {
      svg.text("DON'T THINK ABOUT WHERE", x-4, y-7, {size: 0.3})
      svg.text("THIS DOLLAR HAS BEEN", x+20, y+20, {size: 0.3})
    }],
    [1, () => {
      svg.text("CASH RULES", x+100, y-10, {size: 0.3})
      svg.text("EVERYTHING AROUND ME", x+20, y+20, {size: 0.3})
    }],
    [1, () => {
      svg.text("TEXT 1.848.225.7281", x+50, y-10, {size: 0.3})
      svg.text("FOR A GOOD TIME", x+70, y+20, {size: 0.3})
    }],
    [1, () => svg.text("CASH IS KING", x+35, y, {size: 0.45})],
  )()
}

const hArrows = (x, y) => chance(
  [1, () => {
    arrowWest(x+5, y+5, 0.8)
    arrowEast(x+352, y+52, 0.8)
  }],
  [1, () => {
    arrowWest(x+232, y+5, 0.8)
    svg.text('.', x+210, y+13)
    arrowEast(x+192, y+52, 0.8)
  }],
  [1, () => {
    arrowWest(x+72, y+10, 0.8)
    arrowEast(x+282, y+40, 0.8)
  }],
)()

const symbolRow = (x, y, max=7, scale=1) => {
  const sym = prb(0.4) ? rndSymbolName() : false
  const syms = rndint(1,max)
  times(syms, _x =>
    drawSingleSymbol(x + _x*58 + (406-syms*58)/2, y, sym || rndSymbolName(), scale)
  )
}


const drawSerial = (x, y, prepend='') => svg.text(
  prepend + times(8, () => rndint(10)).join('') + rndChar(),
  x,
  y,
  {size: 0.6, stroke: pen.green }
)

const arrowRow = (x, y, t) => prb(0.5)
  ? times(t, i => arrowEast(x + i*85 + 60, y + 20, 0.3))
  : times(t, i => arrowWest(x + i*85, y, 0.3))


const leftPadZeros = n => {
  const digits = n.toString().length
  return times(7-digits, d => '0').join('') + n
}

// 5, 6, 17, 19

const sectionFns = {
  [0]: noop,
  [1]: (features) => {
    chance(
      [1, (features) => {
        svg.drawRect(630, 135, 230, 30)
        svg.text('1', 635, 142, {size: 0.2})
      }],
      [20, noop],
      [!features.cutHere && 2, () => svg.text(prb(0.5) ? 'SUCKS' : 'RULES', 800, 142, {size: 0.3})],
    )()


  },
  [2]: (features) => {
    if (features.wheresGeorgeOverride) {
      prb(0.75) && symbolRow(155, 213, 5)
    }
    else chance(
      [1, () => {
        svg.drawRect(248, 200, 430, 50)
        svg.text('2', 253, 202)
      }],
      [22, () => rndText(253, 213)],
      [2, () => arrowRow(253, 213, 5)],
      [3, () => symbolRow(253, 213)],
      [2, () => hArrows(248, 200)],
      [1, noop],
    )()
  },
  [3]: () => {
    chance(
      [1, () => {
        svg.drawRect(263, 260, 55, 80)
        svg.text('3', 268, 262)
      }],
      [3, () => drawSingleSymbol(255, 295, rndSymbolName())],
      [8, noop],
    )()

  },
  [4]: (features) => {

    if (!features.wheresGeorgeOverride && !features.leftBurnHere) chance(
      [1, () => {
        svg.drawRect(506, 265, 153, 185)
        svg.text('4', 511, 267)
      }],
      [12, () => {
        const sym = prb(0.4) ? rndSymbolName() : false
        times(3, x =>
          times(3, y => {
            drawSingleSymbol(495 + x*58, 273+y*60, sym || rndSymbolName())
          })
        )
      }],
      [4, () => times(3, y => symbolRow(380, 273+y*60, 4))],
      [7, () => {
        const sym = rndSymbolName()
        if (sym === '$') svg.text('$', 527, 255, {size: 3})
        else drawSingleSymbol(460 , 278, sym, 4)
      }],
      [1, () => {
        // FEATURES['Dick Count'] += 1
        prb(0.5)
          ? svg.drawPath(615 , 500, dick, {size: 0.65, rotation: 240})
          : svg.drawPath(625 , 265, dick, {size: 0.55, rotation: 90})

      }],

      [1, noop],
    )()

  },
  [5]: () => {
    chance(
      [1, () => {
        svg.drawRect(123, 352, 195, 100)
        svg.text('5', 128, 354)
      }],
      [7, () => {
        drawSingleSymbol(185, 363, rndSymbolName())
        arrowWest(242, 363, 0.5)
        arrowEast(189, 390, 0.5)
        arrowNorth(233, 410, 0.5)
        arrowSouth(202, 350, 0.5)
      }],
      [3, () => {
        times(2, y => symbolRow(10, 358+y*60, 4))
      }],
      [6, () => {
        const sym = prb(0.4) ? rndSymbolName() : false

        times(3, x =>
          times(2, y => {
            drawSingleSymbol(123 + x*58, 352+y*60, sym || rndSymbolName())
          })
        )
      }],
      [2, () => {
        // FEATURES['Dick Count'] += 1
        prb(0.5)
          ? svg.drawPath(123, 352, dick, {size: 0.5})
          : svg.drawPath(300, 430, dick, {size: 0.5, rotation: 180})
      }],
      [1, noop]
    )()

  },
  [6]: () => {
    chance(
      [1, () => {
        svg.drawRect(123, 461, 76, 40)
        svg.text('6', 128, 463)
      }],
      [3, () => {
        drawSingleSymbol(128, 468, rndSymbolName())
      }],
      [10, noop]
    )()
  },
  [7]: (features) => {
    if (!features.isStarNote) {
      chance(
        [20, noop],
        [1, () => {
          svg.drawRect(578, 461, 73, 42)
          svg.text('7', 578+5, 461+2)
        }],
      )()
    }



  },
  [8]: () => {
    chance(
      [1, () => {
        svg.drawRect(250, 510, 390, 35)
        svg.text('8', 255, 512)
      }],
      [2, () => symbolRow(245, 515)],
      [2, () => rndText(250, 522)],
      [1, () => arrowRow(243, 517, 5)],
      [1, () => svg.text('03542754', 254, 461, {size: 0.6, stroke: pen.green })],
      [3, () => drawSerial(255, 512)],
      [2, () => {
        svg.text('$$$$$$$$', 255, 512, {size: 0.6, stroke: pen.green })
      }],
      [1, noop]
    )()
  },
  [9]: (features) => {
    if (!features.isBizCard) {
      chance(
        [1, () => {
          svg.drawRect(186, 588, 100, 40)
          svg.text('9', 191, 590)
        }],
        [3, () => {
          svg.text('ID ' + leftPadZeros(tokenData.tokenId), 220, 600, {size: 0.4})
          // FEATURES['Token ID'] = true
        }],
        [3, noop],
        [3, () => {
          drawSingleSymbol(200, 595, rndSymbolName())
        }]
      )()
    }

  },
  [10]: (features) => {
    if (!features.cutHere && prb(0.05)) {
      svg.drawRect(885, 135, 220, 30)
      svg.text('10', 890, 137, {size: 0.2})
    }

  },
  [11]: () => {
    chance(
      [1, () => {
        svg.drawRect(1110, 135, 380, 50)
        svg.text('11', 1115, 137)
      }],
      [2, () => drawSerial(1117, 143)],
      [1, () => arrowRow(1080, 155, 5)],
      [3, () => symbolRow(1080, 143, 8)],
      [2, () => rndText(1070, 145)],
      [1, () => svg.text('03542754', 1158, 190, {size: 0.6, stroke: pen.green })],
      [2, () => {
        svg.text('$$$$$$$$$$', 1110, 143, {size: 0.6, stroke: pen.green })
      }],
      [1, noop]
    )()


  },
  [12]: () => {
    chance(
      [5, noop],
      [1, () => {
        svg.drawRect(1065, 179, 45, 55)
        svg.text('12', 1070, 181)
      }],
      [6, () => drawSingleSymbol(1053, 194, rndSymbolName())],
    )()

  },
  [13]: (features) => {
    if (!features.isStarNote) {
      chance(
        [1, noop],
        [1, () => {
          svg.drawRect(1475, 191, 35, 100)
          svg.text('13', 1475+5, 191+2)
        }],
      )
    }

  },
  [14]: (features) => {
    !features.rightBurnHere && chance(
      [4, noop],
      [1, () => {
        svg.drawRect(1078, 241, 100, 240)
        svg.text('14', 1083, 243)
      }],
      [1, () => {
        // FEATURES['Dick Count'] += 1
        drawSingleSymbol(1090, 263, rndSymbolName())
        svg.drawPath(1150, 333, dick, {size: 0.4, rotation: 90})
      }],
      [1, () => {
        // FEATURES['Dick Count'] += 1
        drawSingleSymbol(1090, 263, rndSymbolName())
        svg.drawPath(1100, 463, dick, {size: 0.4, rotation: 270})
      }],
      [5, () => {
        drawSingleSymbol(1100, 436, rndSymbolName())
        arrowSouth(1108, 426, 0.8)
      }],
      [5, () => {
        drawSingleSymbol(1073, 278, rndSymbolName())
        arrowNorth(1133, 337, 0.8)
      }],
      [5, () => {
        times(4, y => {
          symbolRow(920, 275 + y*60, 3)
        })
      }]
    )()



  },
  [15]: () => {
    chance(
      [5, () => {
        svg.drawRect(1189, 241, 275, 60)
        svg.text('15', 1189+5, 241+2)
      }],
      [10, () => svg.text('MARFA,TX', 1200, 250, {size: 0.5, stroke: pen.red})],
      [25, () => symbolRow(1100, 240, 7, 0.7)],
      [5, () => arrowRow(1108, 240, 5)],
      [60, noop],
    )()
  },
  [16]: () => {
    chance(
      [1, () => {
        svg.drawRect(1525, 261, 54, 76)
        svg.text('16', 1527, 263)
      }],
      [3, () => drawSingleSymbol(1507, 263, rndSymbolName())],
      [10, noop],

    )()
  },
  [17]: () => {
    chance(
      [1, () => {
        svg.drawRect(1450, 348, 150, 115)
        svg.text('17', 1455, 350)
      }],
      [15, () => {
        const sym = prb(0.4) ? rndSymbolName() : false

        times(2, x =>
          times(2, y => {
            drawSingleSymbol(1470 + x*58, 348+y*60, sym || rndSymbolName())
          })
        )
      }],
      [8, () => {
        const sym = prb(0.4) ? rndSymbolName() : false
        drawSingleSymbol(1455, 360, rndSymbolName(), 2.5)
      }],
      [3, noop]
    )()
  },
  [18]: () => {
    chance(
      [1, () => {
        svg.drawRect(1109, 497, 465, 35)
        svg.text('18', 1114, 500)
      }],
      [22, () => rndText(1114, 505)],
      [3, () => symbolRow(1114, 505, 8)],
      [2, () => arrowRow(1110, 505, 6)],
      [1, () => hArrows(1109, 497)],
      [1, noop],
    )()
  },
  [19]: (features) => {
    if (!features.isBizCard) {
      chance(
        [1, () => {
          svg.drawRect(1443, 590, 115, 40)
          svg.text('19', 1448, 592)
        }],
        [3, () => {
          drawSingleSymbol(1480, 590, rndSymbolName())
        }],
        [10, noop]
      )()

    }

  },
}







function drawSections(sections, features) {
  sections.forEach(s => s !== false && sectionFns[s](features))
}


function cut(x1, y1, x2, y2, stroke) {
  const {d, angle} = lineStats(x1, y1, x2, y2)

  let x = x1
  let y = y1
  for (let i=0; i < d; i+= 27) {
    const [_x, _y] = getXYRotation(angle, 18, x, y)
    svg.drawLine(x, y, _x, _y, {stroke})
    ;([x, y] = getXYRotation(angle, 27, x, y))
  }
}

function boner() {
  const stroke = sample([pen.black, pen.blue, pen.red])
  const lineStroke = stroke == pen.red
    ? sample([pen.black, pen.blue])
    : sample([pen.red, pen.green])

  svg.text("B", 510, 633, { size: 0.85, strokeWidth: 12/0.85, stroke})
  svg.text("R", 765, 633, { size: 0.85, strokeWidth: 12/0.85, stroke})

  svg.drawLine(810, 645, 1190, 645, {strokeWidth: 12, stroke: lineStroke})
  svg.drawLine(810, 660, 1190, 660, {strokeWidth: 12, stroke: lineStroke})
  svg.drawLine(810, 675, 1190, 675, {strokeWidth: 12, stroke: lineStroke})
}

function worthless() {
  const stroke = penBase === pen.black
    ? pen.red
    : sample([pen.black, pen.red, pen.blue])

  const rect = svg.drawRect(150, 250, 1500, 220, { strokeWidth: 12.5, stroke })
  const text = svg.text('WORTHLESS',180, 270, { size: 2.5, strokeWidth: 5, stroke})

  if (prb(0.4)) {
    const rotation = sample([-12, 12])
    ;[rect, text].forEach(el => {
      el.setAttribute('transform-origin', 'center')
      el.setAttribute('style', `transform: rotate(${rotation}deg)`)
    })
  } else if (prb(0.6)) {
      rect.setAttribute('style', `transform: translate(-30px, 155px)`)
      text.setAttribute('style', `transform: translate(-30px, 155px)`)

  }
}

function hawaii() {
  const stroke = sample([pen.black, pen.red, pen.blue])
  const text = svg.text('HAWAII',180, 270, { size: 4, strokeWidth: 3, stroke})
}

function verticalCut() {
  const xOff = rnd(-300, 300)
  const stroke = pen.black
  cut(872+xOff, 0, 872+xOff, 702, stroke)


  arrowWest(885+xOff, 140, 0.3, stroke)

  if (prb(0.75)) {
    // FEATURES.Cut = true
    svg.text('CUT HERE', 950+xOff, 140, {stroke})
  } else {
    // FEATURES.Rip = true
    svg.text('RIP HERE', 950+xOff, 140, {stroke})
  }

}

