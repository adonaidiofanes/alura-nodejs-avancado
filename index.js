var app = require('./config/custom-express')();

app.listen(3000, function(){
	console.log('=======================');
	console.log('Servidor rodando na porta 3000');
	console.log('=======================');
});

// consign: Ajuda no carregamento das rotas. 
// Entrou no lugar do express-load, funciona com express e outras bibliotecas.