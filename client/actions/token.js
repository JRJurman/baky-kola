module.exports = {
  init: () => new Object({token: null, status: 'NOT_LOADED'}),
  fetchToken: (state, _, actions) => {
    fetch('http://localhost:3056/token')
      .then(response => response.json())
      .then(token => {
        actions.setToken(token)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  },
  setToken: (state, fetchedToken) => Object.assign({}, state, {token: fetchedToken, status: 'DONE'}),
  setNewToken: (state, newToken, actions) => {
    fetch(`http://localhost:3056/token/${newToken}`, {method: 'PUT'})
      .then(response => response.json())
      .then(token => {
        actions.setToken(token)
      })
    return Object.assign({}, state, {status: 'LOADING'})
  }
}
