import sentences from "./sentences.js"
document.getElementById("text_container").innerHTML = sentences
  .map((sentence) => `<p>${sentence}</p>`)
  .join("")
