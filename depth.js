var request = require("request");
var util = require('util');
var async = require('async');
var _ = require('underscore');
	var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

function MarketSpread(name, ask, bid) {
	this.name = name;
	this.ask = ask;
	this.bid = bid;
	this.format=function(){
        	return util.format('%s[%d,%d,%s%%]',this.name, this.ask, this.bid, (this.getSpread()*100).toFixed(2));
	};
	this.getSpread=function(){
		return (this.ask-this.bid)/this.bid;
	}
}
request.get({url:url, json:true}, function(e, r, coindeskbpi) {
        if (e) return console.error(e);
        var rate = coindeskbpi.bpi.USD.rate;
	var markets = [];
	async.map([
		{name:'btcc', depth: require('./btcc')},
                {name:'yunbi', depth: require('./yunbi')},],
		function(market, callback) {
        market.depth.depth(10000/rate, function(err, ask, bid) {
                if (err) return console.error(err);
		callback(null,new MarketSpread(market.name, ask, bid));
	});
		},
		 function(err, markets){
			_.sortBy(markets, function(market){
				return market.getSpread();
			});
			var result = '(ask-bid)/bid: ';
			var marketStrings = [];
			markets.forEach(function(market){
				marketStrings.push(market.format());
			});
			result += marketStrings.join(' |');
			console.log(result);
			updateWeibo('21c2c2e8c7a27cf0a3b2953a32581a33', result);
		});
});

//#                        console.log('(ask-bid)/bid: '+btccStr+' '+yunbiStr);
//#	updateWeibo('21c2c2e8c7a27cf0a3b2953a32581a33', '(ask-bid)/bid: '+btccStr+' '+yunbiStr);
function updateWeibo(code, status) {
	var options = {
  "key": "3925063287",
  "secret": "dbe6de831f6ba924f1cbd849819a91b7",
  "base_uri": "https://api.weibo.com/",
  "redirect_uri": "http://114.215.154.32:8088/weibo/auth",
  "authorize_path": "/oauth2/authorize",
  "access_path": "/oauth2/access_token"
	};
var token = '2.0097y6pF4QKdRE85c3f628a5tGGFqD';
request.post({url:'https://api.weibo.com/2/statuses/update.json', form: {access_token:token,status:status}},
function(err,r, body){
if (err)
console.error('err:'+JSON.stringify(err));
});

}
