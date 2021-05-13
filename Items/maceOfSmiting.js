(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target) {
        let damageRoll = new Roll(`${damDice}d6`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Mace of Smiting (${damageType}) extra damage` });
        return damageRoll.total;
    };

    if (args[0].attackRoll.results[0] === 20) {
        let damDice = 0;
        let damageType = "bludgeoning";
        let actorD = game.actors.get(args[0].actor._id);
        let tokenD = canvas.tokens.get(args[0].tokenId);
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let tHP = target.actor.data.data.attributes.hp.value;
        let construct = ["construct"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (construct) {
            damDice = 4;
        };
        if (!construct) {
            damDice = 2;
        };
        let riderDam = await damRoll(damDice, damageType, actorD, tokenD, target);
        if (construct) {
            let currHP = tHP - args[0].damageTotal - riderDam;
            if (currHP <= 25) {
                await target.actor.update({ "data.attributes.hp.value": 0 });
                ChatMessage.create({ content: `The mace of smiting destroys ${target.actor.name}!` });
            };
        };
    };
})();