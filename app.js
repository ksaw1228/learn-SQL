const express = require('express')
const mysql = require('mysql2')
const app = express()

app.use(express.json())

const connection = mysql.createConnection({
    host : 'localhost',  
    //localhost:3306 하면 연결이 안댐;
    user : 'root',
    password : '12345678',
    database : 'homework'
});
    
connection.connect(function(err) {
    if (err) {
    console.error('연결실패 :' + err.stack);
    return;
    }
    console.log('연결된듯');
});

connection.query('SELECT * FROM product', function (에러, 결과, 필드) {
    if (에러){ console.log(에러) }
    console.log('result : ', 결과);
  }); 

app.get('/:id',(req,res) => {
    const find = req.params.id
    connection.query(`SELECT * FROM product WHERE 상품명 = '${find}'`, function (에러, 결과, 필드) {
        if (에러){ console.log(에러) }
        res.status(201).json(결과)
    }); 
})

app.post('/',(req,res) => {
    const product = req.body
    connection.query(`INSERT INTO product (상품명, 가격) VALUES ('${product.name}',${product.price})`,(err,data) => {
    if(err){console.log(err)}
    res.status(201).json(product)
  })
})

app.patch('/:id',(req,res) => {
  connection.query(`UPDATE product SET 상품명 = '${req.body.name}',가격 = ${req.body.price} WHERE id = ${req.params.id} `,
  (err,data) => {
    if(err){console.log(err)}else{
        res.send('Patch Ok')
    }
  })
})

app.delete('/:id',(req,res) => {
    connection.query(`DELETE FROM product WHERE id = ${req.params.id}`,
    (err,data) => {
      if(err){console.log(err)}else{
        res.send('delete Ok')
      }
    })
})



app.listen(3000, () => {
  console.log(3000)
})