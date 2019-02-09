const randomColor = () =>
  `rgba(${randomIntFromInterval(0, 255)},${randomIntFromInterval(
    0,
    255
  )},${randomIntFromInterval(0, 255)}, 0.07)`

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { randomColor }
