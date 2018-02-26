var winston = require('winston');
var fs = require('fs');

// caso nao exista a pasta logs, crie
if(!fs.existsSync('logs')){
	fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: "info",
			filename: "logs/pagamentos.log",
			// maximo de tamanho do arquivo de log 1000MB
			maxsize: 100000,
			// maximo de 10 arquivos para o log de info
			maxFiles: 10
		})
	]
});


/*logger.log('Log utilizando winston');
logger.log('info', 'Um teste de log utilizando info');
logger.info('Log invocado direto o tipo');*/