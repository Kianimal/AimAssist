const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('views/traccur.html', {root: __dirname })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));