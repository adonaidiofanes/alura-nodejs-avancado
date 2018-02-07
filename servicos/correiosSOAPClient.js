var soap = require('soap');

function CorreiosSOAPClient(){
	this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
}

module.exports = function(){
	return CorreiosSOAPClient;
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback){
	soap.createClient(this._url, function(erro, cliente){
		console.log('Cliente SOAP Correios criado');
		// args = {"nCdServico": "40010", "sCepOrigem": "21931190", "sCepDestino": "50594943"}
		cliente.CalcPrazo(args, callback);
	});
}