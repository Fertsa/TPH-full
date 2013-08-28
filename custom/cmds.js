var commands = exports.commands = {
     /*********************************************************
	 *Bandi's Commands
	 /*********************************************************/

	declare2: function(target, room, user) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;

		if (!this.canTalk()) return;

		this.add('|raw|<div class="broadcast-yellow"><b>'+target+'</b></div>');
		this.logModCommand(user.name+' declared '+target);
	},

	declare3: function(target, room, user) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;

		if (!this.canTalk()) return;

		this.add('|raw|<div class="broadcast-red"><b>'+target+'</b></div>');
		this.logModCommand(user.name+' declared '+target);
	},

	declare4: function(target, room, user) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;

		if (!this.canTalk()) return;

		this.add('|raw|<div class="broadcast-green"><b>'+target+'</b></div>');
		this.logModCommand(user.name+' declared '+target);
	},

		gdeclarered: 'gdeclare',
gdeclaregreen: 'gdeclare',
gdeclare: function(target, room, user, connection, cmd) {
if (!target) return this.parse('/help gdeclare');
if (!this.can('lockdown')) return false;

var roomName = (room.isPrivate)? 'a private room' : room.id;

if (cmd === 'gdeclare'){
for (var id in Rooms.rooms) {
if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from '+roomName+'<br /></i></font size>'+target+'</b></div>');
}
}
if (cmd === 'gdeclarered'){
for (var id in Rooms.rooms) {
if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from '+roomName+'<br /></i></font size>'+target+'</b></div>');
}
}
else if (cmd === 'gdeclaregreen'){
for (var id in Rooms.rooms) {
if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from '+roomName+'<br /></i></font size>'+target+'</b></div>');
}
}
this.logEntry(user.name + ' used /gdeclare');
},

declaregreen: 'declarered',
declarered: function(target, room, user, connection, cmd) {
if (!target) return this.parse('/help declare');
if (!this.can('declare', null, room)) return false;

if (!this.canTalk()) return;

if (cmd === 'declarered'){
this.add('|raw|<div class="broadcast-red"><b>'+target+'</b></div>');
}
else if (cmd === 'declaregreen'){
this.add('|raw|<div class="broadcast-green"><b>'+target+'</b></div>');
}
this.logModCommand(user.name+' declared '+target);
},
    hide: 'hideauth',
	hideauth: function(target, room, user){
		if(!user.can('mute'))
			return this.sendReply( '/hideauth - access denied.');

		var tar = ' ';
		if(target){
			target = target.trim();
			if(config.groupsranking.indexOf(target) > -1){
				if( config.groupsranking.indexOf(target) <= config.groupsranking.indexOf(user.group)){
					tar = target;
				}else{
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \' \' instead.');
				}
			}else{
				this.sendReply('You have tried to use an invalid character as your auth symbol. Defaulting to \' \' instead.');
			}
		}

		user.getIdentity = function(){
			if(this.muted)
				return '!' + this.name;
			if(this.locked)
				return '#' + this.name;
			return tar + this.name;
		};
		user.updateIdentity();
		this.sendReply( 'You are now hiding your auth symbol as \''+tar+ '\'.');
		return this.logModCommand(user.name + ' is hiding auth symbol as \''+ tar + '\'');
	},

	showauth: function(target, room, user){
		if(!user.can('hideauth'))
			return	this.sendReply( '/showauth - access denied.');

		delete user.getIdentity;
		user.updateIdentity();
		this.sendReply('You have now revealed your auth symbol.');
		return this.logModCommand(user.name + ' has revealed their auth symbol.');
	},
	groups: 'ranks',
                               ranks: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('+ <b>Knight</b> - Knights waist there time trying to use L coomands when they be using !<br />' +
			'% <b>Bishop</b> - Bishops live life in a way where they hope for this dumb sign to go away and become a rook<br />' +
			'@ <b>Rook</b> - The Rook bans and mutes when needed in a up-down-left-right position<br />' +
			'&amp; <b>Queen</b> - Queens server the king at all cost and makes new Rooks,Bishops ,and Knights<br />'+
			'~ <b>King</b> - Kings rule all with no rules');
	},
                                         
    
moneyintro: function(target, room, user) {
    if (!this.canBroadcast()) return;
    this.sendReplyBox('<h2>Money Commands</h2><br /><hr />'+
    '<h3>Every User Commands</h3><br /><hr />'+
    '/buy <em>Use this to buy a item\'s id</em><br />'+
    '/bet <em> Bet a color on the roulette.</em><br />'+
    '/scratchtkt <em> Not done but will allow you to scratch a ticket there will be chances to the amount you win. </em><br />'+ 
    '<h3>Voice And Up Commands</h3><br /><hr />'+
    '!shop <em>Allows a voiced user to show the shop.</em><br />'+
    '!moneyintro <em>Shows you this.</em><br />'+
    '!emotes <em>Shows the emote list.</em>'+
    '<h3>Driver And Up Commands</h3><br /><hr />'+
    '/roul <em> Starts a roulette this  will not work in lobby.</em><br />'+
    '/spin <em>Spins the roulette.</em><br />'+
    '<h3>VIP Commands</h3><br /><hr />'+
    '/emote <em>Use ths with the emote ID to display a emote.</em><br />'+
    '/mark <em>Allows you to give yourself a custom sign. (not done yet)</em><br />'+
    '<h3>Admin And Bandi Commands</h3><br /><hr />'+
    '/award <em>Lets you give a user a amount of PokeDollars.</em><br />'+
    '/awardtkt <em> gives the user a amount tickets</em><br />'+
    '/rmvmoney <em> removes an amount of money from a user</em><br />'+
    '/rmvtkt <em>removes an amount of tickets from a user</em><br />'+
    '/checkalltickets <em>check everyone of their amount of tickets</em><br />'+
    '/checkallmoney <em>Checks every users money</em><br />'+
    '<h3>FAQ</h3><br /><hr />'+
    'How do i get money?: Win a tour or a roulette<br />'+
    'How do i get tickets: Buy them<br />'+
    'What is roulette: a machine that spins and if it lands on the color you bet you win pokedollars<br />'+
    'How do i check money?: /bp');
    },

spbman: 'spbman1234',
spb: function(target, room, user) {
                if (!this.canBroadcast()) return;
      this.sendReplyBox('<h1>Staff Member Spbman</h1>'+     
                'Usernames: spbman1234<br />'+
                'Rank: Warrior(%)<br />'+
                'Help: Creation of forums,Rank name creation<br />'+
                'Personality: Nice,Sometimes Aggressive<br />'+    
                'About: spbman is truly one of the best auth around.<br />He also rivals with matts3ds a lot so there is a lot of joke locking.<br />Overall, he is one of the best auth and deserves a high standard of respect.');
},				

