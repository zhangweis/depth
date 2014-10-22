var request = require("request");
var accumulator = require('./accumulator');
var url = 'https://www.bitstamp.net/api/order_book/';
exports.depth = function(btcAmount,cb) {
request.get({url:url, json:true}, function(e, r, depth) {
	if (e) return cb(e);
	var calculator = accumulator(btcAmount);
	var ask = calculator.ask(depth.asks);
	var bid = calculator.bid(depth.bids);
	cb(null, ask, bid);
});
}
