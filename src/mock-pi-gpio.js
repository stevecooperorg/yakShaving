// pi-gpio mock
module.exports.open = function open(pin, mode, next) {
	console.log("open pin: " + pin.toString() + " mode: " + mode.toString());
	next();
};

module.exports.write = function write(pin, high, next) {
	console.log("write pin: " + pin.toString() + " high?: " + high.toString());
	next();	
};

module.exports.close = function close(pin, next) {
	console.log("close pin: " + pin.toString());
	

};