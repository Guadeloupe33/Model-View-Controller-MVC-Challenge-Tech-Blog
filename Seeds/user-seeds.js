const { User } = require('../models');

const userData = [{
        username: 'martha',
        password: 'password1'

    },
    {
        username: 'Matthew',
        password: 'password12'
    },
    {
        username: 'Evan',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;