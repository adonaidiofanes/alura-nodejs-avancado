var memcached = require('memcached');

module.exports = function(){
	return createMemcachedClient;
}

function createMemcachedClient(){
	var cliente = new memcached('localhost:11211', {
		// tentativas no maximo de consultas
		retries: 10,
		// tempo que vai esperar entre a falha e a nova tentativa
		retry: 10000,
		// remover nós mortos
		remove: true
	});
	return cliente;
}