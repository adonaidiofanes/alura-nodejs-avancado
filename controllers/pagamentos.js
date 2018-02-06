module.exports = function(app){

	app.get('/pagamentos', function(req, res){
		console.log('Recebida requisicao de teste');
		res.send('OK');
	});

	app.post('/pagamentos/pagamento', function(req, res){

		// para testar vamos usar o CURL
		// curl http://localhost:3000/pagamentos/pagamento -X POST -v

		var pagamento = req.body;
		console.log('Processando requisicao de pagamento!');
		
		pagamento.status = 'CRIADO';		
		pagamento.data = new Date;

		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.salva(pagamento, function(erro, resultado){
			if(erro){
				res.send(erro);
			} else {
				console.log('Pagamento criado');
				res.json(pagamento);
			}
		});

	});

}