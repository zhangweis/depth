var request = require("request");
var accumulator = require('./accumulator');
var url = 'https://btc-e.com/api/3/depth/btc_usd';
exports.depth = function(btcAmount,cb) {
request.get({url:url, json:true}, function(e, r, depth) {
	if (e) return cb(e);
	var calculator = accumulator(btcAmount);
	var ask = calculator.ask(depth.btc_usd.asks);
	var bid = calculator.bid(depth.btc_usd.bids);
	cb(null, ask, bid);
});
}