kalenz: 'slayer',
slayer: function(target, room, user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<h2>Staff Member Slayer95</h2>'+
                'Usernames: Slayer95, Kalenz<br  />'+
                'Rank: Royalty(&)<br  />'+
                'Help: Development, Programming<br  />'+
                'About: Just some derp around here.<br />He plays with OU or random teams.<br />');
}, 





											 leagueintro: function(target, room, user) {
                                if (!this.canBroadcast()) return;
                                this.sendReplyBox('<b><font color="red">Bandicam League Rules:</font></b><ol>' +
                        '<li>Challenger or not NO STALLING at all.</li>' +
                        '<li>Gym leaders can have any team, just make sure it is allowed by an Elite 4 member.</li>' +
                        '<li>If you are a challenger, export a team in written form on this and send the link to an Elite 4 member to verify your team.</li>' +
                        '<li>If  you beat a gym leader, favorite or bookmark their badge as you will have to show the badges to gain access to the Elite 4.</li>' +
                        '<li>You can only battle a gym leader or Elite 4 once per day.</li>' +
                        '<li>Gym leaders cannot change their gym team. If they want to, they need permission from an Elite 4 member.</li>' +
                        '<li>Challengers: Once you have started the league with a team, you cannot change it.</li>' +
                        '<li>Have fun!!!</li>' +
                        '</ol>' +
                        'Website:<a href="http://creatorcoolasian.wix.com/thebandicamleague"target=_blank>Bandicam League</a>');
                                        },
 peton: function(target, room, user) {
								if(!user.can('mute')) {
										return this.sendReply('but it failed.');
								}
								else {
									if(canpet == true) {
										return this.sendReply('/pet is already on.');
									}
									if(canpet == false) {
										this.sendReply('You turned on /pet.');
										canpet = true;
									}
								}
},

petoff: function(target, room, user) {
								if(!user.can('mute')){
									return this.sendReply('but it failed.');
								}
								else {
									if(canpet == false) {
										return this.sendReply('/pet is already off.');
								}
									if(canpet == true) {
										this.sendReply('You turned off /pet.');
										canpet = false;
									}
								}
},

pet: function(target, room, user) {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
         if (!target) {
                 return this.sendReply('Please specify a user who you\'d like to pet.');
         }
         var targetUser = Users.get(target);
         if (targetUser) {
                 target = targetUser.userid;
                 }
         else {
                 return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
         }
if(!this.canTalk()) {
return this.sendReply('You cannot use this command because you are muted.');
}
         this.add(user.name + ' pet ' + targetUser.name + '.' );
}
         },
		 spon: function(target, room, user) {
if(!user.can('mute')) {
return this.sendReply('You do not have the authority to use this command.');
}
else {
if(canpet == true) {
return this.sendReply('/sp is already on.');
}
if(canpet == false) {
this.sendReply('You turned on /sp.');
canpet = true;
}
}
},

spoff: function(target, room, user) {
if(!user.can('mute')){
return this.sendReply('but it failed.');
}
else {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
this.sendReply('You turned off /sp.');
canpet = false;
}
}
},

sp: function(target, room, user) {
if(canpet == false) {
return this.sendReply('but it failed.');
}
if(canpet == true) {
         if (!target) {
                 return this.sendReply('Please specify a user who you\'d like to sucker punch.');
         }
         var targetUser = Users.get(target);
         if (targetUser) {
                 target = targetUser.userid;
                 }
         else {
                 return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
         }
if(!this.canTalk()) {
return this.sendReply('but it failed.');
}
         this.add(user.name + ' sucker punch ' + targetUser.name + '.');
}
         },

    staff: function(target, room, user) {
                                    if (!this.canBroadcast()) return;
                                    this.sendReplyBox('<a href = "https://docs.google.com/document/d/1LaK5vRlYAfo84BLcq-DqtMvrWCrq8Xt4ll9L6qNcAwI/edit"target=_blank>Staff</a>');
                                    },

rule: 'rules',
	rules: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('Please follow the TPH Rules:<br />' +
		
			'- ');
},	
forums: function(target, room, user) {
                                    if (!this.canBroadcast()) return;
                                    this.sendReplyBox('<a href = "http://thepowerhouse.forumotion.com/"target=_blank>Forums</a>');
},

                             
sighon: function(target, room, user) {
	if (!user.can('mute')) {
		return this.sendReply('You do not have the authority to use this command.');
	}
	else {
		if (sigh === true) { //here you reference the variable "sigh"
			return this.sendReply('/sigh is already on.');
		}
		if (sigh === false) { // as well as here
			this.sendReply('You turned on /sigh.');
	
			sigh = true; //however, here you use canpet. nowhere is there a way to set the variable sigh to true or false
		}
	}
},
bandi: function(target, room, user) {
 if (user.userid === 'bandicam' || user.userid === 'bandinub'|| user.userid === 'god' || user.userid === 'sasuke' || user.userid === 'itachiuchiha') {
     user.forceRename('bandi');
     user.avatar = '1.png';
     }
},
sasuke: 'sausk',
sausk: function(target, room, user) {
 if (user.userid === 'bandi'|| user.userid === 'coolasian'|| user.id === 'god');{
     user.forceRename('Sasuke');
     user.avatar = '3.png';
     }
},
itahi: 'itchi',
itachi: 'itchi',
itchi: function(target, room, user) {
 if (user.userid === 'bandi' || user.userid === 'coolasian' || user.userid === 'god'|| user.userid === 'sasuke') {
     user.forceRename('Itachi Uchiha');
     user.avatar = '4.png';
     }
},

god: 'arceus',
arceus: function(target, room, user) {
 if (user.userid === 'bandi' || user.userid === 'coolasian' || user.userid === 'itachiuchiha'|| user.userid === 'sasuke'|| user.userid === 'miloticnob') {
     user.forceRename('God');
     user.avatar = '5.png';
     }
},
cinc: 'cinccino',
 cinccino: function(target, room, user) {
 if (user.userid === 'miloticnob') {
     user.forceRename('Cinccino');
     user.avatar = '6.png';
     }
},

sighoff: function(target, room, user) {
	if (!user.can('mute')){//wow
		return this.sendReply('sigh is now off.');
	}
	else {
		if (sigh === false) { //same here
			return this.sendReply('sigh is already off.');
		}
		if (sigh === true) {
			this.sendReply('sigh is nao off.');
			sigh = false;
		}
	}
},

roulette: 'roul',
startroulette: 'roul',
roul: function(target, room, user) {  
    
	if (!user.can('mute')){ 
	return this.sendReply('Woah I know roulette is fun but you are unauthorized :V');
	}
	if (!room.rouletteon == false) 
	{
	return this.sendReply('there is already a roulette on');
	} else {
	room.rouletteon = true;
	room.roulusers = [];
	var part1 = '<h3>A roulette has started</h3><br />';
	var part2 = 'To bet do /bet then one of the following colors: red, yellow, green , black , orange<br />';
	var part3 = 'black = 1000$<br />yellow & red = 100$<br /> green & orange = 300$';
	room.addRaw(part1 + part2 + part3);
	}
},

