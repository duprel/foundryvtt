(async () => {
    if (args[0] === "on") {
        return;
    } else {
        var target = Array.from(game.user.targets)[0];
        var targetName = target.data.actorData.name;
        var conSave = target.actor.data.data.abilities.con.save;
        var targetSize = target.actor.data.data.traits.size;
        if (targetSize == "med" || targetSize == "sm" || targetSize == "tiny") {
            var saveRoll = new Roll("d20 + @conS", { conS: conSave }).roll();
        } else {
            var saveRoll = new Roll("2d20kh + @conS", { conS: conSave }).roll();
        };
        saveRoll.toMessage({ flavor: targetName + 's Constitution Saving Throw' });
        var spellDC = args[1];
        if (saveRoll.total < spellDC) {
            game.cub.addCondition("Restrained", [...game.user.targets]);
            let tokenID = target.data._id;
            let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
            let spellLevel = args[2];
            const alertData = {
                round: 0,
                roundAbsolute: false,
                turnId: turnID,
                repeating: {
                    frequency: 1,
                },
                message: "Use an action to make a STR check DC: " + spellDC + " to break free!",
                macro: "ensnaringStrikeDOT",
                args: [tokenID, spellLevel],
            };
            TurnAlert.create(alertData);
        };
        var caster = canvas.tokens.controlled[0];
        game.cub.removeCondition("Concentrating");
    };
})();