const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if(authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
        data: password
    }, 'access', {expiresIn: 60 * 60});

    req.session.authorization = {
        accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid login. Check username and password"});
  }

  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const review = req.body.review;
  const isbn = req.body.isbn;
  const book = Object.values(books).find(book => book.isbn === isbn);

  if (!book) {
    return res.status(404).json({message: "Book not found"});
  }

  if(!book.reviews) {
    book.reviews={};
  } 

  book.reviews[username] = review;
  
  return res.status(200).json({message: `Review for ${book.title} by ${username} has been successfully added/modified.`,
  reviews: book.reviews});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.body.username;
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);

    if (!book) {
        return res.status(404).json({message: 'Book not found'});
    }

    if(book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return res.status(200).json({message: `Review for ${book.title} by ${username} has been successfully deleted`,
     reviews: book.reviews});
    } else {
        return res.status(400).json({message: `No review found for ${book.title} by ${username}.`});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
