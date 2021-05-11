(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target) {
        let damageRoll = new Roll(`${damDice}d6`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Giant Slayer (${damageType}) extra damage` });
    };

    if (args[0].hitTargets.length > 0) {
    let damDice = 0;
    let damageType = args[0].damageDetail[0].type;
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let giant = ["giant"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));   
        if (giant) {
            if (args[0].isCritical) {
                damDice = 4;
            };
            if (!args[0].isCritical) {
                damDice = 2;
            };
            await damRoll(damDice, damageType, actorD, tokenD, target);
            let save_roll = await target.actor.rollAbilitySave('str', { chatMessage: true, fastForward: true });
            if (save_roll._total < 15) {
                game.cub.addCondition("Prone", target);
            };
        };
    };
})();