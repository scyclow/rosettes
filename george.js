
const drawn = {}
const bowPath = 'M34.25 16.25L66.5 3V29.5L34.25 16.25ZM34.25 16.25L2 29.5V3L34.25 16.25ZM39 16C39 18.2091 37.5637 19.2408 34.25 19.2408C30.9363 19.2408 29 18.2091 29 16C29 13.7909 30.9363 13.2392 34.25 13.2392C37.5637 13.2392 39 13.7909 39 16Z'
const heartOutline = 'M53.5297 19C55.7548 13.8277 63 16.0492 63 7.65301C63 -0.743188 56.2441 1.02626 53.5297 7.65301C50.8691 0.469987 44.9196 0.516622 44.0588 7.65303C43.1981 14.7894 52.0421 15.5634 53.5297 19Z'

const glasses = (x, y, fill) => (drawn.glasses = true, svg.drawPath(x, y, 'M23 1.50149V19.5015H52V1.50149M23 1.50149H52M23 1.50149L0.5 5.49984M52 1.50149C60.0197 0.553727 63.9513 0.877725 69.5 3.50149M69.5 3.50149V17.5015H89.5V3.50149M69.5 3.50149H89.5M89.5 3.50149H94.5', {fill}) )
const noseRing = (x, y) => (drawn.noseRing = true, svg.drawPath(x, y, 'M2.44092 1C-1.3 14.6058 20.1694 9.5819 13.9409 1') )
const earring = (x, y) => (drawn.earring = true, svg.drawPath(x, y, 'M5.5 1.5C-5.5 12 17.5 16 11 3') )
const thinStache = (x, y) => (drawn.thinStache = true, svg.drawPath(x, y, 'M25 1.5C26.3347 3.82597 29.8023 5.41655 39 8.5M19.5 1.5C14.2064 5.74858 9.52486 6.27014 1 7') )
const curlyStache = (x, y) => (drawn.curlyStache = true, svg.drawPath(x, y, 'M25.0013 7C6.47068 11.0113 1.78334 9.45917 2.00131 0.5M35.5013 7C43.8097 8.9582 47.6376 9.15325 48.0013 2.5') )
const walrusStache = (x, y) => (drawn.walrusStache = true, svg.drawPath(x, y, 'M2 16L6.5 5V15.2297L11 5L10.5 15L15 5V15L19 5L19.5 14.5L22.5 7L23.5 13.5L26.5 7L27.5 13.5L30 7.5L31.5 13.5L33.5 7L35.5 13.5L36.5 6L40 14V5.5L44.5 16') )
const xEyes = (x, y) => (drawn.xEyes = true, svg.drawPath(x, y, 'M2 2L16 17M2 17L16 2M45.5 2L58.5 16M45.5 15L59.5 3') )
const tongue = (x, y) => (drawn.tongue = true, svg.drawPath(x, y, 'M1.5 2C8 21 26 16.5 13 2M8.5 3.5L12 9') )
const heartEyes = (x, y) => (drawn.heartEyes = true, svg.drawPath(x, y, heartOutline + 'M10 16.5L20 9L17 3.5L12.6738 9.71888M12.6738 9.71888L10.3233 13.0977M12.6738 9.71888L11 10.5L6.5 3.5L3 8L9 15L10.3233 13.0977M12.6738 9.71888L18.5 7L11 14L10.3233 13.0977M10.3233 13.0977L5 6M52 16.5L62 9L59 3.5L54.6738 9.71888M54.6738 9.71888L52.3233 13.0977M54.6738 9.71888L53 10.5L48.5 3.5L45 8L51 15L52.3233 13.0977M54.6738 9.71888L60.5 7L53 14L52.3233 13.0977M52.3233 13.0977L47 6M11.5297 19C13.7548 13.8277 21 16.0492 21 7.65301C21 -0.743188 14.2441 1.02626 11.5297 7.65301C8.8691 0.469987 2.91961 0.516622 2.05884 7.65303C1.19807 14.7894 10.0421 15.5634 11.5297 19Z', {stroke: pen.red}) )
const monocole = (x, y) => (drawn.monocole = true, svg.drawPath(x, y, 'M8.64934 14.9907C0.665386 80.9926 -0.171216 103.715 8.64934 103.991M34.5 14.5C34.5 21.4036 28.6797 27 21.5 27C14.3203 27 8.5 21.4036 8.5 14.5C8.5 7.59644 14.3203 2 21.5 2C28.6797 2 34.5 7.59644 34.5 14.5Z') )
const smile = (x, y) => (drawn.smile = true, svg.drawPath(x, y, 'M2 0.5C9 24.5 45 27.5 52.5 0.5') )
const frown = (x, y) => (drawn.frown = true, svg.drawPath(x, y, 'M2 14.5C14.5 -3 42 -2.5 51 14.5') )
const openMouth = (x, y) => (drawn.openMouth = true, svg.drawPath(x, y, 'M34.0082 9.24C33.8817 -0.880564 1.65107 0.0684443 2 9.24M34.0082 9.24C34.1347 19.3519 2.35465 18.4029 2 9.24M34.0082 9.24C23.502 2.73828 14.002 3.23828 2 9.24M34.0082 9.24C22.3956 15.4646 15.492 15.7175 2 9.24M34.0082 9.24C21.8452 6.6788 14.7947 6.86681 2 9.24M34.0082 9.24C21.5215 11.6867 14.5138 11.6473 2 9.24M34.0082 9.24H2') )
const cigarette = (x, y) => (drawn.cigarette = true, svg.drawPath(x, y, 'M19.5 29C19.5 23 20 18.5 24.5 15C29 11.5 29 5 27.5 0.5M4 21.5L15 35.5L17 34.5L6.5 21.5H4Z') )
const weary = (x, y) => (drawn.weary = true, svg.drawPath(x, y, 'M31.5 1C25.5725 8.59713 13.809 11.1222 1.5 3M51 3C59.8481 8.52096 67.5 7 71 1') )
const angry = (x, y) => (drawn.angry = true, svg.drawPath(x, y, 'M1 2L32 14M45 14L66 5') )
const worried = (x, y) => (drawn.worried = true, svg.drawPath(x, y, 'M1 10L28.5 1.5M46.5 3L68 11') )
const devilHorns = (x, y, fill) => (drawn.devilHorns = true, svg.drawPath(x, y, 'M35.4914 75C7.14021 72.8917 -9.90881 24.6777 11.4938 2C0.523006 10.6718 18.5087 52.354 45.4922 53.5M112.992 58.5C127.411 57.4814 141.448 35.5505 138.492 18.5C148.962 31.8447 139.501 71.284 123.492 75', {fill}) )
const laserEyes = (x, y, stroke) => (drawn.laserEyes = true, svg.drawPath(x, y, 'M52 225.5L5.5 9.5M5.5 9.5L82.5 249M5.5 9.5L63 225.5M132 231L51 9.5M51 9.5L167 249M51 9.5L144 225.5M4 3.5C4 3.5 4.82145 7.38905 0.5 7.5C4.47272 6.96133 5.63473 8.84932 2 13.5C4.98321 9.6911 6.55394 9.41585 9 15.5C6.44207 10.1092 6.64295 8.14132 13 8.5C7.89073 8.13069 6.96761 6.93684 10.5 2C7.91268 6.15767 4 3.5 4 3.5ZM49 4.5C48.3386 6.7922 46.4553 7.45798 44.5 7C47.2433 8.06978 47.115 9.12035 45 11.5C47.4353 9.91167 49.2133 11.0369 50 13.5C48.3994 10.1406 50.299 8.59907 53.5 7C50.3831 9.25969 48.7515 8.82817 49 4.5Z', {stroke}) )
const mohawk = (x, y, fill) => (drawn.mohawk = true, svg.drawPath(x, y, 'M30.5 121.498C59.8854 100.262 77.878 91.0917 117.5 113L146 38.5L102.5 87L117.5 1.5L81.5 82L70.5 5L61.5 82L36.5 19.5L43 90.5L14 46L30.5 95.5L2 73.5L30.5 121.498Z', {fill}) )
const teardrops = (x, y) => (drawn.teardrops = true, svg.drawPath(x, y, 'M3.51603 12.5C2.01664 9.5 4.09322 7.2308 5.51603 5C5.97198 8.34368 9.01586 9.5 9.01603 12.5C9.01619 15.5 5.01541 15.5 3.51603 12.5ZM2.49945 26.5C2.00029 24 2.85254 21.9254 4.49572 20C5.55425 23.2727 7.50007 24 7.5 26.5C7.49993 29 2.99862 29 2.49945 26.5Z') )
const bowtie = (x, y) => (drawn.bowtie = true, svg.drawPath(x, y, bowPath) )
const hairBow = (x, y) => (drawn.hairBow = true, svg.drawPath(x, y, bowPath, { rotation: -30}) )
const tie = (x, y) => (drawn.tie = true, svg.drawPath(x, y, 'M23 27.5518L44 58.5518L46.5 100.5M23 27.5518C20.0707 27.3425 17.3926 27.5859 16.5 27.5518M23 27.5518C26.6937 20.2811 28.7889 16.2464 29.6107 10.5M12 27.5518L10 58.5518L19 97.0518M12 27.5518C11.66 26.8293 11.3269 26.1235 11 25.4307M12 27.5518C16.0707 27.261 15.2596 27.5043 16.5 27.5518M14.5 33L23 36L16.5 41L28.5 44.5L16.5 50.5L34 55L13.5 61.5L40.5 63L16.5 69.5L41.5 70.5L19 76.5L41.5 80L21 85L39.5 88.5L25 93.5L38 98.5M4.86895 11.5C3.88301 8.92111 2.93552 6.16805 2 3.05108C6.04551 2.30195 9.43946 1.95633 12.6733 2.0044M4.86895 11.5L12.6733 2.0044M4.86895 11.5C5.86794 14.113 6.9064 16.5472 8.01188 19M12.6733 2.0044C17.1538 2.071 21.327 2.89333 26.5 4.44528M8.01188 19L20 3.05108M8.01188 19C8.95361 21.0894 9.94397 23.1923 11 25.4307M11 25.4307L26.5 4.44528M26.5 4.44528C27.6158 4.78002 28.7781 5.14871 30 5.55108C29.9535 7.37685 29.8257 8.99697 29.6107 10.5M16.5 27.5518L29.6107 10.5') )
const chinBeard = (x, y) => (drawn.chinBeard = true, svg.drawPath(x, y, 'M91 12V35L87.5 20.5V46.5L82.5 27.5V50L78 31L79 53L73.5 35L74.5 56.5L69 37.5L69.5 59.5L63.5 39V61L59 39L57.5 62.5L53.5 39L51 61L48 39L45 59.5L42.5 37.5L39.5 58L36.5 36L33.5 54.5L31 33L29 51L26 29L24.5 48L20 26L18.5 43.5L15.5 22L13.5 36L10.5 16.5L8.5 31L6.5 7.5L4 26L2 1') )
const soulPatch = (x, y) => (drawn.soulPatch = true, svg.drawPath(x, y, 'M3.5 2.5C8.88348 3.27947 9.15105 2.99096 12 2.5C9.86017 5.50735 9.68905 5.84348 8 10.5C6.51783 6.18994 6.65564 6.71404 3.5 2.5ZM3.5 2.5L10 6') )
const goatee = (x, y) => (drawn.goatee = true, svg.drawPath(x, y, 'M4.49812 7.00882C9.99614 2.50988 17.7537 2.02124 28.4981 2.5C39.1787 1.8117 46 3.00692 48.9981 11.5088C51.9963 20.0107 42.5 43.0069 42.5 43.0069L39.5 33.5069L38.5 45.5088L34.5 34.0069L31.5 45.5088L28.4981 35.0088L26 45.5088L22.5 35.0088L20 45.5088L16.9981 35.0088L15.4981 45.5088L10.4981 35.0088C4.11023 24.7905 -0.999901 11.5078 4.49812 7.00882Z') )
const eyePatch = (x, y) => (drawn.eyePatch = true, svg.drawPath(x, y, 'M23.0001 15.997C19.9977 40.997 50.9969 41.497 47.5001 15.997M23.0001 15.997C32.7463 14.0114 37.6347 13.7655 47.5001 15.997M23.0001 15.997L1 12M47.5001 15.997L93.5 2M31.5 24H39M24 18.5C32.7618 16.8059 37.7341 16.9531 46.5 18.5C44 35.5 28.5 38 24 18.5ZM27.5 20.5C33.7716 19.5876 37.2284 19.581 43.5 20.5C39 32.5 31.5 32 27.5 20.5ZM30 23C32.9241 22.0567 38.0752 22.1651 41 23C36.7012 27.5628 34.2774 27.7941 30 23Z') )
const hair = (x, y, fill) => (drawn.hair = true, svg.drawPath(x, y, 'M76.4987 127.002L73.9987 144.502L52.4987 129.002L34.4987 125.002C-6.26369 98.7738 -10.3728 86.7305 21.4987 71.002C16.5703 61.8103 16.6944 56.8903 26.9987 49.002C21.3345 34.4677 29.2392 27.9147 54.9987 18.5C56.4919 8.85742 68.8951 3.05579 107.499 0C140.018 11.4531 155.45 27.3508 173.499 65.502L190.999 101.002C195.667 113.1 186.133 121.538 166.499 134.002C163.75 131.54 170.9 103.681 163.999 85.002C165.44 67.4975 163.99 57.7337 155.499 40.502C138.812 24.2123 131.278 20.8479 122.499 30.0019C94.7677 22.4173 81.8787 20.2506 84.4987 36.502C81.7407 49.5935 82.7571 54.6747 90.9987 58.502C77.1751 65.7495 75.8465 73.9812 73.9987 89.002L76.4987 127.002Z', {fill}) )
const blouse = (x, y, fill) => (drawn.blouse = true, svg.drawPath(x, y, 'M26.4975 65.5C1.03585 35.826 -2.27449 22.1124 2.4975 0.5C37.9897 53.9867 59.2908 60.4162 89.9975 42.5V61L102.998 69V88.5L112 98.5L126 147L108.998 160.5C90.4454 152.554 78.5551 149.768 53.4975 149.5L35.5 102L23 83L26.4975 65.5Z', {fill}) )
const mouthDick = (x, y, fill) => (
  drawn.mouthDick = true,
  // FEATURES['Dick Count'] += 1,
  svg.drawPath(x, y, dick, {size: 0.4})
)
const lips = (x, y, fill) => (drawn.lips = true, svg.drawPath(x, y, 'M2 9.99855C2 2.49961 16 -1 22 5.49904C29.5 -0.000823498 39.5 4.9997 37 10.9961M2 9.99855C17.9928 20.5673 25.0753 18.2676 37 10.9961M2 9.99855C22.5762 9.4183 29.6245 9.29665 37 10.9961') )
const eyeLashes = (x, y, fill) => (drawn.eyeLashes = true, svg.drawPath(x, y, 'M6.5 11.5L1.5 6.5M12 8L9.5 1.5M19.5 8L20.5 1.5M25 9.5L29 4.5M8.5 17L6.5 22.5M14 17L13.5 22.5M19.5 16.5L20.5 21.5M24.5 16L27 20M54 10L52.5 5.5M58.5 8V3.5M62.5 8L64 4M66.5 9.5L69 7M54.5 15L53 17.5M58.5 16.5V20M62.5 16L63 19M65.5 15L68 17') )
const crossNecklace = (x, y) => (drawn.crossNecklace = true, svg.drawPath(x, y, 'M2 1C34.9011 50.5943 55.0319 73.7645 69 72.6721M89.5 43C83.9907 61.9287 77.6872 71.9928 69 72.6721M69 72.6721V108.5M59.5 85.5H78.5') )
const buckTeath = (x, y) => (drawn.buckTeath = true, svg.drawPath(x, y, 'M2.49911 0.5C1.44883 10.7107 11.4651 10.8965 11 0.5C10.8793 10.3154 19.5 10.5 18.5 0.5') )
const headband = (x, y) => (drawn.headband = true, svg.drawPath(x, y, 'M3.51294 10C3.19192 11.5842 2.16424 12.3208 2.50022 14C59.6424 16.6836 89.0307 15.8141 138.501 13C138.461 11.4789 138.117 11.4286 137.013 9.5M3.51294 10C59.3175 12.7821 86.7976 12.0855 137.013 9.5M3.51294 10C4.0438 7.38021 4.51292 8 5.51292 5.5M137.013 9.5C135.976 7.68798 136.2 8.55162 133.514 5.5M5.51292 5.5C7.70701 3.2704 6.56305 3.01461 10.0129 2C55.9138 5.51114 87.5951 5.40263 130.013 2C131.792 3.88855 132.228 4.03965 133.514 5.5M5.51292 5.5C55.8989 9.26729 85.1925 9.219 133.514 5.5') )
const headphones = (x, y) => (drawn.headphones = true, svg.drawPath(x, y, 'M11 74C11 -30.5 142 -13.5 131.5 77.5M11 74C19.76 74.76 22.6 77.62 24 87C23.834 93.635 17.5 97 11 97C4.5 97 1.5 91 1.5 85.5C1.5 80 5.036 76.5 11 74ZM131.5 77.5C129.1 85.36 130.331 93.8764 131.5 97.5C132.669 101.12 135.245 86.4034 131.5 77.5ZM12.5 78C16 78 19.5 82.5 19.5 85.5C19.5 88.5 17 92.5 12.5 92.5C8 92.5 6 88.5 6 85.5C6 82.5 9 78 12.5 78ZM12.5 82C14.469 82.7096 15.3538 83.4413 15.5 84.9929C15.5972 87.4885 14.3499 87.5467 12.5 88C10.9347 87.7131 10.6689 87.7331 10 85C10.4812 83.0244 10.2989 81.9706 12.5 82Z') )
const muttonChops = (x, y) => (drawn.muttonChops = true, svg.drawPath(x, y, 'M98 54L93 51L99.5 49L96.5 47L101 44.5L98 41.5L102.5 40.5L99.5 36.5L102.5 34L99.5 30L102.5 28.5L99.5 25.5L102.5 23M3.5 2H9L5.5 7.5H10.5L5.5 13.5L12.5 12.5L7 18.5L14.5 17L5.5 26L17.5 23.5L7 34L21.5 28.5L7 40.5L24.5 34L10.5 45.5L28 39L14.5 51.5L32.5 44L17.5 56.5L36.5 48L21.5 59.5') )



