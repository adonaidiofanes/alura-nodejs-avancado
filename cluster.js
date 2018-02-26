var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();
// console.log(cpus);

// gerar nova thread
console.log('executando thread');

// Master
if(cluster.isMaster){
	console.log('thread master');
	
	cpus.forEach(function(){
		cluster.fork();
	});

	// master vai ficar observando alguns eventos disparados pelos slaves
	cluster.on('listening', function(worker){
		console.log('Cluster conectado: ' + worker.process.pid);
	});

	cluster.on('exit', worker => {
		console.log('Cluster desconectado: %d',  worker.process.pid);
		cluster.fork();
	});


} else {
	// Slave
	console.log('thread slave');
	require('./index.js');
}