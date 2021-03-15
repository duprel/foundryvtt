(async () => {
    if (args[0] === "on") {
        if (game.user.targets.size != 1) {
            ui.notifications.error("Please target a single token.");
            return;
        };
        let spellLevel = args[1];
        let tokenID = Array.from(game.user.targets)[0].data._id;
        let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
        console.log("**********", turnID, spellLevel);
        const alertData = {
            round: 0,
            roundAbsolute: false,
            turnId: turnID,
            endOfTurn: true,
            repeating: {
                frequency: 1,
                expire: 1,
                expireAbsolute: false,
            },
            message: "Acid Arrow Damage!",
            macro: "acidArrowDamage",
            args: [tokenID, spellLevel],
        };
        TurnAlert.create(alertData);
    } else {
        return;
    };
})();