console.log('Introduction to Express JS!!!!');

// 1- Require express
const express = require('express');

// 2- init express
const app = express();

// 3- Create your endpoints/ routehandlers
/* app.get('/', (req, res) => {
  res.send('Hello World!');
}); */

// 4- Starting the server
const port = 5000;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`The server is running on port ${port}...`);
});

// 5- parse the data
app.use(express.json());

// 6- Serve the static files
app.use(express.static('public'));

// 7- create data
let users = [
  {
    name: 'Hamza Zahmoul',
    age: 23,
    id: 1,
  },
  {
    name: 'Marwa Maddeh',
    age: 21,
    id: 2,
  },
];
console.log(users);

// 8- GET USERS
//@GET /api/users
//@desc display the list of users
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});
console.log(users);

// 9- ADD USER
//@POST /api/users
//@desc add a user
app.post('/api/users', (req, res) => {
  //req.body holds parameters that are sent up from the client as part of a POST request
  let newUser = { ...req.body, id: Math.random() };
  users.push(newUser);
  res.status(200).json({
    msg: 'User added with success',
    users,
  });
});

// 10- DELETE USER
//@DELETE /api/users/:id
//@desc delete a user by user
app.delete('/api/users/:id', (req, res) => {
  let id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.json({
    msg: 'User with the id ' + id + ' has been deleted',
    users,
  });
});

// 11- EDIT USER
//@PUT /api/users/:id
//@desc edit a user by user
app.put('/api/users/:id', (req, res) => {
  let id = Number(req.params.id);
  users = users.map((user) =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.status(200).json({
    msg: 'User has been edited',
    users,
  });
});