bet: function(target, room, user) {
        
    if (!room.rouletteon) return this.sendReply('There is no roulette game running in this room.');
    var colors = ['red','yellow','green','black','orange'];
    targets = target.split(',');
    target = toId(targets[0]);
    if (colors.indexOf(target) === -1) return this.sendReply(target + ' is not a valid color.');
    if (targets[1]) {
    	var times = parseInt(toId(targets[1]));
    	if (!isNaN(times) && times > 0) {
    		if (user.tickets < times) return this.sendReply('You do not have enough tickets!')
    		user.bets += times;
    		user.tickets -= times;
    		user.bet = target;
    	} else {
    		return this.sendReply('That is an invalid amount of bets!');
    	}
    } else {
    	if (user.tickets < 1) return this.sendReply('You do not even have a ticket!');
    	user.bets++;
    	user.tickets--;
    	user.bet = target;
    }
    if (room.roulusers.indexOf(user.userid) === -1) room.roulusers.push(user.userid);
    return this.sendReply('You are currently betting ' + user.bets + ' times to ' + target);
    
},

spin: function(target, room, user) {
    
    if (!user.can('mute')) return this.sendReply('You are not authorized to do that!.');
    if (!room.rouletteon) return this.sendReply('There is no roulette game currently.');
    if (room.roulusers.length === 0) return this.sendReply('Nobody has made bets in this game');
    var landon = Math.random();
    var color = '';
    var winners = [];
    var totalwin = [];
    
    if (landon < 0.3) {
        color = 'red';
    } else if (landon < 0.6) {
        color = 'yellow';
    } else if (landon < 0.75) {
        color = 'green';
    } else if (landon < 0.85) {
        color = 'black';
    } else {
        color = 'orange';
    }
    
    for (var i=0; i < room.roulusers.length ; i++) {
        var loopuser = Users.get(room.roulusers[i]);
        var loopchoice = '';
        if (loopuser) {
            loopchoice = loopuser.bet;
            if (loopchoice === color) winners.push(loopuser.userid);
        } else {
            continue;
        }
    }

    if (winners === []) {
        for (var i=0; i < room.roulusers.length; i++) {
            var loopuser = Users.get(room.roulusers[i]);
            if (loopuser) {
                loopuser.bet = null;
                loopuser.bets = 0;
            }
        }
        return room.addRaw('Nobody won this time');
    }
    
    var perbetwin = 0;

    switch(color) {
        case "red": perbetwin = 100; break;
        case "yellow": perbetwin = 100; break;
        case "green": perbetwin = 300; break;
        case "black": perbetwin = 1000; break;
        default: perbetwin = 300;
    }

    for (var i=0; i < winners.length ; i++) {
        loopwinner = Users.get(winners[i]);
        totalwin[i] = perbetwin * loopwinner.bets;
        loopwinner.moneh += totalwin[i];
        loopwinner.prewritemoney();
    }
    if (winners.length) Users.exportUserwealth();

    for (var i=0; i < room.roulusers.length; i++) {
        var loopuser = Users.get(room.roulusers[i]);
        if (loopuser) {
            loopuser.bet = null;
            loopuser.bets = 0;
        }
    }
    if (winners.length === 1) {
    	room.addRaw('The roulette landed on ' + color + '. The only winner was ' + winners[0] + ', who won the sum of ' + totalwin[0] + ' pokedollars.');
    } else if (winners.length) {
    	room.addRaw('The roulette landed on ' + color + '. Winners: ' + winners.toString() + '. They won, respectively, ' + totalwin.toString() + ' pokedollars.');
    } else {
    	room.addRaw('The roulette landed on ' + color + '. Nobody won this time.');
    }
    room.rouletteon = false;
},

//money commands thx to nollan i needed him a bit
award: function(target, room, user) {
	if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!')
	targets = target.split(',');
    	target = toId(targets[0]);
	var targetUser = Users.get(target);
	if (!targetUser) return this.sendReply('User not found.');
	var addmoney = parseInt(targets[1]);
	if (isNaN(addmoney)) return this.sendReply('Invalid sum of money.');
	targetUser.moneh += addmoney;
	targetUser.prewritemoney();
        Users.exportUserwealth();
	this.sendReply(targetUser.name + ' has received ' + addmoney + ' pokedollars.');
	if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addmoney + ' pokedollars.');
},


bp: 'backpack',
backpack: function(target, room, user) {
		 this.sendReply('money: ' +  user.moneh 
		 );
		 },
shap: 'shop',
shop: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<table border="1">'+
'<caption>Shop</caption>'+
'<tr>'+
'<th>Item</th>'+
'<th>Price</th>'+
'<th>Description</th>'+
'<th>Quantity</th>'+
'<th>ID</th>'+
'</tr>'+
'<td>Ticket</td>'+
'<td>100 PokeDollars</td>'+
'<td>A scratchable ticket which can be used to win Pokedollars</td>'+
'<td>1 Ticket</td>'+
'<td>tkt</td>'+
'</tr>'+
'<tr>'+
'<td>Ticket Reel</td>'+
'<td>1,000 Pokedollars</td>'+
'<td>A reel of Tickets</td>'+
'<td>10 Tickets</td>'+
'<td>tktreel<td>'+
'</tr>'+
'<td>Ticket Box</td>'+
'<td>5,000 PokeDollars</td>'+
'<td>A box of Tickets</td>'+
'<td>50 Tickets</td>'+
'<td>tktbox</td>'+
'</tr>'+
'<tr>'+
'<td>Custom Avatar</td>'+
'<td>5,000 Pokedollars and 1 PokeCoin</td>'+
'<td>An avatar is a custom image sized 80x80</td>'+
'<td>1 custom Avatar</td>'+
'<td>cava</td>'+
'</tr>'+
'<tr>'+
'<td>Voice</td>'+
'<td>50,000 Pokedollars and 2 Pokecoins</td>'+
'<td>Promotion to Voice, if you are Voice or higher this will fail </td>'+
'<td>1 Voice 1 custom avatar</td>'+
'<td>voice</td>'+
'</tr>'+
'<tr>'+
'<td>VIP</td>'+
'<td>100,000 and 5 PokeCoins</td>'+
'<td>A promotion to voice and VIP Membership</td>'+
'<td>1 Voice 1 Vip Membership 5 free Pokecoins</td>'+
'<td>vip</td>'+
'</tr>'+
'</table>');
},
buy: function(target, room, user) {
                var match = false;
                
                if (target === 'voice') {
                        match = true;
                        if (user.moneh < 50000) {
                                return this.sendReply('You can\'t buy Voice. You have to get more money first.');
                        }
                        if (user.group === "+" || user.group === "%" || user.group === "@" || user.group === "&" || user.group === "~") {
                                return this.sendReply('lelz auth these days they just want a demotion.');
                        }
                        else if (user.moneh >= 50000)
                        this.sendReply('You are now officially Voice.');
                        user.group = "+";
                        user.updateIdentity();
                        user.moneh -= 50000;
			user.prewritemoney();
                        Users.exportUserwealth();
                }
                
                    if (target === 'vip') {
                        match = true;
                        if (user.moneh < 100000) {
                                return this.sendReply('You can\'t be in the VIP untill you get more money.');
                        }
                         if (user.group === "+" || user.group === "%" || user.group === "@" ||  user.group === "&" || user.group === "~") {
                                return this.sendReply('lelz auth these days they just want a demotion.');
                        } else if (user.moneh >=  100000 ) {
                        this.sendReply('You are now officially a VIP.');
                        user.group = "+";
                        user.vip = true
                        user.updateIdentity();
                        user.moneh -= 100000;
                       	user.prewritemoney();
                        Users.exportUserwealth();
                        
                }
                                }
                
                                if (target === 'tkt') {
                        match = true;
                        if (user.moneh < 50) { //here
                                return this.sendReply('Lol, you can\'t even buy a ticket. Hint: win a tour.');
                        }
                         else if (user.moneh >= 50)
                         { 
                          this.sendReply('You have purchased a ticket. meh, actually not that good.');
                        user.moneh -= 50;
                        user.tickets += 1;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        }
                        
                }                  
                if (target == 'tktreel') {
                        match = true;
                        if (user.moneh < 500) {
                                return this.sendReply('Big bucks can come your way if you just buy a ticket reel.');
                        }
                        else if (user.moneh >= 500) {
                        this.sendReply('You have purchased a ticket reel. You\'re on your way to get some big bucks.');
                        user.moneh -= 500;
                        user.tickets += 10;
                        user.prewritemoney();
                        Users.exportUserwealth();
                                        }
                }
                
                if (target === 'tktbox') {
                        match = true;
                        if (user.moneh < 2500 ) {
                                return this.sendReply('Aww, you don\'t have big bucks yet, but you\'re getting there.');
                        }
 
                        if (user.moneh >= 2500) {
                                                this.sendReply('You have purchased a ticket box! You have received big bucks.');
                        user.moneh -= 2500;
                        user.tickets += 50;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        return item = false;
                        
                }
                                }
                if (target == 'cav') {
                        match = true;
                        if (user.moneh < 5000) {
                                return this.sendReply('Aww, you don\'t have big bucks yet, but you\'re getting there.');
                                }
                                    else if (user.moneh >= 5000) {
                        user.moneh -= 5000;
                        user.cav = true;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        return  this.sendReply('You have purchased a custom avatar! You have received big bucks.');
                    }
                                }
                if (match == false) {
                        return this.sendReply('That isn\'t an item. Type /shop to see the list of items and to use the ID.')
                }
},


