var request = require("request");
var accumulator = require('./accumulator');
var url = 'https://www.okcoin.cn/api/depth.do?symbol=btc_cny'
exports.depth = function(btcAmount,cb) {
request.get({url:url, json:true}, function(e, r, depth) {
	if (e) return cb(e);
	var calculator = accumulator(btcAmount);
	var ask = calculator.ask(depth.asks.reverse());
	var bid = calculator.bid(depth.bids);
	cb(null, ask, bid);
});
}
