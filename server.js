import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/greeting', (req, res) => {
    res.send('Hello ' + req.query.name);
});

app.post('/submit-data', (req, res) => {
    console.log(req.body);
    //res.send ('Received a POST request from ' + req.body.name);
    const { name, age, city} = req.body;
    res.send (`Received data: Name - ${name}, Age - ${age}, City - ${city}`);
});

app.listen(3000, () => {
    console.log('Server started at port 3000')
});