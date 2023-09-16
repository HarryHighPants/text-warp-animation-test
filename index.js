import sentences from "./sentences.js"

const PixelsPerCharacter = 9
const PixelsPerLine = 18
const textContainer = document.getElementById("text_container")
const width = textContainer.offsetWidth
const height = textContainer.offsetHeight
const characterCountPerLine = Math.floor(width / PixelsPerCharacter)
const lineCount = Math.floor(height / PixelsPerLine)

const getUpdatedLines = (time) => {
  const outputLines = Array(lineCount).fill([""])
  for (let i = 0; i < lineCount; i++) {
    for (let j = 0; j < characterCountPerLine; j++) {
      const sentence = sentences[i]
      const character = sentence && sentence[j + time]
      outputLines[i] += character ?? ""
    }
  }
  return outputLines
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
    await new Promise((resolve) => setTimeout(resolve, 1000 / 4))
    const debugContainer = document.getElementById("debug_container")
    // Debug
    debugContainer.innerHTML = time
  }
}

mainLoop()
