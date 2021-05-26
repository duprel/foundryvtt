if (args[0].attackRoll.results[0] == 20) {
    let actorD = game.actors.get(args[0].actor._id);
    let tokenD = canvas.tokens.get(args[0].tokenId);
    let target = canvas.tokens.get(args[0].hitTargets[0]._id);
    let damageType = args[0].damageDetail[0].type;
    let damageRoll = new Roll("4d6").roll();
    let totDmg = damageRoll.total + args[0].damageTotal;
    new MidiQOL.DamageOnlyWorkflow(actorD, tokenD, totDmg, damageType, [target], damageRoll, { flavor: `Sword of Sharpness (${damageType}) extra damage` });
    let severRoll = new Roll("1d20");
    severRoll.roll().toMessage();
    if (severRoll.results[0] == 20) {
        ChatMessage.create({ content: `${target.name} has a random limb servered!` });
    };
};