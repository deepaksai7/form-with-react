const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 8001;

app.listen(port, () => console.log("listening at port " + port));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

//SQL Connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'People'
})

connection.connect(function (err) {
  if (err) throw err;
  console.log('database connected');
});

app.post('/api', (request, response) => {
  let sql = "insert into Person values('" + request.body.fname + "','" + request.body.lname + "','" + request.body.em + "'," + request.body.a + ")";
  connection.query(sql, function (err) {
    if (err) throw err
    console.log("Data Saved");
  })

 // connection.end();


  response.json({
    status: 'success',
    firstname: request.body.fname,
    lastname: request.body.lname,
    email: request.body.em,
    age: request.body.a
  });
});


app.post('/retrieve', (request, response) => {
  
  let sql = `SELECT * FROM Person WHERE email='${request.body.rem}'`;
  
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err
    console.log("stringified  "+JSON.stringify(rows[0]));
    response.json({
      body:JSON.stringify(rows[0])
    })
  });


});
