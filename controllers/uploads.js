var fs = require('fs');

module.exports = function(app){
	// rota para receber arquivos de upload
	app.post('/upload/imagem', function(req, res){
		console.log('Recebendo imagem');
		// receber imagem por stream
		var filename = req.headers.filename;
		req.pipe(fs.createWriteStream('files/' + filename)).
		on('finish', function(){
			console.log('Arquivo escrito');
			res.status(201).send('OK');
		});
	});
}