// Custom server source from: 
// https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f/

const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
// connecet to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log('connected to db'))

app.prepare()
.then(() => {
    const server = express()
        
    server.get('*', (req, res) => {
        return handle(req, res)
    })
        
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})