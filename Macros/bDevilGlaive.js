//ItemMacro

(async () => {
    const lastArg = args[args.length - 1];
    let tarAct = game.actors.get(lastArg.actorId);
    let tarTok = canvas.tokens.get(lastArg.tokenId);

    if (args[0] === "on") {
        if (tarAct.data.flags.world.bDevilGla === undefined || tarAct.data.flags.world.bDevilGla === null) {
            tarAct.setFlag("world", "bDevilGla", { value: 1 });
            await ChatMessage.create({ content: target.data.name + " total bleeding dice: 1" });
            return;
        };
        if (tarAct.data.flags.world.bDevilGla != undefined && tarAct.data.flags.world.bDevilGla != null) {
            let bleedDice = tarAct.data.flags.world.bDevilGla.value + 1;
            tarAct.setFlag("world", "bDevilGla", { value: bleedDice });
            await ChatMessage.create({ content: target.data.name + " total bleeding dice: " + bleedDice });
            return;
        };
    };
    if (args[0] === "each") {
        let save_roll = await tarAct.rollAbilitySave('con', { chatMessage: true, fastForward: true });
        if (save_roll._total < 12) {
            let damDice = tarAct.data.flags.world.bDevilGla.value;
            let damRoll = new Roll(`${damDice}d10[slashing]`).roll();
            new MidiQOL.DamageOnlyWorkflow(actor, token, damRoll.total, "slashing", [tarTok], damRoll, { flavor: "Bleeding Damage (Slashing)" });
        };
    };
    if (args[0] === "off") {
        tarAct.unsetFlag('world', 'bDevilGla');
    };
})();