module.exports = function(app){

	app.get('/pagamentos', function(req, res){
		console.log('Recebida requisicao de teste');
		res.send('OK');
	});

	app.post('/pagamentos/pagamento', function(req, res){

		// validacoes
		req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();

		req.assert("valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

		var erros = req.validationErrors();
		if(erros){
			console.log('Erros de validacao');
			res.status(400).send(erros);
			return;
		}

		var pagamento = req.body;
		console.log('Processando requisicao de pagamento!');
		
		pagamento.status = 'CRIADO';		
		pagamento.data = new Date;

		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.salva(pagamento, function(erro, resultado){
			if(erro){
				console.log('Erro ao inserir no banco: ' + erro);
				res.status(500).send(erro);
			} else {
				console.log('Pagamento criado');
				res.location('/pagamentos/pagamento/' + resultado.insertId);
				// status 201 = created
				res.status(201).json(pagamento);
			}
		});

	});

}