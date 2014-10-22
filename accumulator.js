module.exports = function(btcAmount) {
	return {
		bid:function(bids) {
			var sum = 0;
			for (var i in bids) {
				var bid = bids[i];
				sum += parseFloat(bid[1]);
				if (sum>=btcAmount) return parseFloat(bid[0]);
			}
			return bids[bids.length-1];
		},
		ask:function(asks) {
			return this.bid(asks);
		}
	};
}
