(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target, wpnDmg) {
        let damageRoll = new Roll(`${damDice}d8 + ${wpnDmg}`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Sun Blade (${damageType}) extra damage` });
    };

    if (args[0].hitTargets.length > 0) {
        let damDice = 0;
        let damageType = "radiant";
        let actorD = game.actors.get(args[0].actor._id);
        let tokenD = canvas.tokens.get(args[0].tokenId);
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (undead) {
            if (args[0].isCritical) {
                damDice = 2;
            };
            if (!args[0].isCritical) {
                damDice = 1;
            };
            await damRoll(damDice, damageType, actorD, tokenD, target, args[0].damageTotal);
        };
    };
})();