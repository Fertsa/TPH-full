
exports.BattleStatuses = {

	raindance: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'starryrock') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug(':P');
				return basePower * 1.5;
			}
			if (move.type === 'Ghost') {
				this.debug('its a wild derp :D|');
				return basePower * .5;
			}
		},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'StarryNight', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'StarryNight');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'StarryNight', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	
};
