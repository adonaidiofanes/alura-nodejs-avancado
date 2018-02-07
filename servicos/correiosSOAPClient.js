var soap = require('soap');

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl', function(erro, cliente){
	console.log('Cliente SOAP Correios criado');
	cliente.CalcPrazo({
		'nCdServico': '40010',
		'sCepOrigem': '21931190',
		'sCepDestino': '50594943'
	}, function(err, resultado){
		console.log(JSON.stringify(resultado));
	});
});