﻿//args[1] = @attributes.spelldc
(async () => {
    if (args[0] === "on") {
        return;
    } else {
        game.cub.addCondition("OnFire", [...game.user.targets]);
        //at the start of target turn, make a Con save
        var target = Array.from(game.user.targets)[0];
        var spellDC = args[1];
        let tokenID = target.data._id;
        let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
        const alertData = {
            round: 0,
            roundAbsolute: false,
            turnId: turnID,
            repeating: {
                frequency: 1,
            },
            message: "Make a CON Saving Throw DC: " + spellDC + " to extinguish yourself!",
            macro: "searingSmiteDOT",
            args: [tokenID, args[1], canvas.tokens.controlled[0]],
        };
        TurnAlert.create(alertData);
    };
})();