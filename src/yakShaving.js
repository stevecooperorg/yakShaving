var events = require('events');
//var pigpio = require('pi-gpio');
var pigpio = require('./mock-pi-gpio');

var inASecond = function(f) {
	setTimeout(f, 1000);
};

var platonicYak = {
	moo: function() {
		console.log("moo!");
	}
}

var platonicShaver = {
	blinkEyes: function(color) {
		var yak = this.yak;
        yak.setEyes(color);
    	inASecond(function() { yak.setEyes("off"); });
    	inASecond(function() { yak.setEyes(color); });
    	inASecond(function() { yak.setEyes("off"); });
    	inASecond(function() { yak.setEyes(color); });
	},
    wrangleYak: function(yak) {
    	this.yak = yak;
    },
    wakeYak: function() {
    	this.yak.moo("cock crows");
    	this.blinkEyes("green");
    },
    angerYak: function() {
    	var yak = this.yak;
    	yak.moo("angry moo");
    	this.blinkEyes("red");
    }, 
    calmYak: function() {
    	this.yak.moo("happy moo");
    	this.yak.setEyes("green");    	
    },
    putYakToBed: function() {
    	this.yak.moo("zzz");
    	this.yak.setEyes("off");
    },
    enterPaddock: function(paddock) {
    	this.paddock = paddock;
    }
};


var meadow = {
	isBarren: function() {
		this.ee.emit('isBarren');
	},
	acceptShaver: function() {
		this.ee.on('isBarren', this)
	}
};

module.exports.Paddock = function() {
	var ee = new events.EventEmitter();
	var paddock = Object.create(meadow);
	paddock.ee = ee;
};

module.exports.Yak = function() {
	var yak = Object.create(platonicYak);
};

module.exports.YakShaver = function() {
	return Object.create(platonicShaver);
}