const clownNose = (x, y) => {
  drawn.clownNose = true
  times(7, i => {
    svg.drawCircle(x, y, i*3, {stroke: i===6? pen.black : pen.red})
  })
}
const gag = (x, y) => {
  drawn.gag = true
  svg.drawPath(x, y, 'M1 1.5C49.5 19.5 72.499 18.408 91.5 9.5')
  times(6, i => {
    svg.drawCircle(x+90, y+25, i*3, {stroke: i===5? pen.black : pen.red})
  })
}

const beautyMark = (x, y) => svg.text('.', x, y)
const starEyes = (x, y) => {
  svg.drawPath(x, y, star, {size: 0.5})
  svg.drawPath(x+70, y+3, star, {size: 0.43})
}

const doubleEyes = (x, y) => {
  svg.drawPath(x, y, eye, {size: 0.92})
  svg.drawPath(x+70, y+2, eye, {size: 0.75})
}



const $Eyes = (x, y) => {
  svg.text("$", x, y, {size: 0.42})
  svg.text("$", x+65, y+2, {size: 0.37})
}


function drawFace() {
  const drawMouth = prb(0.7)
  const drawEyes = prb(0.7)
  const drawTorso = prb(0.35)

  const drawStache = prb(0.15)
  const drawHair = prb(0.3)
  const drawEyebrows = prb(0.1)
  const drawCheek = prb(0.1)
  const drawBeard = prb(0.125)
  const drawTie = prb(0.1)

  const drawFaceTattoo = prb(0.25)

  if (drawHair) chance(
    [6, () => {
      // FEATURES.Hair = 'Colored'
      hair(720, 186, rndHighlighter())
    }],
    [1, () => {
      // FEATURES.Hair = 'Mohawk'
      mohawk(730, 63, rndHighlighter())
    }],
    [1, () => {
      // FEATURES.Hair = 'Devil Horns'
      devilHorns(778, 158, rndHighlighter())
    }],
    [1, () => {
      // FEATURES.Hair = 'Head Band'
      headband(756, 235)
    }],
    [1, () => {
      // FEATURES.Hair = 'Bow'
      hairBow(757, 254)
    }],
    [1, () => {
      // FEATURES.Ears = 'Headphones'
      headphones(775, 206)
    }],
    [2.3333, () => {
      // FEATURES.Ears = 'Earring'
      earring(782, 357)
    }],
  )()

  if (drawTorso) {
    // FEATURES.Blouse = 'Colorful'
    blouse(796, 380, rndHighlighter())
  }

  if (drawEyes) chance(
    [4, () => {
      // FEATURES.Eyes = 'Glasses'
      glasses(824, 300, rndHighlighter())
    }],
    [4, () => {
      // FEATURES.Eyes = 'Eye Patch'
      eyePatch(827, 280)
    }],
    [4, () => {
      // FEATURES.Eyes = `X'd`
      xEyes(866, 301)
    }],
    [4, () => {
      // FEATURES.Eyes = '$'
      $Eyes(873, 304)
    }],
    [4, () => {
      // FEATURES.Eyes = 'Stars'
      starEyes(857, 294)
    }],
    [4, () => {
      // FEATURES.Eyes = 'Glass Eyes'
      doubleEyes(863, 303)
    }],
    [4, () => {
      // FEATURES.Eyes = 'Eye Lashes'
      eyeLashes(855, 296)
    }],
    [4, () => {
      // FEATURES.Eyes = 'Hearts'
      heartEyes(864, 302)
    }],
    [4, () => {
      // FEATURES.Eyes = 'Monocle'
      monocole(848, 295)
    }],
    [1, () => {
      // FEATURES.Eyes = 'Laser Eyes'
      laserEyes(872, 301, sample(penColorsAll))
    }],
  )()

  if (drawCheek) chance(
    [1, () => {
      // FEATURES.Cheeks = 'Beauty Mark'
      beautyMark(867, 351)
    }],
    [1, () => {
      // FEATURES.Cheeks = 'Tear Drops'
      teardrops(856, 324)
    }],
    [drawn.glasses || drawn.monocle || eyePatch ? 0 : 1, () => {
      // FEATURES.Cheeks = 'Weary'
      weary(856, 323)
    }],
  )()


  if (drawStache) chance(
    [1, () => {
      // FEATURES.Stache = 'Walrus'
      walrusStache(880, 368)
    }],
    [1, () => {
      // FEATURES.Stache = 'Handle Bars'
      curlyStache(880, 370)
    }],
    [1, () => {
      // FEATURES.Stache = 'Thin'
      thinStache(889, 378)
    }],
    [1, () => {
      // FEATURES.Nose = 'Nose Ring'
      noseRing(910, 371)
    }],
    [1, () => {
      // FEATURES.Nose = 'Clown Nose'
      clownNose(927, 359)
    }],
  )()

  if (drawMouth) chance(
    [1, () => mouthDick(922, 367)],
    [4, () => {
      // FEATURES.Mouth = 'Cigarette'
      cigarette(922, 363)
    }],
    [4, () => {
      // FEATURES.Mouth = 'Tongue'
      tongue(910, 391)
    }],
    [drawn.walrusStache ? 0 : 4, () => {
      // FEATURES.Mouth = 'Smile'
      smile(875, 369)
    }],
    [drawn.walrusStache ? 0 : 4, () => {
      // FEATURES.Mouth = 'Frown'
      frown(875, 388)
    }],
    [drawn.walrusStache ? 0 : 4, () => {
      // FEATURES.Mouth = 'Open'
      openMouth(890, drawn.thinStache ? 387 : 385)
    }],
    [4, () => {
      // FEATURES.Mouth = 'Soul Patch'
      soulPatch(910, 402)
    }],
    [4, () => {
      // FEATURES.Mouth = 'Buck Teeth'
      buckTeath(906, 393)
    }],
    [drawn.clownNose || drawStache ? 0 : 2, () => {
      // FEATURES.Mouth = 'Ball Gag'
      gag(830, 372)
    }],
    [drawStache ? 0 : 4, () => {
      // FEATURES.Mouth = 'Lips'
      lips(887, 380)
    }],
  )()

  if (drawBeard) chance(
    [1, () => {
      // FEATURES.Beard = 'Chin'
      chinBeard(832, 365)
    }],
    [1, () => {
      // FEATURES.Beard = 'Mutton Chops'
      muttonChops(819, 328)
    }],
    [drawStache||drawn.smile||drawn.frown||drawn.gag ? 0: 1, () => {
      // FEATURES.Beard = 'Goatee'
      goatee(880, 375)
    }],
  )()

  if (drawEyebrows) chance(
    [1, () => {
      // FEATURES['Eyebrows'] = 'Angry'
      angry(861, 278)
    }],
    [1, () => {
      // FEATURES['Eyebrows'] = 'Worried'
      worried(859, 279)
    }],
  )()

  if (drawTie) chance(
    [1, () => {
      // FEATURES.Neck = 'Tie'
      tie(868, 458)
    }],
    [1, () => {
      // FEATURES.Neck = 'Bow Tie'
      bowtie(840, 450)
    }],
    [1, () => {
      // FEATURES.Neck = 'Cross Necklace'
      crossNecklace(794, 400)
    }],
  )()

  if (drawFaceTattoo) {
    const [x, y] = [878, 240]
    chance(
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Debugger'
        svg.drawRect(x, y, 62, 33)
        svg.text('0', x+5, y+2)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Bar Code'
        svg.drawRect(x, y+5, 50, 28)
        times(10, t => {
          prb(0.65) && svg.drawLine(x + t*5, y+5, x + t*5, y+33)
        })
      }],
      [2, () => {
        // FEATURES['Face Tattoo'] = 'Rosette'
        drawSingleSymbol(x, y, 'rosette')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Heart'
        drawSingleSymbol(x, y, 'heart')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'One'
        drawSingleSymbol(x, y, 'one')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Cross'
        drawSingleSymbol(x, y, 'cross')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'CGK'
        drawSingleSymbol(x, y, 'cgk')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Star'
        drawSingleSymbol(x, y, 'star')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Eye'
        drawSingleSymbol(x, y, 'eye')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Peace'
        drawSingleSymbol(x, y, 'peace')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Shield'
        drawSingleSymbol(x, y, 'shield')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Circle'
        drawSingleSymbol(x, y, 'circle')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'Smiley'
        drawSingleSymbol(x, y, 'smiley')
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = '!!!'
        svg.text('!!!',x+17, y+15, {size: 0.4})
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = '666'
        svg.text('666',x+7, y+15)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'IOU'
        svg.text('IOU',x+7, y+15)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'XXX'
        svg.text('XXX',x+7, y+15)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = '$$$'
        svg.text('$$$',x+7, y+15)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'WINNER'
        svg.text('WINNER',x-25, y+15)
      }],
      [1, () => {
        // FEATURES['Face Tattoo'] = 'LOSER'
        svg.text('LOSER',x-15, y+15)
      }],
      [1, () => {
        // FEATURES['Dick Count'] += 1
        prb(0.5)
        ? svg.drawPath(x-10, y+5, dick, {size: 0.2})
        : svg.drawPath(x+60, y+35, dick, {size: 0.2, rotation: 180})
      }],
    )()
  }
}

