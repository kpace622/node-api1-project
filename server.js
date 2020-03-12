const express = require('express');

const server = express();

    const users = [
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

server.get('/', (req, res) => {
    res.send('Test')
});

server.listen(5000, () => {
    console.log('server running on 5000')
})

server.get('/users', (req, res) => {

    res.status(200).json(users)
})

server.post('/users', (req, res) => {
    const users = req.body;

    users.push(users)
        .then(user => {
            res.status(201).json({success:true, user})
        })
        .catch(err => {
            res.status(500).json({success:false, err})
        })
})