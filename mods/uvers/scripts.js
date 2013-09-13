exports.BattleScripts = {
init: function() {
for (var i in this.data.FormatsData) {
			if (i !== 'chandelure' && i !== 'gothitelle') {
				this.modData('FormatsData', i).dreamWorldRelease = true;
			}
		}
		}
};
