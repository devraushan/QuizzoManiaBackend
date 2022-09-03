const express = require('express')
const user = require("./endPoints/user")

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send("DOne")
})
app.use('/auth/users',user);
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})