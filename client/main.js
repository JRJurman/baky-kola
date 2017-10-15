const Tram = require('tram-one')

const app = new Tram({defaultRoute:'/'})

app.addRoute('/', require('./pages/home'))
app.addActions({token: require('./actions/token')})
app.addActions({content: require('./actions/content')})

app.start('.main')
