module.exports = function(app){

	app.get('/pagamentos', function(req, res){
		console.log('Recebida requisicao de teste');
		res.send('OK');
	});

	app.put('/pagamentos/pagamento/:id', function(req, res){

		var pagamento = {};

		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = 'CONFIRMADO';
		
		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.atualiza(pagamento, function(erro){
			if(erro){
				res.status(500).send(erro);
				return;
			} else {
				res.send(pagamento);
			}
		});

	});

	app.post('/pagamentos/pagamento', function(req, res){

		// validacoes
      	req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
      	req.assert("valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
      	req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);

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
				
				pagamento.id = resultado.insertId;

				// status 201 = created
				res.status(201).json(pagamento);
			}
		});

	});

}