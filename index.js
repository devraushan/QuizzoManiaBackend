const express = require('express')
const user = require("./endPoints/user")
const quiz = require("./endPoints/quiz");

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send("DOne")
})
app.use('/auth/users',user);
app.use("/quiz",quiz);
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})