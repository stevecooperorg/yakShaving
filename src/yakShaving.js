//var events = require('events');

var inASecond = function(f) {
	setTimeout(f, 1000);
};

var platonicYak = {
	moos: function(sound) {
		this.tongue.play(sound)
	},
	setEyes: function(color) {
		var eye = this.eye;
		eye.open(16, "WRITE", function(){
			eye.write(16, 1, function() {
				eye.close(16);
			});
		});
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
    	this.yak.moos("cock crows");
    	this.blinkEyes("green");
    },
    angerYak: function() {
    	var yak = this.yak;
    	yak.moos("angry moo");
    	this.blinkEyes("red");
    }, 
    calmYak: function() {
    	this.yak.moos("happy moo");
    	this.yak.setEyes("green");    	
    },
    putYakToBed: function() {
    	this.yak.moos("zzz");
    	this.yak.setEyes("off");
    }
};

module.exports.Yak = function(eye, tongue) {
	var yak = Object.create(platonicYak);
	yak.eye = eye;
	yak.tongue = tongue;
	return yak;
};

module.exports.YakShaver = function() {
	return Object.create(platonicShaver);
};