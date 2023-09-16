import sentences from "./sentences.js"

const PixelsPerCharacter = 8
const PixelsPerLine = 15
const textContainer = document.getElementById("text_container")
const width = textContainer.offsetWidth
const height = textContainer.offsetHeight
const colCount = Math.floor(width / PixelsPerCharacter)
const rowCount = Math.floor(height / PixelsPerLine)
const longestSentenceLength = Math.max(...sentences.map((s) => s.length))

const getUpdatedLines = (time) => {
  const outputLines = Array(rowCount).fill([""])
  for (let row = 0; row < rowCount; row++) {
    const rowsFromEdge = Math.min(row, rowCount - row)
    const rowsFromCenter = Math.abs(row - rowCount / 2)
    const rowSinFromEdge =
      Math.sin(1 + time / 50 + rowsFromEdge / 10) * 0.55 + 0.7
    for (let col = 0; col < colCount; col++) {
      outputLines[row] += getCharacter(row, col * rowSinFromEdge)
    }
  }
  return outputLines.map((l) => l.replace(/ /g, "&nbsp;"))
}

const getCharacter = (y, x) => {
  const sentence = sentences[sanitizeNumber(y) % sentences.length]
  const longestDiff = longestSentenceLength - sentence.length
  return (
    sentence[sanitizeNumber(x) % (sentence.length + longestDiff + 20)] ?? " "
  )
}

const sanitizeNumber = (n) => {
  if (isNaN(n)) return 0
  if (n === Infinity) return 0
  return Math.round(Math.abs(n))
}

const renderLines = (lines) => {
  textContainer.innerHTML = lines
    .map((sentence) => `<pre>${sentence}</pre>`)
    .join("")
}

const mainLoop = async () => {
  let time = 0
  while (true) {
    time++
    const lines = getUpdatedLines(time)
    renderLines(lines)
    // Wait for next frame at 4ps
    await new Promise((resolve) => setTimeout(resolve, 1000 / 17))
  }
}

mainLoop()
