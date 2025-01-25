const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const isbnList = Object.values(books).map(book => book.isbn);
  return res.send(isbnList);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const authorList = Object.values(books).map(book => book.author);
  return res.send(authorList);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here\
  const title = req.params.title;
  const titleList = Object.values(books).map(book => book.title);
  return res.send(titleList);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  const reviewList = Object.values(books).map(book => book.review);
  return res.send(reviewList);
});

module.exports.general = public_users;
