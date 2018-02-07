// o fs já vem no code do node
var fs = require('fs');

// vamos ler um arquivo utilizando a opção buffermode
fs.readFile('imagem.jpg', function(error, buffer){
	// salvar a imagem com outro nome
	console.log('Arquivo lido');

	// escrever o arquivo
	fs.writeFile('imagem2.jpg', buffer, function(err){
		console.log('Arquivo escrito');
	});
});