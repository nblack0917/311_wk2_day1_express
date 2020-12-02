
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(bodyParser.json());

/* BEGIN - create routes here */
// Get full list of users
app.get('/users', (req, res) => {
  res.json(users)
})

// Get user by ID #
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  for (let user of users) {
    if (user._id === parseInt(userId)) {
      res.json(user)
    }
  }
})

//  Post new user from hardcoded variable
// app.post('/users/', (req, res) => {
//   const newUser = {
//     _id: users.length + 1,
//     name: "Ragnar Lothbrook",
//     occupation: "Viking King"
//   };

//   users.push(newUser);
//   res.json(users)
// })

// Post new user from Postman Body
app.post('/users/', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation
  };

  users.push(newUser);
  res.json(users)
})

// Update user name from hardcoded input
// app.put('/users/:id', (req, res) => {
//   const userId = req.params.id
//   for (let user of users) {
//     if (user._id === parseInt(userId)) {
//       user.name = "Hulk Hogan";
//       res.json(user)
//     }
//   }
// })

// Update user name from path input
app.put('/users/:id/:name', (req, res) => {
  const userId = req.params.id
  const userName = req.params.name
  for (let user of users) {
    if (user._id === parseInt(userId)) {
      user.name = userName;
      res.json(user)
    }
  }
})

// Delete first user in array
// app.delete('/users/1', (req, res) => {
//   users.shift()
//   // res.json(users)
//   res.send(`deleted`)

// Delete specified user from array
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  for (let user of users) {
    if (user._id === parseInt(userId)) {
      let index = users.indexOf(user)
      users.splice(index, 1)
      res.json(users)
      res.send(`deleted user # ${userId}`)
    }
  }
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))