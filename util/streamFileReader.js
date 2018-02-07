var fs = require('fs');

// criar fluxo de leitura
// createReadStream: Gera a saída do arquivo imagem.jpg
fs.createReadStream('imagem.jpg')
	.pipe(
		// entrada de dados
		// como se fosse o buffer
		fs.createWriteStream('imagem-com-stream.jpg')
		)
	// ao finalizar
	.on('finish', function(){
		console.log('Arquivo escrito com stream!');
	});