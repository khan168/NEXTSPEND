const express = require('express')
const PORT = process.env.port || 3001
const app = express ()

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})  