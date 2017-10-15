const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

let content = `
  The story follows music composer/singer Winslow Leach, heard by satanic
  record producer Swan as he played an original composition following a set run
  through by the 1950s' style nostalgia band The Juicy Fruits, which Swan produces.
  Swan believes Winslow's music perfect to open "The Paradise" – Swan's highly
  anticipated new concert hall – and has his right-hand man Arnold Philbin steal
  it under the guise of producing him. One month later, Winslow goes to Swan's
  Death Records to follow up about his music but is thrown out. He sneaks into Swan's
  private mansion and observes several women rehearsing his music for an audition. One
  is Phoenix, an aspiring singer, who Winslow deems "perfect" for his music. Winslow
  realizes Swan's plan to open the Paradise with his music after he is thrown out again.
  In response, Winslow disguises himself as a woman to sneak in and try to speak to Swan.
  Swan has Winslow beaten up and framed for drug dealing. Winslow is given a life sentence
  in Sing Sing Prison and his teeth are extracted and replaced with metal ones (part of
  an experimental prisoner program to decrease infection amongst inmates, funded by the Swan Foundation.)
`

let token = undefined
const breakCharacters = ' ,.'

app.get('/', (req, res) => {
  res.send('baky-kola')
})

app.get('/content', (req, res) => {
  res.send(content)
})

app.get('/token', (req, res) => {
  res.send(token)
})

app.put('/token/:index', (req, res) => {
  const newToken = req.params.index
  token = content.split('').reduce((wordEnds, char, charIndex) => {
    // we already found the word, just move along
    if (wordEnds[1] !== null) { return wordEnds }

    // check if we are ending a word
    if (breakCharacters.indexOf(char) !== -1) {
      // check if we passed our token (if we didn't we can reset the word)
      if (newToken > charIndex) { return [charIndex + 1, null] }
      // if we did, then we are at the end of our key word
      else { return [wordEnds[0], charIndex] }
    }
    return wordEnds
  }, [0, null])
  res.send(token)
})

app.listen(3056, () => {
  console.log('App started on http://localhost:3056')
})
