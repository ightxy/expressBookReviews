const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
  }

  if (username && password) {
    if (!doesExist(username)) {
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Please Log in."});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //Write your code here
  //return res.send(JSON.stringify(books,null,4));
//});

public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get(books);
        const booksList = response.data
        return res.send(JSON.stringify(booksList, null, 4));
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({message: 'Error fetching books'});
    }
})

// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //const isbn = req.params.isbn;
  //const isbnList = Object.values(books).map(book => book.isbn);
  //return res.send(isbnList);
// });
  
 //Get book details based on author
//public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //const author = req.params.author;
  //const authorList = Object.values(books).map(book => book.author);
  //return res.send(authorList);
//});

public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(books);
        const bookIsbn = response.data;
        return res.status(200).json(bookIsbn);
    } catch (error) {
        console.error('Error fetching book details', error);
        return res.status(500).json({message: 'Error fetching book details'});
    }
});

public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(books);
        const booksByAuthor = response.data;
        if (booksByAuthor && booksByAuthor.length > 0) {
            const authorList = booksByAuthor.map(book => book.author);
            return res.status(200).json(authorList);
        } else {
            return res.status(404).json({message: `No books found by author ${author}`});
        }
    } catch (error) {
        console.error(`Error fetching books by author:`, error);
        return res.status(500).json({message: 'Error fetching books by author'});
    }
})

// Get all books based on title
//public_users.get('/title/:title',function (req, res) {
  //Write your code here\
  //const title = req.params.title;
  //const titleList = Object.values(books).map(book => book.title);
  //return res.send(titleList);
//});

public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(books);
        const booksByTitle = response.data;

        if (booksByTitle && booksByTitle.length > 0) {
            const titleList = booksByTitle.map(book => book.title);
            return res.status(200).json({titleList});
        } else {
            return res.status(404).json({message: `No books found with title ${title}`});
        }
    } catch (error) {
        console.error('Error fetching books by title', error);
        return res.status(500).json({message: 'Error fetching books by title'});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  const reviewList = Object.values(books).map(book => book.review);
  return res.send(reviewList);
});

module.exports.general = public_users;
