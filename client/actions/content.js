module.exports = {
  init: () => new Object({content: null, status: 'NOT_LOADED'}),
  fetchContent: (state, _, actions) => {
    fetch('http://localhost:3056/content')
      .then(response => response.text())
      .then(content => {
        actions.setContent(content)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setContent: (state, fetchedContent) => Object.assign({}, state, {content: fetchedContent, status: 'DONE'}),
}
