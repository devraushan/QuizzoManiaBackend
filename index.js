const express = require('express')
const user = require("./endPoints/user")
const quiz = require("./endPoints/quiz");
const question = require("./endPoints/questions")

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send("DOne")
})
app.use('/auth/users',user);
app.use("/quiz",quiz);
app.use("/question",question);
app.use("/live",require("./endPoints/livequiz"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})