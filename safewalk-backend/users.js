// users.js

const users = [

            { id: 1, email: 'test@example.com', password: 'password123' },
            { id: 2, email: 'jane@demo.com', password: '123456' },
            { id: 3, email: 'john@demo.com', password: 'abcdef' }
          
  ];
  
  function findUser(email, password) {
    return users.find(user => user.email === email && user.password === password);
  }
  
  module.exports = { findUser };
  