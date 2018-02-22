module.exports = function(app){

	const PAGAMENTO_CRIADO = "CRIADO";
	const PAGAMENTO_CONFIRMADO = "CONFIRMADO";
	const PAGAMENTO_CANCELADO = "CANCELADO";

	app.get('/pagamentos', function(req, res){
		console.log('Recebida requisicao de teste');
		res.send('OK');
	});

	app.put('/pagamentos/pagamento/:id', function(req, res){

		var pagamento = {};

		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = PAGAMENTO_CONFIRMADO;
		
		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.atualiza(pagamento, function(erro){
			if(erro){
				res.status(500).send(erro);
				return;
			} else {
				console.log('Pagamento atualizado');
				res.send(pagamento);
			}
		});

	});

	app.get('/pagamentos/pagamento/:id', function(req, res){
		var id = req.params.id;
		console.log('Consultando pagamento: ' + id);

		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.buscaPorId(id, function(erro, resultado){
			if(erro){
				console.log('Erro ao consultar no banco: ' + erro);
				res.status(500).send(erro);
				return;
			}
			console.log('Pagamento Encontrado: ' + JSON.stringify(resultado));
			res.json(resultado);
			return;
		});

	});

	app.delete('/pagamentos/pagamento/:id', function(req, res){
		var pagamento = {};

		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = PAGAMENTO_CANCELADO;
		
		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.atualiza(pagamento, function(erro){
			if(erro){
				res.status(500).send(erro);
				return;
			} else {
				console.log('Pagamento cancelado');
				// 204: No content
				res.status(204).send(pagamento);
			}
		});
	});

	app.post('/pagamentos/pagamento', function(req, res){

		// validacoes
      	req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
      	req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
      	req.assert("pagamento.moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);

		var erros = req.validationErrors();
		if(erros){
			console.log('Erros de validacao');
			res.status(400).send(erros);
			return;
		}

		var pagamento = req.body["pagamento"];

		console.log('Processando requisicao de pagamento!');
		
		pagamento.status = PAGAMENTO_CRIADO;		
		pagamento.data = new Date;

		var connection = app.infra.dbConnection();
		var PagamentoDAO = new app.infra.PagamentoDAO(connection);

		PagamentoDAO.salva(pagamento, function(erro, resultado){
			if(erro){
				console.log('Erro ao inserir no banco: ' + erro);
				res.status(500).send(erro);
			} else {
				console.log('Pagamento criado');

				if(pagamento.forma_de_pagamento == 'cartao'){
					var cartao = req.body["cartao"];
					console.log(cartao);

					var clienteCartoes = new app.servicos.clienteCartoes();
					clienteCartoes.autoriza(cartao, function(exception, request, response, retorno){

						if(exception){
							console.log(exception);
							res.status(400).send(exception);
							return;
						}

						res.location('/pagamentos/pagamento/' + resultado.insertId);
						
						pagamento.id = resultado.insertId;

						// definir para o usuario quais passos ele pode seguir
						var response = {
							dados_do_pagamento: pagamento,
							cartao: retorno,
							links: [
								{
									href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
									rel: "confirmar",
									method: "PUT"
								},
								{
									href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
									rel: "cancelar",
									method: "DELETE"
								}
							]
						}

						// status 201 = created
						res.status(201).json(response);
						
						// res.status(201).json(cartao);
						return;

					});
				} else {

					res.location('/pagamentos/pagamento/' + resultado.insertId);
					
					pagamento.id = resultado.insertId;

					// definir para o usuario quais passos ele pode seguir
					var response = {
						dados_do_pagamento: pagamento,
						links: [
							{
								href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
								rel: "confirmar",
								method: "PUT"
							},
							{
								href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
								rel: "cancelar",
								method: "DELETE"
							}
						]
					}

					// status 201 = created
					res.status(201).json(response);
				}
			}
		});

	});

}