var yakShaving = require('../src/yakShaving');

describe("the yak", function() {
	it("flashes it's eyes", function() {
		var yak = yakShaving.Yak();
		yak.setEyes("off");
		
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
    		moo: function(sound) {
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