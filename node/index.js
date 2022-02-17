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
	    const rows = await query('select * from people order by id desc');
	    console.log(rows);
	    h = '<h1>Full Cycle Rocks!</h1>';
	    rows.forEach(function(row, i) {
    		h = h + row.id + ' - ' + row.name + '</br>';
		})
		res.send(h);
	})()
})

app.listen(port, ()=> {
	console.log('Rodando na porta ' + port);
})