const express = require('express');
const shortid = require('shortid')

const server = express();

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

server.get('/', (req, res) => {
    res.send('Test')
});

server.listen(5000, () => {
    console.log('server running on 5000')
})

// R - Read (CRUD)
server.get('/users', (req, res) => {

    res.status(200).json(users)
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json(users[id])
})

// C - Create (CRUD)
server.post('/users', (req, res) => {
    const newUser = req.body;

    newUser.id = shortid.generate();

    users.push(newUser)

    res.status(201).json(newUser)
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

