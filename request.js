import needle from 'needle';

needle.get('http://localhost:3000/', (err, res) => {
    console.log(res.body);
})

needle.post(
    'http://localhost:3000/submit-data',
    { name: 'Diego', age: 18, city: 'Muntinlupa' },
    (err, res) => {
        //console.log(res.body);
    }
);