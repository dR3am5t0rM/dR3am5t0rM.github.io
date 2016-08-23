var bag = {
	node: null,
	max_space: 5,
	items: [],

	init: function() {
		bag.node = $("#itemScreen");
	},
	add_item: function(item) {
		if (bag.items.length < bag.max_space) {
			bag.items.push(item);
			ui.update_bag();
		}
	},

	sell: function(index) {

		player.gold += bag.items[index].sell_value;
		logger.log("Sold " + bag.items[index].name + " for " + bag.items[index].sell_value + "g");

		bag.items.splice(index, 1);

		console.log(index + "  " + bag.items);
		ui.update_bag();
	}
};