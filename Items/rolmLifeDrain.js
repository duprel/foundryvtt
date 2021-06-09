//ItemMacro

(async () => {
    if (args[0].hitTargets.length === 0) {
        console.log("Missed or no target");
        return;
    };
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let save_roll = await target.actor.rollAbilitySave('con', { chatMessage: true, fastForward: true });
    if (save_roll._total < 17) {
        let a = game.actors.get(args[0].actor._id);
        let tok = canvas.tokens.get(args[0].tokenId);
        let damDice = 4;
        if (args[0].isCritical) {
            damDice = 8;
        };
        let damageRoll = new Roll(`${damDice}d6[necrotic]`).roll();
        damageRoll.toMessage();
        await new MidiQOL.DamageOnlyWorkflow(a, tok, damageRoll.total, "necrotic", [target], damageRoll, { flavor: `Rod of Lordly Might extra necrotic damage`, itemCardId: args[0].itemCardId, useOther: true, damageList: args[0].damageList });
        let currHP = a.data.data.attributes.hp.value;
        let maxHP = a.data.data.attributes.hp.max;
        let hpHealed = Math.floor(damageRoll.total / 2);

    };    
})();