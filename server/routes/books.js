// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find( (err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                books: books
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    const newBook = new book();

    res.render('books/details',{
        title: 'Books',
        books: newBook // pass the new book instance to the view
    });
});


// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = book({
        "Title" : req.body.title,
        "Author" : req.body.author,
        "Genre" : req.body.genre,
        "Description" : req.body.description,
        "Price" : req.body.price
    });
    book.create(newBook,(err,book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    // Find the book by id
    let id = req.params.id;
    book.findById(id,(err,bookToEdit)=> {
        res.render('books/details', {
            title: 'Books',
            books: bookToEdit // pass the new book instance to the view
        });
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    // Find the book by id and update the fields
    book.findByIdAndUpdate(
        req.params.id,
        {
            Title: req.body.title,
            Price: req.body.price,
            Author: req.body.author,
            Genre: req.body.genre,
            Description: req.body.description
        },
        (err, book) => {
            if (err) {
                return console.error(err);
            } else {
                res.redirect('/books');
            }
        }
    );
});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.remove({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }

    });
});


module.exports = router;