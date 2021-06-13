(async () => {
    if (args[0].hitTargets.length === 0) {
        console.log("Missed or no target");
        return;
    };

    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let a = game.actors.get(args[0].actor._id);
    let tok = canvas.tokens.get(args[0].tokenId);
    let tarAct = game.actors.get(args[0].failedSaves[0].actorId);
    let damDice = 7;
    if (args[0].isCritical) {
        damDice = 14;
    };
    let damageRoll = new Roll(`${damDice}d6[necrotic]`).roll();
    damageRoll.toMessage();
    await new MidiQOL.DamageOnlyWorkflow(a, tok, damageRoll.total, "necrotic", [target], damageRoll, { flavor: `Chasme life drain`, itemCardId: args[0].itemCardId, useOther: true, damageList: args[0].damageList });

    let maxHP = tarAct.data.data.attributes.hp.max;
    let currentHP = tarAct.data.data.attributes.hp.value;
    let newMax = maxHP - damageRoll.total;
    if (tarAct.data.flags.world === undefined || tarAct.data.flags.world === null) {
        tarAct.setFlag('world', 'chasmeLifeDrain');
    };
    if (tarAct.data.flags.world.chasmeLifeDrain === undefined || tarAct.data.flags.world.chasmeLifeDrain === null) {
        tarAct.setFlag('world', 'chasmeLifeDrain', { value: maxHP, });
        
    };
    if (currentHP > newMax) {
        await tarAct.update({ "data.attributes.hp.value": newMax });
    };
    await tarAct.update({ "data.attributes.hp.max": newMax }); 
})();