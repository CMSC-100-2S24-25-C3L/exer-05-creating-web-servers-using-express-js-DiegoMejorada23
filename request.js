// dvmejorada@up.edu.ph
// 2023-04708
// CMSC 100 C3L
// March 07, 2025
// Exer 05: Web Server with Express JS

import needle from 'needle';

needle.post(
    'http://localhost:3000/add-book',
    { book_name: "Harry Potter and the Philosopher's Stone",
        isbn: "978-0-7475-3269-9",
        author: "J.K Rowling",
        year_published: "1943"
    },
    (err, res) => {
        console.log(res.body);
    }
);