sigh: function(target, room, user) {
if (!this.canTalk()) {
return this.sendReply('you cannot sigh because you are muted or locked');
} else if (sigh === false) {
return this.sendReply('It is too good of a time to sigh.');
} else if (sigh === true) {
 this.add(user.name+ " sighs.");
}
         },
         
         
         fleeon: function(target, room, user) {
if (!user.can('mute')) {
return this.sendReply('You do not have the authority to use this command.');
}
else {
if (sigh === true) { //here you reference the variable "sigh"
return this.sendReply('/flee is already on.');
}
if (sigh === false) { // as well as here
this.sendReply('You turned on /flee.');

sigh = true; 
}
}
},


fleeoff: function(target, room, user) {
if (!user.can('mute')){
return this.sendReply('flee is now off.');
}
else {
if (sigh === false) { 
return this.sendReply('o3o why u wanan leave jw.');
}
if (sigh === true) {
this.sendReply('flee is nao off.');
sigh = false;
}
}
},

flee: function(target, room, user) {
if (!this.canTalk()) {
return this.sendReply('you cannot sigh because you are muted or locked');
} else if (sigh === false) {
return this.sendReply('pls dun go.');
} else if (sigh === true) {
 this.add(user.name+ " flees.");
}
         },
	 /*********************************************************
	 *Slayer And Stevo's Tour Commands
	 /*********************************************************/
	tour: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.parse('/tours');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		var rid = room.id;
		if (tour[rid].status != 0) return this.sendReply('There is already a tournament running, or there is one in a signup phase.');
		if (!target) return this.sendReply('Proper syntax for this command: /tour tier, size');
		var targets = tour.splint(target);
		if (targets.length != 2) return this.sendReply('Proper syntax for this command: /tour tier, size');
		var tierMatch = false;
		var tempTourTier = '';
		for (var i = 0; i < tour.tiers.length; i++) {
			if (toId(targets[0]) == tour.tiers[i]) {
				tierMatch = true;
				tempTourTier = tour.tiers[i];
			}
		}
		if (!tierMatch) return this.sendReply('Please use one of the following tiers: ' + tour.tiers.join(','));
		if (targets[1].split('minut').length - 1 > 0) {
			targets[1] = parseInt(targets[1]);
			if (isNaN(targets[1]) || !targets[1]) return this.sendReply('/tour tier, NUMBER minutes');
			targets[1] = Math.ceil(targets[1]);
			if (targets[1] < 0) return this.sendReply('Why would you want to schedule a tournament for the past?');
			tour.timers[rid] = {
				time: targets[1],
				startTime: tour.currentSeconds
			};
			targets[1] = Infinity;
		}
		else {
			targets[1] = parseInt(targets[1]);
		}
		if (isNaN(targets[1])) return this.sendReply('Proper syntax for this command: /tour tier, size');
		if (targets[1] < 3) return this.sendReply('Tournaments must contain 3 or more people.');

		this.parse('/endpoll');
		tour.reset(rid);
		tour[rid].tier = tempTourTier;
		tour[rid].size = targets[1];
		tour[rid].status = 1;
		tour[rid].players = new Array();	

		Rooms.rooms[rid].addRaw('<hr /><h2><font color="green">' + sanitize(user.name) + ' has started a ' + Tools.data.Formats[tempTourTier].name + ' Tournament.</font> <font color="red">/j</font> <font color="green">to join!</font></h2><b><font color="blueviolet">PLAYERS:</font></b> ' + targets[1] + '<br /><font color="blue"><b>TIER:</b></font> ' + Tools.data.Formats[tempTourTier].name + '<hr />');
		if (tour.timers[rid]) Rooms.rooms[rid].addRaw('<i>The tournament will begin in ' + tour.timers[rid].time + ' minute' + (tour.timers[rid].time == 1 ? '' : 's') + '.<i>');
	},

	endtour: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status == 0) return this.sendReply('There is no active tournament.');
		tour[room.id].status = 0;
		delete tour.timers[room.id];
		room.addRaw('<h2><b>' + user.name + '</b> has ended the tournament.</h2>');
	},

	toursize: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined) return this.sendReply('There is no active tournament in this room.');
		if (tour[room.id].status > 1) return this.sendReply('The tournament size cannot be changed now!');
		if (tour.timers[room.id]) return this.sendReply('This tournament has an open number of participants. It cannot be resized');
		if (!target) return this.sendReply('Proper syntax for this command: /toursize size');
		target = parseInt(target);
		if (isNaN(target)) return this.sendReply('Proper syntax for this command: /tour size');
		if (target < 3) return this.sendReply('A tournament must have at least 3 people in it.');
		if (target < tour[room.id].players.length) return this.sendReply('Target size must be greater than or equal to the amount of players in the tournament.');
		tour[room.id].size = target;
		tour.reportdue(room);
		room.addRaw('<b>' + user.name + '</b> has changed the tournament size to: ' + target + '. <b><i>' + (target - tour[room.id].players.length) + ' slot' + ( ( target - tour[room.id].players.length ) == 1 ? '' : 's') + ' remaining.</b></i>');
		if (target == tour[room.id].players.length) tour.start(room.id);
	},

	tourtime: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined) return this.sendReply('There is no active tournament in this room.');
		if (tour[room.id].status > 1) return this.sendReply('The tournament size cannot be changed now!');
		if (!tour.timers[room.id]) return this.sendReply('This tournament is not running under a clock!');
		if (!target) return this.sendReply('Proper syntax for this command: /tourtime time');
		target = parseInt(target);
		if (isNaN(target)) return this.sendReply('Proper syntax for this command: /tourtime time');
		if (target < 0) return this.sendReply('Why would you want to reschedule a tournament for the past?');
		target = Math.ceil(target);
		tour.timers[room.id].time = target;
		tour.timers[room.id].startTime = tour.currentSeconds;
		room.addRaw('<b>' + user.name + '</b> has changed the remaining time for registering to the tournament to: ' + target + ' minute' + (target === 1 ? '' : 's') + '.');
		if (target === 0) {
			tour.reportdue(room);
			tour.start(room.id);
		}
	},

	jt: 'j',
	jointour: 'j',
	j: function(target, room, user, connection) {
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status == 0) return this.sendReply('There is no active tournament to join.');
		if (tour[room.id].status == 2) return this.sendReply('Signups for the current tournament are over.');
		if (tour.joinable(user.userid, room.id)) {
			tour[room.id].players.push(user.userid);
			var remslots = tour[room.id].size - tour[room.id].players.length;
			// these three assignments (natural, natural, boolean) are done as wished
			if (isFinite(tour[room.id].size)) {
			var pplogmarg = Math.ceil(Math.sqrt(tour[room.id].size) / 2);
			var logperiod = Math.ceil(Math.sqrt(tour[room.id].size));	
			} else {
			var pplogmarg = (!isNaN(config.tourtimemargin) ? config.tourtimemargin : 3);
			var logperiod = (config.tourtimeperiod ? config.tourtimeperiod : 4);
			}
			var perplayerlog = ( ( tour[room.id].players.length <= pplogmarg ) || ( remslots + 1 <= pplogmarg ) );
			//
			
			if (perplayerlog || (tour[room.id].players.length - tour[room.id].playerslogged.length >= logperiod) || ( remslots <= pplogmarg ) ) {
				tour.reportdue(room, connection);
			} else {
				this.sendReply('You have succesfully joined the tournament.');
			}
			if (tour[room.id].size == tour[room.id].players.length) tour.start(room.id);
		} else {
			return this.sendReply('You could not enter the tournament. You may already be in the tournament. Type /l if you want to leave the tournament.');
		}
	},

	forcejoin: 'fj',
	fj: function(target, room, user, connection) {
		if (!tour.lowauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status == 0 || tour[room.id].status == 2) return this.sendReply('There is no tournament in a sign-up phase.');
		if (!target) return this.sendReply('Please specify a user who you\'d like to participate.');
		var targetUser = Users.get(target);
		if (targetUser) {
			target = targetUser.userid;
		} else {
			return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
		}
		if (tour.joinable(target, room.id)) {
			tour.reportdue(room);
			tour[room.id].players.push(target);
			tour[room.id].playerslogged.push(target);
			var remslots = tour[room.id].size - tour[room.id].players.length;
			room.addRaw(user.name + ' has forced <b>' + tour.username(target) + '</b> to join the tournament.' + tour.remsg(remslots));
			if (tour[room.id].size == tour[room.id].players.length) tour.start(room.id);
		} else {
			return this.sendReply('The user that you specified is already in the tournament.');
		}
	},

	lt: 'l',
	leavetour: 'l',
	l: function(target, room, user, connection) {
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status == 0) return this.sendReply('There is no active tournament to leave.');
		if (tour[room.id].status == 1) {
			var index = tour[room.id].players.indexOf(user.userid);
			if (index !== -1) {
				if (tour[room.id].playerslogged.indexOf(user.userid) !== -1) {
					tour.reportdue(room);
					tour[room.id].players.splice(index, 1);
					tour[room.id].playerslogged.splice(index, 1);
					var remslots = tour[room.id].size - tour[room.id].players.length;
					room.addRaw('<b>' + user.name + '</b> has left the tournament.' + tour.remsg(remslots));
				} else {
					tour[room.id].players.splice(index, 1);
					return this.sendReply('You have left the tournament.');
				}
			}
			else {
				return this.sendReply("You're not in the tournament.");
			}
		} else {
			var dqopp = tour.lose(user.userid, room.id);
			if (dqopp && dqopp != -1 && dqopp != 1) {
				room.addRaw('<b>' + user.name + '</b> has left the tournament. <b>' + tour.username(dqopp) + '</b> will advance.');
				var r = tour[room.id].round;
				var c = 0;
				for (var i in r) {
					if (r[i][2] && r[i][2] != -1) c++;
				}
				if (r.length == c) tour.nextRound(room.id);
			} else {
				if (dqopp == 1) return this.sendReply("You've already done your match. Wait till next round to leave.");
				if (dqopp == 0 || dqopp == -1) return this.sendReply("You're not in the tournament or your opponent is unavailable.");
			}
		}
	},

	forceleave: 'fl',
	fl: function(target, room, user, connection) {
		if (!tour.lowauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status == 0 || tour[room.id].status == 2) return this.sendReply('There is no tournament in a sign-up phase.  Use /dq username if you wish to remove someone in an active tournament.');
		if (!target) return this.sendReply('Please specify a user to kick from this signup.');
		var targetUser = Users.get(target);
		if (targetUser) {
			target = targetUser.userid;
		} else {
			return this.sendReply('The user \'' + target + '\' doesn\'t exist.');
		}
		var index = tour[room.id].players.indexOf(target);
		if (index !== -1) {
			tour.reportdue(room);
			tour[room.id].players.splice(index, 1);
			tour[room.id].playerslogged.splice(index, 1);
			var remslots = tour[room.id].size - tour[room.id].players.length;
			room.addRaw(user.name + ' has forced <b>' + tour.username(target) + '</b> to leave the tournament.' + tour.remsg(remslots));
		} else {
			return this.sendReply('The user that you specified is not in the tournament.');
		}
	},

	remind: function(target, room, user, connection) {
		if (!tour.lowauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || !tour[room.id].status) return this.sendReply('There is no active tournament in this room.');
		if (tour[room.id].status == 1) {
			var remslots = tour[room.id].size - tour[room.id].players.length;
			tour.reportdue(room, connection);
			room.addRaw('<hr /><h2><font color="green">Please sign up for the ' + Tools.data.Formats[tour[room.id].tier].name + ' Tournament.</font> <font color="red">/j</font> <font color="green">to join!</font></h2><b><font color="blueviolet">PLAYERS:</font></b> ' + (isFinite(tour[room.id].size) ? tour[room.id].size : 'UNLIMITED') + '<br /><font color="blue"><b>TIER:</b></font> ' + Tools.data.Formats[tour[room.id].tier].name + '<hr />');
		} else {
			var c = tour[room.id];
			var unfound = [];
			if (!target) {
				for (var x in c.round) {
					if (c.round[x][0] && c.round[x][1] && !c.round[x][2]) {
						var userOne = Users.get(c.round[x][0]);
						var userTwo = Users.get(c.round[x][1]);
						if (userOne) {
							userOne.popup("Remember that you have a pending tournament battle in the room " + room.title + ". Unless you start soon your battle against " + tour.username(c.round[x][1]) + "in the tier " + Tools.data.Formats[tour[room.id].tier].name + ", you could lose by W.O.");
						} else {
							unfound.push(c.round[x][0]);
						}
						if (userTwo) {
							userTwo.popup("Remember that you have a pending tournament battle in the room " + room.title + ". Unless you start soon your battle against " + tour.username(c.round[x][0]) + "in the tier " + Tools.data.Formats[tour[room.id].tier].name + ", you could lose by W.O.");
						} else {
							unfound.push(c.round[x][1]);
						}
					}
				}
			} else {
				var opponent = '';
				var targets = tour.splint(target);
				for (var i=0; i<targets.length; i++) {
					var nicetarget = false;
					var someuser = Users.get(targets[i]);
					if (someuser) {
						for (var x in c.round) {
							if (c.round[x][0] && c.round[x][1] && !c.round[x][2]) {
								if (c.round[x][0] === someuser.userid) {
									nicetarget = true;
									opponent = c.round[x][1];
									break;
								} else if (c.round[x][1] === someuser.userid) {
									nicetarget = true;
									opponent = c.round[x][0];
									break;
								}
							}
						}
					}
					if (nicetarget) {
						someuser.popup("Remember that you have a pending tournament battle in the room " + room.title + ". Unless you start soon your battle against " + tour.username(opponent) + "in the tier " + Tools.data.Formats[tour[room.id].tier].name + ", you could lose by W.O.");
					} else {
						unfound.push(someuser.name);
					}
				}
			}
			room.addRaw("Users with pending battles in the tournament were reminded of it by " + user.name);
			if (unfound.length) return this.sendReply("The following users are offline or lack pending battles: " + unfound.toString());
		}
	},
	
	viewround: 'vr',
	viewreport: 'vr',
	vr: function(target, room, user, connection) {
		if (!tour[room.id].status) {
			if (!this.canBroadcast()) return;
			var oghtml = "<hr /><h2>Tournaments In Their Signup Phase:</h2>";
			var html = oghtml;
			for (var i in tour) {
				var c = tour[i];
				if (typeof c == "object") {
					if (c.status == 1) html += '<button name="joinRoom" value="' + i + '">' + Rooms.rooms[i].title + ' - ' + Tools.data.Formats[c.tier].name + '</button> ';
				}
			}
			if (html == oghtml) html += "There are currently no tournaments in their signup phase.";
			this.sendReply('|raw|' + html + "<hr />");
		} else if (tour[room.id].status == 1) {
			if (!tour.lowauth(user,room)) return this.sendReply('You should not use this command during the sign-up phase.');
			tour.reportdue(room, connection);
		} else {
			if (!this.canBroadcast()) return;
			if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
			if (tour[room.id] == undefined) return this.sendReply('There is no active tournament in this room.');
			if (tour[room.id].status < 2) return this.sendReply('There is no tournament out of its signup phase.');
			var html = '<hr /><h3><font color="green">Round '+ tour[room.id].roundNum + '!</font></h3><font color="blue"><b>TIER:</b></font> ' + Tools.data.Formats[tour[room.id].tier].name + "<hr /><center><small><font color=red>Red</font> = lost, <font color=green>Green</font> = won, <a class='ilink'><b>URL</b></a> = battling</small><center>";
			var r = tour[room.id].round;
			var firstMatch = false;
			for (var i in r) {
				if (!r[i][1]) {
					//bye
					var byer = tour.username(r[i][0]);
					html += "<font color=\"red\">" + clean(byer) + " has received a bye.</font><br />";
				}
				else {
					if (r[i][2] == undefined) {
						//haven't started
						var p1n = tour.username(r[i][0]);
						var p2n = tour.username(r[i][1]);
						if (p1n.substr(0, 6) === 'Guest ') p1n = r[i][0];
						if (p2n.substr(0, 6) === 'Guest ') p2n = r[i][1];
						var tabla = "";if (!firstMatch) {var tabla = "</center><table align=center cellpadding=0 cellspacing=0>";firstMatch = true;}
						html += tabla + "<tr><td align=right>" + clean(p1n) + "</td><td>&nbsp;VS&nbsp;</td><td>" + clean(p2n) + "</td></tr>";
					}
					else if (r[i][2] == -1) {
						//currently battling
						var p1n = tour.username(r[i][0]);
						var p2n = tour.username(r[i][1]);
						if (p1n.substr(0, 6) === 'Guest ') p1n = r[i][0];
						if (p2n.substr(0, 6) === 'Guest ') p2n = r[i][1];
						var tabla = "";if (!firstMatch) {var tabla = "</center><table align=center cellpadding=0 cellspacing=0>";firstMatch = true;}
						var tourbattle = tour[room.id].battles[i];
						function link(txt) {return "<a href='/" + tourbattle + "' room='" + tourbattle + "' class='ilink'>" + txt + "</a>";}
						html += tabla + "<tr><td align=right><b>" + link(clean(p1n)) + "</b></td><td><b>&nbsp;" + link("VS") + "&nbsp;</b></td><td><b>" + link(clean(p2n)) + "</b></td></tr>";
					}
					else {
						//match completed
						var p1 = "red";
						var p2 = "green";
						if (r[i][2] == r[i][0]) {
							p1 = "green";
							p2 = "red";
						}
						var p1n = tour.username(r[i][0]);
						var p2n = tour.username(r[i][1]);
						if (p1n.substr(0, 6) === 'Guest ') p1n = r[i][0];
						if (p2n.substr(0, 6) === 'Guest ') p2n = r[i][1];
						var tabla = "";if (!firstMatch) {var tabla = "</center><table align=center cellpadding=0 cellspacing=0>";firstMatch = true;}
						html += tabla + "<tr><td align=right><b><font color=\"" + p1 + "\">" + clean(p1n) + "</font></b></td><td><b>&nbsp;VS&nbsp;</b></td><td><font color=\"" + p2 + "\"><b>" + clean(p2n) + "</b></font></td></tr>";
					}
				}
			}
			this.sendReply("|raw|" + html + "</table>");
		}
	},

	disqualify: 'dq',
	dq: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (!target) return this.sendReply('Proper syntax for this command is: /dq username');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined) return this.sendReply('There is no active tournament in this room.');
		if (tour[room.id].status < 2) return this.sendReply('There is no tournament out of its sign up phase.');
		if (config.tourdqguard) {
			var stop = false;
			for (var x in tour[room.id].round) {
				if (tour[room.id].round[x][2] === -1) {
					stop = true;
					break;
				}
			}
			if (stop) return this.sendReply('Due to current settings, it is not possible to disqualify players before the rest of tournament battles finish.');
		}
		var targetUser = Users.get(target);
		if (!targetUser) {
			var dqGuy = sanitize(target.toLowerCase());
		} else {
			var dqGuy = toId(target);
		}
		var error = tour.lose(dqGuy, room.id);
		if (error == -1) {
			return this.sendReply('The user \'' + target + '\' was not in the tournament.');
		}
		else if (error == 0) {
			return this.sendReply('The user \'' + target + '\' was not assigned an opponent. Wait till next round to disqualify them.');
		}
		else if (error == 1) {
			return this.sendReply('The user \'' + target + '\' already played their battle. Wait till next round to disqualify them.');
		}
		else {
			room.addRaw('<b>' + tour.username(dqGuy) + '</b> was disqualified by ' + user.name + ' so ' + tour.username(error) + ' advances.');
			var r = tour[room.id].round;
			var c = 0;
			for (var i in r) {
				if (r[i][2] && r[i][2] != -1) c++;
			}
			if (r.length == c) tour.nextRound(room.id);
		}
	},

	replace: function(target, room, user, connection) {
		if (!tour.midauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (room.decision) return this.sendReply('Prof. Oak: There is a time and place for everything! You cannot do this in battle rooms.');
		if (tour[room.id] == undefined || tour[room.id].status != 2) return this.sendReply('The tournament is currently in a sign-up phase or is not active, and replacing users only works mid-tournament.');
		if (tour[room.id].roundNum > 1 && !config.tourunlimitreplace) return this.sendReply('Due to the current settings, replacing users is only allowed in the first round of a tournament. If you do not like it, please contact an administrator.');
		if (!target) return this.sendReply('Proper syntax for this command is: /replace user1, user2.  User 2 will replace User 1 in the current tournament.');
		var t = tour.splint(target);
		if (!t[1]) return this.sendReply('Proper syntax for this command is: /replace user1, user2.  User 2 will replace User 1 in the current tournament.');
		var userOne = Users.get(t[0]); 
		var userTwo = Users.get(t[1]);
		if (!userTwo) {
			return this.sendReply('Proper syntax for this command is: /replace user1, user2.  The user you specified to be placed in the tournament is not present!');
		} else {
			t[1] = toId(t[1]);
		}
		if (userOne) {
			t[0] = toId(t[0]);
		}
		var rt = tour[room.id];
		var init1 = false;
		var init2 = false;
		var players = rt.players;
		//check if replacee in tour
		for (var i in players) {
			if (players[i] ==  t[0]) {
				init1 = true;
				break;
			}
		}
		//check if replacer in tour
		for (var i in players) {
			if (players[i] ==  t[1]) {
				init2 = true;
				break;
			}
		}
		if (!init1) return this.sendReply(tour.username(t[0])  + ' cannot be replaced by ' + tour.username(t[1]) + " because they are not in the tournament.");
		if (init2) return this.sendReply(tour.username(t[1]) + ' cannot replace ' + tour.username(t[0]) + ' because they are already in the tournament.');
		var outof = ["players", "winners", "losers", "round"];
		for (var x in outof) {
			for (var y in rt[outof[x]]) {
				var c = rt[outof[x]][y];
				if (outof[x] == "round") {
					if (c[0] == t[0]) c[0] = t[1];
					if (c[1] == t[0]) c[1] = t[1];
					if (c[2] == t[0]) c[2] = t[1];
				}
				else {
					if (c == t[0]) rt[outof[x]][y] = t[1];
				}
			}
		}
		rt.players.splice(rt.players.indexOf(t[0]), 1);
		rt.players.push(t[1]);
		rt.history.push(t[0] + "->" + t[1]);
		room.addRaw('<b>' + tour.username(t[0]) +'</b> has left the tournament and is replaced by <b>' + tour.username(t[1]) + '</b>.');
	},

	tours: function(target, room, user, connection) {
		if (!this.canBroadcast()) return;
		var oghtml = "<hr /><h2>Tournaments In Their Signup Phase:</h2>";
		var html = oghtml;
		for (var i in tour) {
			var c = tour[i];
			if (typeof c == "object") {
				if (c.status == 1) html += '<button name="joinRoom" value="' + i + '">' + Rooms.rooms[i].title + ' - ' + Tools.data.Formats[c.tier].name + '</button> ';
			}
		}
		if (html == oghtml) html += "There are currently no tournaments in their signup phase.";
		this.sendReply('|raw|' + html + "<hr />");
	},

	invalidate: function(target,room,user) {
		if (!room.decision) return this.sendReply('You can only do this in battle rooms.');
		if (!room.tournament) return this.sendReply('This is not an official tournament battle.');
		if (!tour.highauth(user)) return this.sendReply('You do not have enough authority to use this command.');
		tourinvalidlabel:
		{
			for (var i in tour) {
				var c = tour[i];
				if (c.status == 2) {
					for (var x in c.round) {
						if (c.round[x] === undefined) continue;
						if ((room.p1.userid == c.round[x][0] && room.p2.userid == c.round[x][1]) || (room.p2.userid == c.round[x][0] && room.p1.userid == c.round[x][1])) {
							if (c.round[x][2] == -1) {
								c.round[x][2] = undefined;
								Rooms.rooms[i].addRaw("The tournament match between " + '<b>' + room.p1.name + '</b>' + " and " + '<b>' + room.p2.name + '</b>' + " was " + '<b>' + "invalidated" + '</b>' + ' by ' + user.name);
								tour[i].battlesinvtie.push(room.id);
								break tourinvalidlabel;
							}
						}
					}
				}
			}
		}
	},

	tourbats: function(target, room, user) {
		if (!tour[room.id].status) return this.sendReply('There is no active tournament in this room.');	
		if (target == 'all') {
			if (tour[room.id].battlesended.length == 0) return this.sendReply('No finished tournament battle is registered.');
			var msg = new Array();
			for (var i=0; i<tour[room.id].battlesended.length; i++) {
				msg[i] = "<a href='/" + tour[room.id].battlesended[i] + "' class='ilink'>" + tour[room.id].battlesended[i].match(/\d+$/) + "</a>";
			}
			return this.sendReplyBox(msg.toString());			
		} else if (target == 'invtie') {
			if (!tour[room.id].status) return this.sendReply('There is no active tournament in this room.');
			if (tour[room.id].battlesinvtie.length == 0) return this.sendReply('No battle in this tournament has ended in a tie or been invalidated.');
			var msg = new Array();
			for (var i=0; i<tour[room.id].battlesinvtie.length; i++) {
				msg[i] = "<a href='/" + tour[room.id].battlesinvtie[i] + "' class='ilink'>" + tour[room.id].battlesinvtie[i].match(/\d+$/) + "</a>";
			}
			return this.sendReplyBox(msg.toString());
		} else {
			return this.sendReply('Use either "/tourbats all" or "/tourbats invtie"');
		}
	},

	toursettings: function(target, room, user) {
		if (!tour.maxauth(user)) return this.sendReply('You do not have enough authority to use this command.');
		if (target === 'replace on') return config.tourunlimitreplace = true;
		if (target === 'replace off') return config.tourunlimitreplace = false;
		if (target === 'alts on') return config.tourallowalts = true;
		if (target === 'alts off') return config.tourallowalts = false;
		if (target === 'dq on') return config.tourdqguard = false;
		if (target === 'dq off') return config.tourdqguard = true;
		if ((target.substr(0,6) === 'margin') && !isNaN(parseInt(target.substr(7))) && parseInt(target.substr(7)) >= 0) return config.tourtimemargin = parseInt(target.substr(7));
		if ((target.substr(0,6) === 'period') && !isNaN(parseInt(target.substr(7))) && parseInt(target.substr(7)) > 0) return config.tourtimeperiod = parseInt(target.substr(7));
		if (target.substr(0,7) === 'lowauth' && config.groupsranking.indexOf(target.substr(8,1)) != -1) return config.tourlowauth = target.substr(8,1);
		if (target.substr(0,7) === 'midauth' && config.groupsranking.indexOf(target.substr(8,1)) != -1) return config.tourmidauth = target.substr(8,1);
		if (target.substr(0,8) === 'highauth' && config.groupsranking.indexOf(target.substr(9,1)) != -1) return config.tourhighauth = target.substr(9,1);
		if (target === 'view' || target === 'show' || target === 'display') {
			var msg = '';
			msg = msg + 'Can players be replaced after the first round? ' + new Boolean(config.tourunlimitreplace) + '.<br>';
			msg = msg + 'Are alts allowed to join to the same tournament? ' + new Boolean(config.tourallowalts) + '.<br>';
			msg = msg + 'Which minimal rank is required in order to use basic level tournament commands? ' + (!config.tourlowauth ? '+' : (config.tourlowauth === ' ' ? 'None' : config.tourlowauth)) + '.<br>';
			msg = msg + 'Which minimal rank is required in order to use middle level tournament commands? ' + (!config.tourmidauth ? '+' : (config.tourmidauth === ' ' ? 'None, which is not recommended' : config.tourmidauth)) + '.<br>';
			msg = msg + 'Which minimal rank is required in order to use high level tournament commands? ' + (!config.tourhighauth ? '@' : (config.tourhighauth === ' ' ? 'None, which is highly not recommended' : config.tourhighauth)) + '.<br>';
			msg = msg + 'In tournaments with timed register phase, the players joined are logged individually until ' + (isNaN(config.tourtimemargin) ? 3 : config.tourtimemargin) + ' players have joined.<br>';
			msg = msg + 'In tournaments with timed register phase, the players joined are logged in groups of ' + (isNaN(config.tourtimemargin) ? 4 : config.tourtimeperiod) + ' players.';
			return this.sendReplyBox(msg);
		}
		return this.sendReply('Valid targets are: view, replace on/off, alts on/off, invalidate on/off, dq on/off, highauth/midauth/lowauth SYMBOL, margin NUMBER, period NUMBER');
	},

	tourdoc: function() {
		if (!this.canBroadcast()) return;
		this.sendReplyBox("Click <a href='http://elloworld.dyndns.org/documentation.html'>here</a> to be taken to the documentation for the tournament commands.");
	},
	
	survey: 'poll',
	poll: function(target, room, user) {
		if (!tour.lowauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (tour[room.id].question) return this.sendReply('There is currently a poll going on already.');
		var separacion = "&nbsp;&nbsp;";
		var answers = tour.splint(target);
		if (answers.length < 3) return this.sendReply('Correct syntax for this command is /poll question, option, option...');
		var question = answers[0];
		answers.splice(0, 1);
		var answers = answers.join(',').toLowerCase().split(',');
		tour[room.id].question = question;
		tour[room.id].answerList = answers;
		room.addRaw('<div class="infobox"><h2>' + tour[room.id].question + separacion + '<font class="closebutton" size=1><small>/vote OPTION</small></font></h2><hr />' + separacion + separacion + " &bull; " + tour[room.id].answerList.join(' &bull; ') + '</div>');
	},
	
	vote: function(target, room, user) {
		var ips = JSON.stringify(user.ips);
		if (!tour[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
		if (tour[room.id].answerList.indexOf(target.toLowerCase()) == -1) return this.sendReply('\'' + target + '\' is not an option for the current poll.');
		tour[room.id].answers[ips] = target.toLowerCase();
		return this.sendReply('You are now voting for ' + target + '.');
	},
	
	votes: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply('NUMBER OF VOTES: ' + Object.keys(tour[room.id].answers).length);
	},
	
	endsurvey: 'endpoll',
	ep: 'endpoll',
	endpoll: function(target, room, user) {
		if (!tour.lowauth(user,room)) return this.sendReply('You do not have enough authority to use this command.');
		if (!tour[room.id].question) return this.sendReply('There is no poll to end in this room.');
		var votes = Object.keys(tour[room.id].answers).length;
		if (votes == 0) return room.addRaw("<h3>The poll was canceled because of lack of voters.</h3>");
		var options = new Object();
		var obj = tour[room.id];
		for (var i in obj.answerList) options[obj.answerList[i]] = 0;
		for (var i in obj.answers) options[obj.answers[i]]++;
		var sortable = new Array();
		for (var i in options) sortable.push([i, options[i]]);
		sortable.sort(function(a, b) {return a[1] - b[1]});
		var html = "";
		for (var i = sortable.length - 1; i > -1; i--) {
			console.log(i);
			var option = sortable[i][0];
			var value = sortable[i][1];
			html += "&bull; " + option + " - " + Math.floor(value / votes * 100) + "% (" + value + ")<br />";
		}
		room.addRaw('<div class="infobox"><h2>Results to "' + obj.question + '"</h2><hr />' + html + '</div>');
		tour[room.id].question = undefined;
		tour[room.id].answerList = new Array();
		tour[room.id].answers = new Object();
	},
	
	pollremind: 'pr',
	pr: function(target, room, user) {
		var separacion = "&nbsp;&nbsp;";
		if (!tour[room.id].question) return this.sendReply('There is currently no poll going on.');
		if (!this.canBroadcast()) return;
		this.sendReply('|raw|<div class="infobox"><h2>' + tour[room.id].question + separacion + '<font class="closebutton" size=1><small>/vote OPTION</small></font></h2><hr />' + separacion + separacion + " &bull; " + tour[room.id].answerList.join(' &bull; ') + '</div>');
	}
};
