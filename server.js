// dvmejorada@up.edu.ph
// 2023-04708
// CMSC 100 C3L
// March 07, 2025
// Exer 05: Web Server with Express JS

import express from 'express';
import { readFileSync, appendFileSync, readFile } from 'node:fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post('/add-book', (req, res) => {
    const { book_name, isbn, author, year_published } = req.body;

    if ((book_name !== undefined) && (isbn !== undefined) && (author !== undefined) && (year_published !== undefined)) {
        if ((book_name !== "") && (isbn !== "") && (author !== "") && (year_published !== "")) {
            const books = readFileSync('books.txt').split('\n');

            for (let i = 0; i < books.length; i++){
                let book = books[i].split(',');

                if (book[1] === isbn) {
                    return res.json({ success: false });
                } 
            }
            
            let book_format = book_name + "," + isbn + "," + author + "," + year_published + "\n";

            try {
                appendFileSync('books.txt', book_format);
                return res.json({ success: true });
            } catch (err) {
                return res.json({ success: false });
            }
        }
    }

    return res.json({ success: false });
});


app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;

    if ((isbn !== undefined) && (author !== undefined)) {
        if ((isbn !== "") && (author !== "")) {
            const books = readFileSync('books.txt').split('\n');
            
            for (let i = 0; i < books.length; i++){
                let book = books[i].split(',');

                if ((book[1] === isbn) && (book[2] === author)) {
                    return res.json({ success: true , book: {book_name: book[0], isbn: book[1], author: book[2], year_published: book[3]}});
                } 
            }
        }
    }

    return res.json({ success: false });
})


app.get('/find-by-isbn', (req, res) => {
    const { author } = req.query;

    if (author !== undefined) {
        if (author !== "") {
            const books = readFileSync('books.txt').split('\n');

            for (let i = 0; i < books.length; i++){
                let book = books[i].split(',');

                if (book[2] === author) {
                    res.json({ success: true, book: {book_name: book[0], isbn: book[1], author: book[2], year_published: book[3]}});
                    return;
                } 
            }
        }
    }

    return res.json({ success: false });
})

app.listen(3000, () => {
    console.log('Server started at port 3000')
});