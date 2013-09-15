exports.BattleAbilities = {
"moonglow": {
		desc: "When this Pokemon enters the battlefield, it causes a permanent Starry Night that can only be stopped by Air Lock, Cloud Nine or another weather condition.",
		shortDesc: "On switch-in, this Pokemon summons Starry Night until another weather replaces it.",
		onStart: function(source) {
			this.setWeather('starrynight');
			this.weatherData.duration = 0;
		},
		id: "moonglow",
		name: "Moonglow",
		rating: 5,
		num: -5
	},
	"gooddreams": {
		desc: "If asleep, each of this Pokemon's opponents gains HP equal to one-eighth of its max HP.",
		shortDesc: "Causes sleeping adjacent foes to gain 1/8 of their max HP at the end of each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function(pokemon) {
			for (var i=0; i<pokemon.side.foe.active.length; i++) {
				var target = pokemon.side.foe.active[i];
				if (pokemon.hp && target.status === 'slp') {
					this.damage(target.maxhp*8, target);
				}
			}
		},
		id: "gooddreams",
		name: "Good Dreams",
		rating: 2,
		num: -6
	},
	"darkawakening": {
		desc: "If this Pokemon is active while Rain Dance is in effect, its speed is temporarily doubled.",
		shortDesc: "Bisharp is op with dis, that is all you need to know.",
		onModifySpe: function(spe, pokemon) {
			if (this.isWeather('starrynight')) {
				return spe * 1.2;
			}
		},
		id: "darkawakening",
		name: "Dark Awakening",
		rating: 2,
		num: -7
	},

};