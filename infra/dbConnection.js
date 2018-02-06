// instanciar mysql
var mysql = require('mysql');

function createDBConnection(){
	// conectar no mysql
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'sys_pagamento'
	});
}

module.exports = function(){
	return createDBConnection;
}
