var engine = {
	ANIMATION_DIVISOR: 3,

	run: null,
	tick: 500,

	init: function() {
		logger.init();
		player.init();
		monster.init();

		ui.init();
		bag.init();
		world.init();

		engine.run = setInterval(engine.move, engine.tick);
	},

	move: function() {
		engine.check_atks();
		engine.check_health(monster);
		engine.check_health(player);
		engine.check_exp();
		engine.check_bag();

		ui.update();
	},

	check_atks: function() {
		engine.check_atk(player, monster);
		engine.check_atk(monster, player);
	},
	check_atk: function(dealer, taker) {
		if (dealer.atk_cd == 0) {
			taker.take_dmg(dealer.deal_dmg());
			dealer.atk_cd = dealer.atk_spd;

			ui.animate_atk(dealer);
		} else {
			dealer.atk_cd -= 1;
		}
	},

	check_health: function(entity) {
		if (entity == player && player.hp < player.max_hp) {
			player.hp += player.hp_regen;
			if (player.hp > player.max_hp) {
				player.hp = player.max_hp;
			}
			ui.update();
		}
		if (entity.hp < 1) {
			ui.update_hpbar(entity, entity.node)

			setTimeout(function () {
				entity.kill();

				if (world.changing_region) {
					world.move();
				} else {
					entity.respawn();
				}
			}, engine.tick/engine.ANIMATION_DIVISOR);
		}
	},

	check_exp: function() {
		while(player.exp >= player.exp_next) {
			player.level_up(player.exp_next);
		}
	},

	check_bag: function() {
		if (bag.is_full() && $("#auto_sell").is(":checked")) {
			logger.log("Auto selling loot");
			for (var i = 0; i<bag.max_space; i++) {
				bag.sell(0);
			}
		}
	}

};