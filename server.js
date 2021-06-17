const express = require('express')
const { join } = require('path')
const fs = require('fs')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes will go here