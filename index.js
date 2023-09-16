import sentences from "./sentences.js"

const PixelsPerCharacter = 8
const PixelsPerLine = 15
const textContainer = document.getElementById("text_container")
const width = textContainer.offsetWidth
const height = textContainer.offsetHeight
const colCount = Math.floor(width / PixelsPerCharacter)
const rowCount = Math.floor(height / PixelsPerLine)

const getUpdatedLines = (time) => {
  const outputLines = Array(rowCount).fill([""])
  for (let row = 0; row < rowCount; row++) {
    const rowsFromEdge = Math.min(row, rowCount - row)
    for (let col = 0; col < colCount; col++) {
      outputLines[row] += getCharacter(row, col + time / col)
    }
  }
  return outputLines.map((l) => l.replace(/ /g, "&nbsp;"))
}

const getCharacter = (y, x) => {
  const sentence = sentences[sanitizeNumber(y) % sentences.length]
  return sentence[sanitizeNumber(x) % (sentence.length + 40)] ?? " "
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
    await new Promise((resolve) => setTimeout(resolve, 1000 / 8))
  }
}

mainLoop()
