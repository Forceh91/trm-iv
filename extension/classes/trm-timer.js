'use strict';

/*
* TRMTimer class.
* @property {Number} raw
* @property {Number} timestamp
* @property {String} formatted
* @property {String} state
*/
class TRMTimer {
	constructor(seconds) {
		TRMTimer.setSeconds(this, seconds);
		TRMTimer.setState(this, 'paused');
	}

	// the trmtimer object to increment
	static increment(t) {
		t.raw += 1;
		t.timestamp = Date.now();

		TRMTimer.formatSeconds(t);

		return t;
	}

	// the trmtimer object to decrement
	static decrement(t) {
		if (t.raw > 0) {
			t.raw -= 1;
		} else {
			t.raw = 0;
			TRMTimer.setState(t, 'stopped');
		}
		t.timestamp = Date.now();

		TRMTimer.formatSeconds(t);

		return t;
	}

	// the trmtimer object to change the state of
	static setState(t, state) {
		t.state = state;
		return t;
	}

	// the trmtimer object to set the seconds of
	static setSeconds(t, seconds) {
		t.raw = seconds;
		t.timestamp = Date.now();

		TRMTimer.formatSeconds(t);

		return t;
	}

	// formats the object to contain hours, minutes, seconds data as well as a formatted string
	static formatSeconds(t) {
		const hms = TRMTimer.secondsToHMS(t.raw);
		t.hours = hms.h;
		t.minutes = hms.m;
		t.seconds = hms.s;
		t.formatted = TRMTimer.formatHMS(t);		
	}

	static formatHMS(t) {
		let str = '';

		// add hours to the string if needed
		if (t.hours > 0) {
			str += `${(t.hours < 10 ? `0${t.hours}` : `${t.hours}`)}:`;
		}

		// add the usual minutes and seconds, then return
		str += `${(t.minutes < 10 ? `0${t.minutes}` : `${t.minutes}`)}:${(t.seconds < 10 ? `0${t.seconds}` : `${t.seconds}`)}`;
		return str;
	}

	// the trmtimer object to reset everything of
	// this should only ever be used AFTER A MARATHON HAS BEEN COMPLETED
	// DO NOT USE WILLY NILLY
	static reset(t) {
		TRMTimer.setSeconds(t, 0);
		TRMTimer.setState(t, 'paused');

		return t;
	}

	// returns an object container hours, minutes, seconds based off the seconds value
	static secondsToHMS(seconds) {
		var d = Math.abs(seconds);	// delta
		var r = {};						// result
		var s = {						// structure
			hour: 3600,
			minute: 60,
			second: 1,
		};

		Object.keys(s).forEach(function(key){
			r[key] = Math.floor(d / s[key]);
			d -= r[key] * s[key];
		});

		return { h: r.hour, m: r.minute, s: r.second };
	}
}

module.exports = TRMTimer;
