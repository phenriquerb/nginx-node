const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};
const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection(config);

const sql = "INSERT INTO people(name) values('Henrique')";
connection.query(sql);

const query = util.promisify(connection.query).bind(connection);

app.get('/', (req, res) => {
	(async () => {
	    const rows = await query('select * from people order by id desc limit 1');
	    console.log(rows);
  		res.send('<h1>Full Cycle</h1>' + rows[0].id + ' - ' + rows[0].name);
	  
	})()
})

app.listen(port, ()=> {
	console.log('Rodando na porta ' + port);
})