exports.BattleMovedex = {
"darkvoid": {
		num: 464,
		accuracy: 75,
		basePower: 0,
		category: "Status",
		desc: "Puts all adjacent foes to sleep. Pokemon protected by Magic Coat or the Ability Magic Bounce are unaffected and instead use this move themselves.",
		shortDesc: "Puts the foe(s) to sleep.",
		id: "darkvoid",
		isViable: true,
		name: "Dark Void",
		pp: 10,
		priority: 0,
		onModifyMove: function(move) {
			if (this.isWeather('starrynight')) move.accuracy = true;
		},
		status: 'slp',
		secondary: false,
		target: "allAdjacentFoes",
		type: "Dark"
	},
	"starsummoon": {
		num: 240,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the weather becomes Starry Night. The power of Psychic attacks is 1.5x and the power of Ghost-type attacks is 0.5x and def of ghost types is 1.5 is during the effect. Lasts for 8 turns if the user is holding Damp Rock. Fails if the current weather is Rain Dance.",
		shortDesc: "For 5 turns, a Night filled with Stars powers Psychic moves.",
		id: "starsummon",
		isViable: true,
		name: "Star Summon",
		pp: 5,
		priority: 0,
		weather: 'StarryNight',
		secondary: false,
		target: "all",
		type: "Psychic"
	},
	"judgment": {
		num: 449,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Deals damage to one adjacent target. This move's type depends on the user's held Plate.",
		shortDesc: "Type varies based on the held Plate.",
		id: "judgment",
		isViable: true,
		name: "Judgment",
		pp: 10,
		priority: 0,
		onModifyMove: function(move, pokemon) {
			move.type = this.runEvent('Plate', pokemon, null, 'judgment', 'Normal');
		},
		secondary: false,
		target: "normal",
		type: "Normal"
	},
	"sacredfire": {
		num: 221,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Deals damage to one adjacent target with a 50% chance to burn it. If the user is frozen, it will defrost before using this move.",
		shortDesc: "50% chance to burn the target. Thaws user.",
		id: "sacredfire",
		isViable: true,
		name: "Sacred Fire",
		pp: 5,
		priority: 0,
		thawsUser: true,
		secondary: {
			chance: 50,
			status: 'brn'
		},
		target: "normal",
		type: "Fire"
	},
	"flareblitz": {
		num: 394,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Deals damage to one adjacent target with a 10% chance to burn it. If the target lost HP, the user takes recoil damage equal to 33% that HP, rounded half up, but not less than 1HP. If the user is frozen, it will defrost before using this move. Makes contact.",
		shortDesc: "Has 33% recoil. 10% chance to burn. Thaws user.",
		id: "flareblitz",
		isViable: true,
		name: "Flare Blitz",
		pp: 15,
		priority: 0,
		isContact: true,
		thawsUser: true,
		recoil: [33,100],
		secondary: {
			chance: 10,
			status: 'brn'
		},
		target: "normal",
		type: "Fire"
	},
	"thunder": {
		num: 87,
		accuracy: 70,
		basePower: 130,
		category: "Special",
		desc: "Deals damage to one adjacent target with a 30% chance to paralyze it. This move can hit a target using Bounce, Fly, or Sky Drop. If the weather is Rain Dance, this move cannot miss. If the weather is Sunny Day, this move's accuracy is 50%.",
		shortDesc: "50% chance to paralyze target. Can't miss in rain.",
		id: "thunder",
		isViable: true,
		name: "Thunder",
		pp: 10,
		priority: 0,
		onModifyMove: function(move) {
			if (this.isWeather('raindance')) move.accuracy = true;
			else if (this.isWeather('sunnyday')) move.accuracy = 50;
		},
		secondary: {
			chance: 50,
			status: 'par'
		},
		target: "normal",
		type: "Electric"
	},
	"uturn": {
		num: 369,
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		desc: "Deals damage to one adjacent target. If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by another party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button. Makes contact.",
		shortDesc: "User switches out after damaging the target.",
		id: "uturn",
		isViable: true,
		name: "U-turn",
		pp: 20,
		priority: 0,
		isContact: true,
		selfSwitch: true,
		secondary: false,
		target: "normal",
		type: "Bug"
	},
	"drillrun": {
		num: 529,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Deals damage to one adjacent target with a higher chance for a critical hit. Makes contact.",
		shortDesc: "High critical hit ratio.",
		id: "drillrun",
		isViable: true,
		name: "Drill Run",
		pp: 10,
		priority: 0,
		onModifyMove: function(move) {
			if (this.isWeather('sandstorm')) move.accuracy = true;
		},
		isContact: true,
		critRatio: 2,
		secondary: false,
		target: "normal",
		type: "Ground"
	},
	"moonlight": {
		num: 236,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		id: "moonlight",
		isViable: true,
		name: "Moonlight",
		pp: 5,
		priority: 0,
		isSnatchable: true,
		onHit: function(pokemon) {
			if (this.isWeather('sunnyday')) this.heal(this.modify(pokemon.maxhp, 0.667));
			else if (this.isWeather(['raindance','sandstorm','hail','starrynight'])) this.heal(this.modify(pokemon.maxhp, 0.25));
			else this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		secondary: false,
		target: "self",
		type: "Normal"
	},
	"stoneedge": {
		num: 444,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Deals damage to one adjacent target with a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "stoneedge",
		isViable: true,
		name: "Stone Edge",
		pp: 5,
		priority: 0,
		critRatio: 2,
		secondary: false,
		target: "normal",
		type: "Rock"
	},
	"meteormash": {
		num: 309,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		desc: "Deals damage to one adjacent target with a 20% chance to raise the user's Attack by 1 stage. Makes contact. Damage is boosted to 1.2x by the Ability Iron Fist.",
		shortDesc: "35% chance to boost the user's Attack by 1.",
		id: "meteormash",
		isViable: true,
		name: "Meteor Mash",
		pp: 10,
		priority: 0,
		isContact: true,
		isPunchAttack: true,
		secondary: {
			chance: 35,
			self: {
				boosts: {
					atk: 1
				}
			}
		},
		target: "normal",
		type: "Steel"
	},
};