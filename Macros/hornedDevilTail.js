//ItemMacro

(async () => {
    const lastArg = args[args.length - 1];
    let target = canvas.tokens.get(lastArg.tokenId);

    if (args[0] === "on") {
        if (target.actor.data.flags.world.hDevilTail === undefined || target.actor.data.flags.world.hDevilTail === null) {
            target.actor.setFlag("world", "hDevilTail", { value: 3 });
            await ChatMessage.create({ content: target.data.name + " total bleeding dice: 3" });
            return;
        };
        if (target.actor.data.flags.world.hDevilTail != undefined && target.actor.data.flags.world.hDevilTail != null) {
            let bleedDice = target.actor.data.flags.world.hDevilTail.value + 3;
            target.actor.setFlag("world", "hDevilTail", { value: bleedDice });
            await ChatMessage.create({ content: target.data.name + " total bleeding dice: " + bleedDice });
            return;
        };
    };
    if (args[0] === "each") {
        let save_roll = await target.actor.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        if (save_roll._total < 17) {
            let damDice = target.actor.data.flags.world.hDevilTail.value;
            let damRoll = new Roll(`${damDice}d6[slashing]`).roll();
            new MidiQOL.DamageOnlyWorkflow(actor, token, damRoll.total, "slashing", [target], damRoll, { flavor: "Bleeding Damage (Slashing)" });
        };
    };
    if (args[0] === "off") {
        target.actor.unsetFlag('world', 'hDevilTail');
    };
})();
