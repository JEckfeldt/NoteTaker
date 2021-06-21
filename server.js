const express = require('express')
const { join } = require('path')
const routes = require('./routes/routes.js')
// const apiRoutes = require('./routes/apiRoutes')

const app = express()

//link css and js to html in public
app.use(express.static(join(__dirname, 'public')))

//setup data parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//route links
app.use('/', routes)

//start app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))