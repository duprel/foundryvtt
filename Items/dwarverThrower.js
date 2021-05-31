//Item macro

(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target, wpnDmg) {
        let damageRoll = new Roll(`${damDice}d8 + ${wpnDmg}`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Dwarven Thrower (${damageType}) extra damage` });
    };

    if (args[0].hitTargets.length == 0) {
        return;
    };
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let giant = ["giant"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
    if (giant) {
        let damDice = 0;
        let damageType = args[0].damageDetail[0].type;
        if (args[0].isCritical) {
            damDice = 2;
        };
        if (!args[0].isCritical) {
            damDice = 1;
        };
        await damRoll(damDice, damageType, actor, token, target, args[0].damageTotal);
    };
})();