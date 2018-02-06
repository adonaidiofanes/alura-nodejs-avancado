module.exports = function(app){

	app.get('/pagamentos', function(req, res){
		console.log('Recebida requisicao de teste');
		res.send('OK');
	});

	app.post('/pagamentos/pagamento', function(req, res){

		// para testar vamos usar o CURL
		// curl http://localhost:3000/pagamentos/pagamento -X POST -v

		var pagamento = req.body;
		console.log(pagamento);
		res.send('OK!');
	});

}