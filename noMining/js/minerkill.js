'use strict';

function triggerMblockEvent(miner) {
	let event = new CustomEvent('minerBlocked', {
		detail: {
			minerUrl: miner
		}
	});
	document.dispatchEvent(event);
}

setTimeout(function() {
	console.log("time out");
	for(let name in this) {

		if(name === 'webkitStorageInfo') {
			continue;
		}

		try {
      // console.log(this[name]);
			// Check CoinHive like miners
			console.log(this[name]);
			if(	this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].isRunning === 'function'
				&& typeof this[name].stop === 'function'
				&& (typeof this[name]._siteKey === 'string' || typeof this[name]._newSiteKey === 'string' || typeof this[name]._address === 'string')
				) {
				console.log('[+] Coinhive miner found, stopping...');
				console.log(this[name]);
				this[name].stop();
				this[name] = null;
				triggerMblockEvent('CoinHive (inline)');
			}

			// Check Mineralt miners
			if( this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].db === 'function'
				&& typeof this[name].getlf === 'function'
				&& typeof this[name].stop === 'function'
				&& typeof this[name].hps === 'function'
				) {
				console.log('[+] Mineralt miner found, stopping...');
				this[name].stop();
				this[name] = null;
				triggerMblockEvent('Mineralt (inline)');
			}

			// Check Kitty/Me0w miners
			if( this[name]
				&& typeof this[name] !== 'undefined'
				&& typeof this[name].addWorker === 'function'
				&& typeof this[name].startMining === 'function'
				&& typeof this[name].stopMining === 'function'
				) {
				console.log('[+] Kitty/Me0w miner found, stopping...');
				this[name].stopMining();
				this[name] = null;
				triggerMblockEvent('Kitty/Me0w (inline)');
			}

		} catch(mberr) {}
	}
}, 2000);
