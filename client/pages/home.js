const Tram = require('tram-one')
const html = Tram.html({
  header: require('../elements/header')
})

const getContentDOM = (store, actions) => {
  switch(store.content.status) {
    case 'NOT_LOADED':
      actions.fetchContent()
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'DONE':
      if (store.token.token) {
        const token = store.token.token
        const content = store.content.content
        const preTokenContent = content.slice(0, token[0])
        const tokenContent = content.slice(token[0], token[1])
        const postTokenContent = content.slice(token[1])
        return html`
          <div>
            <span data-start=0>${preTokenContent}</span>
            <mark data-start=${token[0]}>${tokenContent}</mark>
            <span data-start=${token[1]}>${postTokenContent}</span>
          </div>
        `
      }
      return store.content.content
  }
}

const getTokenDOM = (store, actions) => {
  switch(store.token.status) {
    case 'NOT_LOADED':
      actions.fetchToken()
      return 'fetching...'
    case 'LOADING':
      return 'loading...'
    case 'DONE':
      return store.token.token
  }
}

module.exports = (store, actions) => {
  const token = getTokenDOM(store, actions)
  const content = getContentDOM(store, actions)

  const onClickEvent = (event) => {
    const anchorOffset = document.getSelection().anchorOffset
    const documentOffset = parseInt(document.getSelection().anchorNode.parentNode.dataset.start)
    actions.setNewToken(documentOffset + anchorOffset)
  }

  return html`
    <div>
      <header></header>
      ${JSON.stringify(token)}
      <div onclick=${onClickEvent}>
        ${content}
      </div>
    </div>
  `
}
