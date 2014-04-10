var yakShaving = require('../src/yakShaving');

//var pigpio = require('pi-gpio');

describe("the yak", function() {

	var yak, eyeLog, tongueLog;

	beforeEach(function() {
		eyeLog = "";
		tongueLog = "";

		logToTongue = function(file) {
			if (tongueLog.length > 0) {
				tongueLog += " - ";
			}
			tongueLog += file;			
		};

		var logToEye = function(msg) {
			if (eyeLog.length > 0) {
				eyeLog += " - ";
			}
			eyeLog += msg;
		};

		var eye = { 
			open: function(pin, mode, func) {
				logToEye("open pin " + pin + " mode " + mode);
				if (func) { func(); }
			},
			write: function(pin, high, func) {
				logToEye("write pin " + pin + " high " + high);
				if (func) { func(); }
			},
			close: function(pin, func) {
				logToEye("close " + pin);
				if (func) { func(); }
			}
		};
		
		var tongue = {
			baseDir: "/usr/src/yakShaving/soundfiles",
			play: function(sound) {
				var fullPath = this.baseDir + "/" + sound + ".wav"
				logToTongue("playing " + fullPath);
			}
		};

		yak = yakShaving.Yak(eye, tongue);
	}) 

	it("is awesome in it's reality and glory", function() {
		expect(yak).not.toBe(null);
		expect(yak).not.toBe(undefined);
	});

	it("flashes it's eyes", function() {
		yak.setEyes("off");
		expect(eyeLog).toBe("open pin 16 mode WRITE - write pin 16 high 1 - close 16");
	});

	it("roars", function() {
		yak.moos("roar");
		expect(tongueLog).toBe("playing /usr/src/yakShaving/soundfiles/roar.wav");
	});
});

describe("the yakshaver", function() {

	var shaver, yak, paddock, sun, yakLog, aWhile = 20 * 1000;

    beforeEach(function() {
    	jasmine.Clock.useMock();
    	yakLog = "";
    	var log = function log(msg) {
    		if (yakLog.length > 0) {
    			yakLog += " - ";
    		}
    		yakLog += msg;
    	};

    	yak = {
    		moos: function(sound) {
    			log("moo! " + sound);
    		},
    		setEyes: function(color) {
    			log("eyes! " + color);
    		}
    	};

    	paddock = {

    	};

    	shaver = yakShaving.YakShaver();
    	shaver.wrangleYak(yak);
    })

	it("is ready to shave!", function() {
		expect(shaver).not.toBe(undefined);
		expect(shaver).not.toBe(null);
	});

	it("is masterful in waking the yak", function() {
		shaver.wakeYak();
		jasmine.Clock.tick(aWhile);
		expect(yakLog).toBe("moo! cock crows - eyes! green - eyes! off - eyes! green - eyes! off - eyes! green");
	});

	it("is dominating in angering the yak", function() {
		shaver.angerYak();
		jasmine.Clock.tick(aWhile);
		expect(yakLog).toBe("moo! angry moo - eyes! red - eyes! off - eyes! red - eyes! off - eyes! red");
	});

	it("is benevolent in calming the yak", function() {
		shaver.calmYak();
		expect(yakLog).toBe("moo! happy moo - eyes! green");
	});

	it("is comforting in putting the yak to bed", function() {		
		shaver.putYakToBed();
		expect(yakLog).toBe("moo! zzz - eyes! off");
	});

});