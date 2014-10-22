var request = require("request");
var accumulator = require('./accumulator');
var url = 'https://yunbi.com:443/api/v2/depth.json?market=btccny&limit=200'
exports.depth = function(btcAmount,cb) {
request.get({url:url, json:true}, function(e, r, depth) {
	if (e) return cb(e);
	var calculator = accumulator(btcAmount);
	var ask = calculator.ask(depth.asks.reverse());
	var bid = calculator.bid(depth.bids);
	cb(null, ask, bid);
});
}
