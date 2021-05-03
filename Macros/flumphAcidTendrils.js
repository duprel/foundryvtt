//args[1] = @target = args[1]

(async () => {
    let tokenID = args[2].tokenId;
    let t = canvas.tokens.get(tokenID);
    if (args[0] === "on") {
        let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
        const alertData = {
            label: "Flumph Acid Damage",
            round: 0,
            roundAbsolute: false,
            turnId: turnID,
            endOfTurn: true,
            repeating: {
                frequency: 1,
                expire: null,
                expireAbsolute: false,
            },
            message: "Make a Constitution Save DC: 10 or take [[/roll 1d4]] acid damage!",
        };
        TurnAlert.create(alertData);
    };
})();