const express = require('express');
const shortid = require('shortid')

const server = express()
const cors = require('cors')

    let users = [
        {
            id: 1,
            name: 'Bob',
            bio: 'Just a normal guy'
        },
        {
            id: 2,
            name: 'Shirley',
            bio: 'A rather normal girl'
        }
    ];

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Test')
});

server.listen(5000, () => {
    console.log('server running on 5000')
})

// R - Read (CRUD)
server.get('/users', (req, res) => {
    if (users) {
       res.status(200).json(users) 
    } else {
        res.status(404).json({errorMessage: "The users information could not be retrieved."})
    }
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (users[id]) {
    res.status(200).json(users[id])
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    }
})

// C - Create (CRUD)
server.post('/users', (req, res) => {
    const { name, bio } = req.body;

    newUser.id = shortid.generate();

    users.push(req.body)

    if (name, bio) {
        res.status(201).json(req.body)
    } else if (!name || !bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }
})

// D - Delete (CRUD)
server.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const deleted = users.find(user => user.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
    } else {
        res.status(404).json({ success:false, message:'user id was not found '});
    }
});

// U - Update (CRUD)
server.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const changedUser = req.body;

    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = changedUser;
        res.status(200).json(users[index]);
    } else {
        res.status(404).json({ success:false, message:'user id not found' });
    }
});

