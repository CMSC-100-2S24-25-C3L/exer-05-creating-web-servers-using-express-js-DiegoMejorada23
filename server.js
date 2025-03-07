// dvmejorada@up.edu.ph
// 2023-04708
// CMSC 100 C3L
// March 07, 2025
// Exer 05: Web Server with Express JS
// Create an Express JS server that accepts requests on these endpoints (function file)

// Imports
import express from 'express';
import { readFileSync, appendFileSync, readFile } from 'node:fs';

// Server parser
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post('/add-book', (req, res) => {
    const { book_name, isbn, author, year_published } = req.body;

    if ((book_name !== undefined) && (isbn !== undefined) && (author !== undefined) && (year_published !== undefined)) {
        if ((book_name !== "") && (isbn !== "") && (author !== "") && (year_published !== "")) {
            try{
                    let books = readFileSync('books.txt', 'utf8').split('\n');

                for (let i = 0; i < books.length; i++){
                    let book = books[i].split(',');

                    if (book[1] === isbn) {
                        return res.json({ success: false });
                    } 
                }
            }
            catch (err){
            }
            
            let book_format = `${book_name},${isbn},${author},${year_published}\n`;

            try {
                appendFileSync('books.txt', book_format);
                return res.json({ success: true });
            } catch (err) {
                return res.json({ success: false });
            }
        }
    }

    return res.json({ success: false });
});// End of app.post '/add-book'


app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;

    if ((isbn !== undefined) && (author !== undefined)) {
        if ((isbn !== "") && (author !== "")) {
            const books = readFileSync('books.txt', 'utf8').split('\n');
            
            for (let i = 0; i < books.length; i++){
                let book = books[i].split(',');

                if ((book[1] === isbn) && (book[2] === author)) {
                    return res.send(`Book name: ${book[0]}<br>Isbn: ${book[1]}<br>Author: ${book[2]}<br>Year published: ${book[3]}`);
                } 
            }
        }
    }

    return res.send('');
})// End of app.get '/find-by-isbn-author'


app.get('/find-by-author', (req, res) => {
    const { author } = req.query;

    if (author !== undefined) {
        if (author !== "") {
            try{
                const books = readFileSync('books.txt', 'utf8').split('\n');
                let foundBooks = [];

                for (let i = 0; i < books.length; i++){
                    const book = books[i].split(',');

                    if (book[2] === author) {
                        foundBooks.push(`Book name: ${book[0]}<br>Isbn: ${book[1]}<br>Author: ${book[2]}<br>Year published: ${book[3]}<br><br>`)
                    } 
                }

                if (foundBooks.length > 0) {
                    return res.send(foundBooks.join(""));
                }
            }
            catch (err) {
            }
        }
    }

    return res.send('');
})// End of app.get '/find-by-author'


app.listen(3000, () => {
    console.log('Server started at port 3000')
});// End of app.listen