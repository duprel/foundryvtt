(async () => {
    function damRoll(damDice, damageType, actorD, tokenD, target, wpnDmg) {
        let damageRoll = new Roll(`${damDice}d6 + ${wpnDmg}`).roll();
        new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, damageRoll.total, damageType, [target], damageRoll, { flavor: `Mace of Disruption (${damageType}) extra damage` });
        return damageRoll.total;
    };

    if (args[0].hitTargets.length > 0) {
        let damDice = 0;
        let damageType = "radiant";
        let actorD = game.actors.get(args[0].actor._id);
        let tokenD = canvas.tokens.get(args[0].tokenId);
        let target = canvas.tokens.get(args[0].hitTargets[0]._id);
        let tHP = target.actor.data.data.attributes.hp.value;
        let undead = ["undead"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        let fiend = ["fiend"].some(type => (target.actor.data.data.details.type || "").toLowerCase().includes(type));
        if (undead || fiend) {
            if (args[0].isCritical) {
                damDice = 4;
            };
            if (!args[0].isCritical) {
                damDice = 2;
            };
            let riderDam = await damRoll(damDice, damageType, actorD, tokenD, target, args[0].damageTotal);
            let currHP = tHP - args[0].damageTotal - riderDam;
            if (currHP <= 25) {
                let save_roll = await target.actor.rollAbilitySave('wis', { chatMessage: true, fastForward: true });
                if (save_roll._total >= 15) {
                    await game.cub.addCondition("Frightened", target);
                };
                if (save_roll._total < 15) {
                    await target.actor.update({ "data.attributes.hp.value": 0 });
                    ChatMessage.create({ content: `The mace of disruption destroys ${target.actor.name}!` });
                };
            };  
        };
    };
})();