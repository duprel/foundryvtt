//ItemMacro

(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target, wpnDmg) {
        let damageRoll = new Roll(`${damDice}d10 + ${wpnDmg}`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Sun Blade (${damageType}) extra damage` });
    };

    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let a = game.actors.get(args[0].actor._id);
    let tok = canvas.tokens.get(args[0].tokenId);
    let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    let fiend = ["fiend"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    if (undead || fiend) {
        let damDice = 2;
        if (args[0].isCritical) {
            damDice = 4;
        };
        await damRoll(damDice, "radiant", a, tok, target, args[0].damageTotal);
    };
})();